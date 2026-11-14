import { readdir, readFile } from 'node:fs/promises'
import { join, resolve } from 'node:path'
import { expect, test } from 'vitest'

const root = resolve(import.meta.dirname, '../../..')

/** The vendored packages: every folder under packages/ named tessera or tessera-<layer>. */
async function vendored(): Promise<string[]> {
  return (await readdir(join(root, 'packages'), { withFileTypes: true }))
    .filter((entry) => entry.isDirectory() && /^tessera(-[a-z]+)?$/u.test(entry.name))
    .map((entry) => entry.name)
    .sort()
}

test('every layer is a vendored package', async () => {
  expect(await vendored()).toEqual([
    'tessera',
    'tessera-hexmap',
    'tessera-icons',
    'tessera-symbols',
    'tessera-tiles',
    'tessera-tokens'
  ])
})

test('every package carries the same vendoring tools', async () => {
  const [first, ...others] = await vendored()
  const files = (await readdir(join(root, 'packages', first as string, 'tooling'))).sort()
  expect(files).toEqual(['lock.ts', 'tessera.ts', 'tooling.test.ts'])
  for (const name of others) {
    expect((await readdir(join(root, 'packages', name, 'tooling'))).sort()).toEqual(files)
    for (const file of files) {
      const copy = await readFile(join(root, 'packages', name, 'tooling', file), 'utf8')
      const canonical = await readFile(join(root, 'packages', first as string, 'tooling', file), 'utf8')
      expect(copy, `packages/${name}/tooling/${file}`).toBe(canonical)
    }
  }
})

test('every package ships its tools', async () => {
  for (const name of await vendored()) {
    const manifest = JSON.parse(await readFile(join(root, 'packages', name, 'package.json'), 'utf8'))
    expect(manifest.name).toBe(name)
    expect(manifest.files, `${name} ships its tools`).toContain('tooling')
  }
})

test('a vendored tsconfig stands alone', async () => {
  for (const name of await vendored()) {
    const config = JSON.parse(await readFile(join(root, 'packages', name, 'tsconfig.json'), 'utf8'))
    expect(config.extends, `packages/${name}/tsconfig.json`).toBeUndefined()
  }
})
