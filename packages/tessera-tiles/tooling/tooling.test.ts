// The vendoring tools against throwaway Git repositories: a Tessera checkout
// with two packages and several releases, and a consumer that vendors one of
// them. Git runs with no global or system configuration, so no hook or setting
// of the machine leaks in.

import { afterAll, beforeAll, describe, expect, test } from 'bun:test'
import { execFileSync } from 'node:child_process'
import { appendFileSync, existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { changelogSince, compare, compareVersions, lockFile, packageDir, readLock } from './lock.ts'
import { defer, deferredRevision, diff, drift, main, ownPackage, sync, verify } from './tessera.ts'

Object.assign(process.env, {
  GIT_CONFIG_GLOBAL: '/dev/null',
  GIT_CONFIG_NOSYSTEM: '1',
  GIT_AUTHOR_NAME: 'Test',
  GIT_AUTHOR_EMAIL: 'test@example.invalid',
  GIT_COMMITTER_NAME: 'Test',
  GIT_COMMITTER_EMAIL: 'test@example.invalid'
})

const git = (cwd: string, args: string[]): string =>
  execFileSync('git', ['-C', cwd, ...args])
    .toString()
    .trim()

const NAME = 'tessera-example'
const OTHER = 'tessera-other'
const DIR = packageDir(NAME)

const base = mkdtempSync(join(tmpdir(), 'tessera-tooling-'))
const upstream = join(base, 'packages-tessera')
const site = join(base, 'site')

/** Releases the first package at `version`; the second stays as it was first written. */
function release(version: string, unit: string, note: string): void {
  for (const [name, source, at] of [
    [NAME, unit, version],
    [OTHER, 'export const other = 1\n', '0.1.0']
  ] as const) {
    const pkg = join(upstream, packageDir(name))
    mkdirSync(join(pkg, 'src'), { recursive: true })
    writeFileSync(join(pkg, 'package.json'), JSON.stringify({ name, version: at }))
    writeFileSync(join(pkg, 'src', 'unit.ts'), source)
  }
  const changelog = join(upstream, 'CHANGELOG.md')
  const text = existsSync(changelog) ? readFileSync(changelog, 'utf8').replace(/^# Changelog\n\n/, '') : ''
  writeFileSync(changelog, `# Changelog\n\n## ${version}\n\n- ${note}\n\n${text}`)
  git(upstream, ['add', '-A'])
  git(upstream, ['commit', '-q', '-m', `release ${version}`])
  git(upstream, ['tag', `v${version}`])
}

beforeAll(() => {
  mkdirSync(upstream)
  git(upstream, ['init', '-q', '-b', 'main'])
  release('0.1.0', 'export const a = 1\n', 'First cut.')
  mkdirSync(site)
  git(site, ['init', '-q', '-b', 'main'])
  writeFileSync(join(site, 'README.md'), 'A site\n')
  git(site, ['add', 'README.md'])
  git(site, ['commit', '-q', '-m', 'init'])
})

afterAll(() => rmSync(base, { recursive: true, force: true }))

describe('Lock helpers', () => {
  test('names the folder and the lock after the package', () => {
    expect(packageDir('tessera-tokens')).toBe('packages/tessera-tokens')
    expect(lockFile('tessera-tokens')).toBe('tessera-tokens-lock.json')
  })

  test('the tools act on the package that holds them', () => {
    expect(ownPackage()).toMatch(/^tessera(-[a-z]+)?$/)
  })

  test('compares digests into modified, missing and extra', () => {
    expect(compare({ a: '1', b: '2', c: '3' }, { a: '1', b: 'x', d: '4' })).toEqual({
      modified: ['b'],
      missing: ['c'],
      extra: ['d']
    })
  })

  test('orders releases by number, not by text', () => {
    expect(compareVersions('0.10.0', '0.9.1')).toBeGreaterThan(0)
    expect(compareVersions('1.0', '1.0.0')).toBe(0)
  })

  test('reads the changelog sections between two releases', () => {
    const log = '# Changelog\n\n## 0.3.0\n\n- C\n\n## 0.2.0\n\n- B\n\n## 0.1.0\n\n- A\n'
    expect(changelogSince(log, '0.1.0', '0.3.0').map((s) => s.split('\n')[0])).toEqual(['## 0.3.0', '## 0.2.0'])
  })
})

describe('Vendoring', () => {
  test('sync vendors one package, writes its lock and commits both by path', () => {
    writeFileSync(join(site, 'unrelated.txt'), 'left alone\n')
    expect(sync(site, upstream, NAME, { coAuthor: 'Test Model <model@example.invalid>' }).code).toBe(0)
    const lock = readLock(site, NAME)
    expect(lock.package).toBe(NAME)
    expect(lock.release).toBe('0.1.0')
    expect(lock.revision).toBe(git(upstream, ['rev-parse', 'v0.1.0']))
    expect(Object.keys(lock.files)).toEqual(['package.json', 'src/unit.ts'])
    expect(lock.source).toBe('../packages-tessera')
    expect(existsSync(join(site, packageDir(OTHER)))).toBe(false)
    expect(git(site, ['log', '-1', '--format=%s'])).toBe(`chore(tessera): vendor ${NAME} v0.1.0`)
    expect(git(site, ['log', '-1', '--format=%B'])).toEndWith('Co-authored-by: Test Model <model@example.invalid>')
    expect(sync(site, upstream, NAME, { coAuthor: 'bad\ntrailer' }).code).toBe(2)
    expect(git(site, ['status', '--porcelain'])).toBe('?? unrelated.txt')
  })

  test('verify passes on the copy and fails on a local edit', () => {
    expect(verify(site, NAME).code).toBe(0)
    appendFileSync(join(site, DIR, 'src', 'unit.ts'), 'export const b = 2\n')
    writeFileSync(join(site, DIR, 'src', 'extra.ts'), '')
    const result = verify(site, NAME)
    expect(result.code).toBe(1)
    expect(result.lines.join('\n')).toContain('modified src/unit.ts')
    expect(result.lines.join('\n')).toContain('extra    src/extra.ts')
  })

  test('diff writes the local edit as a patch with the Tessera paths', () => {
    const patch = diff(site, upstream, NAME).lines.join('\n')
    expect(patch).toContain(`--- a/${DIR}/src/unit.ts`)
    expect(patch).toContain(`+++ b/${DIR}/src/unit.ts`)
    expect(patch).toContain('+export const b = 2')
    git(site, ['checkout', '-q', '--', DIR])
    rmSync(join(site, DIR, 'src', 'extra.ts'))
    expect(verify(site, NAME).code).toBe(0)
  })

  test('drift is current until upstream releases, then fails until deferred', () => {
    expect(drift(site, upstream, NAME).code).toBe(0)
    release('0.2.0', 'export const a = 2\n', 'Second cut.')
    const behind = drift(site, upstream, NAME)
    expect(behind.code).toBe(1)
    expect(behind.lines.join('\n')).toContain('## 0.2.0')
    expect(behind.lines.join('\n')).toContain('changed src/unit.ts')
    expect(defer(site, NAME, '0.2.0', 'Waiting for the pilot', 'Test').code).toBe(0)
    const deferred = drift(site, upstream, NAME)
    expect(deferred.code).toBe(0)
    expect(deferred.lines.at(-1)).toBe(`${NAME}: behind, deferred: Waiting for the pilot`)
  })

  test('a deferral needs a reason, and taking the release settles it', () => {
    expect(defer(site, NAME, '0.3.0', '', 'Test').code).toBe(2)
    expect(sync(site, upstream, NAME, { to: '0.2.0', commit: false }).code).toBe(0)
    expect(readLock(site, NAME).deferred).toEqual([])
    expect(readLock(site, NAME).release).toBe('0.2.0')
    expect(drift(site, upstream, NAME).code).toBe(0)
  })

  test('a deferral tied to a commit does not cover a later snapshot of the release', () => {
    release('0.3.0', 'export const a = 3\n', 'Third cut.')
    const tagged = drift(site, upstream, NAME)
    expect(tagged.code).toBe(1)
    expect(tagged.lines.join('\n')).not.toContain('snapshot after')
    const head = git(upstream, ['rev-parse', 'main'])
    expect(deferredRevision(upstream, NAME, '0.3.0')).toBe(head)
    expect(deferredRevision(upstream, NAME, '0.4.0')).toBeUndefined()
    expect(defer(site, NAME, '0.3.0', 'Pilot first', 'Test', head).code).toBe(0)
    expect(readLock(site, NAME).deferred[0]?.revision).toBe(head)
    expect(drift(site, upstream, NAME).code).toBe(0)
    const changelog = join(upstream, 'CHANGELOG.md')
    writeFileSync(
      changelog,
      readFileSync(changelog, 'utf8').replace('# Changelog\n\n', '# Changelog\n\n## Unreleased\n\n- Later fix.\n\n')
    )
    appendFileSync(join(upstream, DIR, 'src', 'unit.ts'), '// later fix\n')
    git(upstream, ['add', '-A'])
    git(upstream, ['commit', '-q', '-m', 'later fix'])
    const later = drift(site, upstream, NAME)
    expect(later.code).toBe(1)
    const text = later.lines.join('\n')
    expect(text).toContain('main is a snapshot after v0.3.0')
    expect(text).toContain('## Unreleased')
    expect(text).toContain(`v0.3.0 was deferred at ${head.slice(0, 7)}`)
    expect(defer(site, NAME, '0.3.0', 'Whole release', 'Test').code).toBe(0)
    expect(readLock(site, NAME).deferred).toEqual([
      expect.objectContaining({ version: '0.3.0', reason: 'Whole release' })
    ])
    expect(readLock(site, NAME).deferred[0]?.revision).toBeUndefined()
    expect(drift(site, upstream, NAME).code).toBe(0)
  })

  test('a release that leaves a package alone is no drift for it', () => {
    expect(sync(site, upstream, OTHER, { to: '0.1.0', commit: false }).code).toBe(0)
    const result = drift(site, upstream, OTHER)
    expect(result.code).toBe(0)
    expect(result.lines.at(-1)).toBe(`${OTHER}: current at v0.1.0; no change in the package`)
  })
})

test('the command line answers usage for an unknown command', () => {
  expect(main(['nothing'], site, NAME).code).toBe(2)
})

test('human sync without a co-author does not invent model attribution', () => {
  const humanSite = join(base, 'human-site')
  mkdirSync(humanSite)
  git(humanSite, ['init', '-q', '-b', 'main'])
  expect(sync(humanSite, upstream, NAME, { to: '0.1.0' }).code).toBe(0)
  expect(git(humanSite, ['log', '-1', '--format=%B'])).toBe(`chore(tessera): vendor ${NAME} v0.1.0`)
})
