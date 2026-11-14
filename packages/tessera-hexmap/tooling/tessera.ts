#!/usr/bin/env bun
// The vendoring tools, run from a consuming repository's root. Each Tessera
// package carries the same tools and acts on itself, so a consumer runs the
// copy inside the package it means:
//
//   bun packages/<package>/tooling/tessera.ts verify
//   bun packages/<package>/tooling/tessera.ts drift
//   bun packages/<package>/tooling/tessera.ts sync [--to <version>] [--no-commit] [--co-author "Name <email>"]
//   bun packages/<package>/tooling/tessera.ts defer <version> --reason "<why>" [--by <name>]
//   bun packages/<package>/tooling/tessera.ts diff
//
// A deferral of the release on the checkout's `main` records that commit, so a
// later snapshot under the same release label shows again.
//
// `verify` is offline and reads only the copy and its lock. The others read a
// local checkout of Tessera, `../packages-tessera` or TESSERA_CHECKOUT, through
// Git, and never fetch: the session fetches the checkout first when it means to
// compare against the remote.

import { execFileSync } from 'node:child_process'
import { cpSync, existsSync, mkdtempSync, readFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { basename, join, resolve } from 'node:path'
import {
  changelogSince,
  changelogUnreleased,
  compare,
  compareVersions,
  type Deferral,
  digestTree,
  isClean,
  lockFile,
  packageDir,
  readLock,
  SOURCE,
  type TesseraLock,
  writeLock
} from './lock.ts'

const git = (cwd: string, args: string[]): Buffer => execFileSync('git', ['-C', cwd, ...args], { maxBuffer: 1 << 28 })
const gitText = (cwd: string, args: string[]): string => git(cwd, args).toString().trim()
const today = (): string => new Date().toISOString().slice(0, 10)

/** The package these tools belong to: the folder that holds `tooling/`. */
export const ownPackage = (): string => basename(resolve(import.meta.dirname, '..'))

export function defaultCheckout(root: string): string {
  return process.env['TESSERA_CHECKOUT'] || resolve(root, SOURCE)
}

/** The package tree at a revision of the checkout, in a fresh temporary folder. */
function extract(checkout: string, revision: string, name: string): string {
  const dir = mkdtempSync(join(tmpdir(), 'tessera-'))
  const tar = git(checkout, ['archive', '--format=tar', revision, packageDir(name)])
  execFileSync('tar', ['-x', '-f', '-', '-C', dir], { input: tar })
  return dir
}

export interface Result {
  /** The exit code. */
  code: number
  /** What to print. */
  lines: string[]
}

/** Fails on any modified, missing or extra file in the copy. */
export function verify(root: string, name: string): Result {
  const lock = readLock(root, name)
  const c = compare(lock.files, digestTree(join(root, packageDir(name))))
  if (isClean(c)) return { code: 0, lines: [`${name}: ${packageDir(name)} matches ${SOURCE} v${lock.release}`] }
  return {
    code: 1,
    lines: [
      `${name}: ${packageDir(name)} differs from ${SOURCE} v${lock.release}; change it upstream, then sync.`,
      ...c.modified.map((f) => `  modified ${f}`),
      ...c.missing.map((f) => `  missing  ${f}`),
      ...c.extra.map((f) => `  extra    ${f}`),
      `  \`self:${name}:diff\` writes the change as a patch for a change request.`
    ]
  }
}

/** What upstream changed since the lock's revision. Exits 1 when the copy is behind and that release is not deferred. */
export function drift(root: string, checkout: string, name: string, branch = 'main'): Result {
  const lock = readLock(root, name)
  const dir = packageDir(name)
  const head = gitText(checkout, ['rev-parse', branch])
  const date = gitText(checkout, ['log', '-1', '--format=%cs', branch])
  const release = (JSON.parse(gitText(checkout, ['show', `${branch}:${dir}/package.json`])) as { version: string })
    .version
  const lines = [`${name}: checkout ${checkout} at ${head.slice(0, 7)} (${date}), release v${release}`]
  if (head === lock.revision) return { code: 0, lines: [...lines, `${name}: current at v${lock.release}`] }
  const changed = gitText(checkout, ['diff', '--name-only', lock.revision, branch, '--', dir])
    .split('\n')
    .filter(Boolean)
  if (!changed.length)
    return { code: 0, lines: [...lines, `${name}: current at v${lock.release}; no change in the package`] }
  const changelog = gitText(checkout, ['show', `${branch}:CHANGELOG.md`])
  const tagged = gitText(checkout, ['tag', '--list', `v${release}`]) !== ''
  const atTag = tagged && gitText(checkout, ['rev-parse', `v${release}^{commit}`]) === head
  lines.push(
    `${name}: v${lock.release} (${lock.revision.slice(0, 7)}) is behind; ${changed.length} file(s) changed upstream`,
    ...(atTag ? [] : [`${name}: ${branch} is a snapshot after v${release}, not a tagged release`]),
    ...[...(atTag ? [] : changelogUnreleased(changelog)), ...changelogSince(changelog, lock.release, release)].map(
      (s) => s.replace(/^/gm, '  ')
    ),
    ...changed.map((f) => `  changed ${f.slice(dir.length + 1)}`)
  )
  const deferral = lock.deferred.find((d) => d.version === release && (!d.revision || d.revision === head))
  if (deferral) return { code: 0, lines: [...lines, `${name}: behind, deferred: ${deferral.reason}`] }
  const earlier = lock.deferred.find((d) => d.version === release)
  if (earlier?.revision)
    lines.push(`${name}: v${release} was deferred at ${earlier.revision.slice(0, 7)}; ${branch} has changed since`)
  return {
    code: 1,
    lines: [...lines, `${name}: accept with \`self:${name}:sync\`, or reject with \`self:${name}:defer\``]
  }
}

export interface SyncOptions {
  /** A tagged release to take, such as `0.3.0`; without it, the checkout's branch. */
  to?: string | undefined
  /** Commit the copy and the lock by path; on by default. */
  commit?: boolean
  branch?: string
  /** `Name <email>`, added as a `Co-authored-by` trailer. */
  coAuthor?: string | undefined
}

/** Accepts a release: copies the package from the checkout, rewrites the lock, and commits both by path. */
export function sync(root: string, checkout: string, name: string, options: SyncOptions = {}): Result {
  if (options.coAuthor && !/^[^<>\r\n]+ <[^<>\s]+@[^<>\s]+>$/.test(options.coAuthor))
    return { code: 2, lines: [`${name}: --co-author must be Name <email>`] }
  const dir = packageDir(name)
  const revision = gitText(checkout, ['rev-parse', options.to ? `v${options.to}^{commit}` : (options.branch ?? 'main')])
  const tmp = extract(checkout, revision, name)
  try {
    const target = join(root, dir)
    rmSync(target, { recursive: true, force: true })
    cpSync(join(tmp, dir), target, { recursive: true })
  } finally {
    rmSync(tmp, { recursive: true, force: true })
  }
  const release = (JSON.parse(readFileSync(join(root, dir, 'package.json'), 'utf8')) as { version: string }).version
  const previous = existsSync(join(root, lockFile(name))) ? readLock(root, name) : undefined
  const lock: TesseraLock = {
    version: 1,
    source: SOURCE,
    package: name,
    release,
    revision,
    vendored: today(),
    files: digestTree(join(root, dir)),
    // A deferral of this release or an older one is settled by taking it.
    deferred: (previous?.deferred ?? []).filter((d) => compareVersions(d.version, release) > 0)
  }
  writeLock(root, lock)
  const lines = [`${name}: vendored ${SOURCE} ${name} v${release} (${revision.slice(0, 7)})`]
  if (options.commit === false) return { code: 0, lines }
  const paths = [dir, lockFile(name)]
  git(root, ['add', '-A', '--', ...paths])
  const trailer = options.coAuthor ? `\n\nCo-authored-by: ${options.coAuthor}` : ''
  git(root, ['commit', '-q', '-m', `chore(tessera): vendor ${name} v${release}${trailer}`, '--', ...paths])
  return { code: 0, lines: [...lines, `${name}: committed`] }
}

/**
 * Rejects a release on record: the copy stays, and `drift` stops failing on it.
 * With a revision, the deferral covers only that commit of the release.
 */
export function defer(
  root: string,
  name: string,
  version: string,
  reason: string,
  decidedBy: string,
  revision?: string
): Result {
  if (!reason) return { code: 2, lines: [`${name}: a deferral needs --reason`] }
  const lock = readLock(root, name)
  const deferral: Deferral = { version, ...(revision ? { revision } : {}), reason, decidedBy, date: today() }
  lock.deferred = [...lock.deferred.filter((d) => d.version !== version), deferral]
  writeLock(root, lock)
  const at = revision ? ` at ${revision.slice(0, 7)}` : ''
  return { code: 0, lines: [`${name}: v${version}${at} deferred: ${reason}`] }
}

/**
 * The checkout's commit to tie a deferral to: `main` when it carries the
 * release, else none, and the deferral covers the whole release.
 */
export function deferredRevision(checkout: string, name: string, version: string, branch = 'main'): string | undefined {
  try {
    const release = (
      JSON.parse(gitText(checkout, ['show', `${branch}:${packageDir(name)}/package.json`])) as { version: string }
    ).version
    return release === version ? gitText(checkout, ['rev-parse', branch]) : undefined
  } catch {
    return undefined
  }
}

/** The copy's local edits as a patch against the release it was vendored from, with Tessera's paths. */
export function diff(root: string, checkout: string, name: string): Result {
  const lock = readLock(root, name)
  const dir = packageDir(name)
  const tmp = extract(checkout, lock.revision, name)
  try {
    cpSync(join(root, dir), join(tmp, 'local'), { recursive: true })
    let patch = ''
    try {
      execFileSync('git', ['diff', '--no-index', '--no-color', '--', dir, 'local'], { cwd: tmp })
    } catch (error) {
      // git diff --no-index exits 1 when the trees differ; the patch is its output.
      patch = String((error as { stdout?: Buffer }).stdout ?? '')
    }
    patch = patch.replace(/^((?:diff --git|\+\+\+|---) .*)$/gm, (line) => line.replaceAll(' b/local/', ` b/${dir}/`))
    return { code: 0, lines: patch ? [patch.trimEnd()] : [] }
  } finally {
    rmSync(tmp, { recursive: true, force: true })
  }
}

export function main(argv: string[], root = process.cwd(), name = ownPackage()): Result {
  const [command, ...rest] = argv
  const flag = (option: string): string | undefined => {
    const at = rest.indexOf(option)
    return at >= 0 ? rest[at + 1] : undefined
  }
  const checkout = defaultCheckout(root)
  switch (command) {
    case 'verify':
      return verify(root, name)
    case 'drift':
      return drift(root, checkout, name)
    case 'sync':
      return sync(root, checkout, name, {
        to: flag('--to'),
        commit: !rest.includes('--no-commit'),
        coAuthor: flag('--co-author')
      })
    case 'defer': {
      const version = rest[0] ?? ''
      const by = flag('--by') ?? gitText(root, ['config', 'user.name'])
      return defer(root, name, version, flag('--reason') ?? '', by, deferredRevision(checkout, name, version))
    }
    case 'diff':
      return diff(root, checkout, name)
    default:
      return {
        code: 2,
        lines: ['usage: tessera.ts verify | drift | sync [--to <version>] | defer <version> --reason <why> | diff']
      }
  }
}

if (import.meta.main) {
  const result = main(process.argv.slice(2))
  for (const line of result.lines) console.log(line)
  process.exit(result.code)
}
