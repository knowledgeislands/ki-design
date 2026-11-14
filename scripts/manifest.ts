/**
 * Writes `packages/tessera/custom-elements.json`, the Custom Elements Manifest of Tessera's web components, with the
 * Custom Elements Manifest analyser (ELEMENTS-MANIFEST a). Storybook builds its controls and docs from it, and any
 * consumer may read it.
 *
 *   bun scripts/manifest.ts           writes the manifest
 *   bun scripts/manifest.ts --check   fails when the committed manifest is not what the source gives
 *
 * The analyser reads Lit's static `properties`, so a reactive property kept as internal state (`state: true`) would
 * otherwise be published as an attribute; those are removed here. The result is formatted as Biome formats it. The
 * analyser also writes a `customElements` field into the package's `package.json`; that field is kept by hand, so the
 * file is put back as it was.
 */
import { execFileSync } from 'node:child_process'
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { join, relative, resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const pkg = join(root, 'packages/tessera')
const target = join(pkg, 'custom-elements.json')
const bin = (name: string): string => join(root, 'node_modules/.bin', name)

interface Named {
  name: string
  fieldName?: string
}
interface Declaration {
  customElement?: boolean
  members?: Named[]
  attributes?: Named[]
}
interface Manifest {
  modules: { path: string; declarations?: Declaration[] }[]
}

/** Names of the reactive properties a module keeps as internal state. */
const stateNames = (source: string): Set<string> =>
  new Set([...source.matchAll(/^\s+(\w+): \{ state: true \}/gm)].map((match) => match[1] as string))

export function generate(): string {
  const scratch = mkdtempSync(join(root, 'node_modules/.cache-manifest-'))
  const packageJson = join(pkg, 'package.json')
  const packageText = readFileSync(packageJson, 'utf8')
  try {
    execFileSync(
      bin('cem'),
      [
        'analyze',
        '--litelement',
        '--globs',
        'src/*.ts',
        '--exclude',
        'src/*.test.ts',
        '--outdir',
        relative(pkg, scratch),
        '--quiet'
      ],
      { cwd: pkg, stdio: ['ignore', 'ignore', 'inherit'] }
    )
    const manifest = JSON.parse(readFileSync(join(scratch, 'custom-elements.json'), 'utf8')) as Manifest
    for (const module of manifest.modules) {
      const internal = stateNames(readFileSync(join(pkg, module.path), 'utf8'))
      for (const declaration of module.declarations ?? []) {
        if (!declaration.customElement) continue
        declaration.members = declaration.members?.filter((member) => !internal.has(member.name))
        declaration.attributes = declaration.attributes?.filter(
          (attribute) => !internal.has(attribute.fieldName ?? attribute.name)
        )
      }
    }
    return execFileSync(bin('biome'), ['format', `--stdin-file-path=${relative(root, target)}`], {
      cwd: root,
      input: `${JSON.stringify(manifest, null, 2)}\n`
    }).toString()
  } finally {
    writeFileSync(packageJson, packageText)
    rmSync(scratch, { recursive: true, force: true })
  }
}

if (import.meta.main) {
  const manifest = generate()
  if (process.argv.includes('--check')) {
    if (readFileSync(target, 'utf8') !== manifest) {
      console.error('manifest: packages/tessera/custom-elements.json is stale; run `bun run self:manifest`')
      process.exit(1)
    }
    console.log('manifest: packages/tessera/custom-elements.json is current')
  } else {
    writeFileSync(target, manifest)
    console.log('manifest: wrote packages/tessera/custom-elements.json')
  }
}
