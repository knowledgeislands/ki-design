import { execFile } from 'node:child_process'
import { mkdir, mkdtemp, readdir, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { promisify } from 'node:util'
import { afterAll, beforeAll, expect, test } from 'vitest'

const execute = promisify(execFile)
const root = resolve(import.meta.dirname, '../../..')
const tooling = join(root, 'tooling/depcruise')
const checker = join(tooling, 'node_modules/.bin/depcruise')

interface Edge {
  module: string
  resolved: string
  couldNotResolve: boolean
  dependencyTypes: string[]
}
interface Graph {
  modules: { source: string; dependencies: Edge[] }[]
  summary: { violations: { from: string; to: string; rule: { name: string } }[] }
}

/** A deliberate violation exits non-zero but still supplies the graph that the assertions must inspect. */
async function output(program: string, args: string[], cwd: string): Promise<string> {
  try {
    return (await execute(program, args, { cwd, maxBuffer: 16 * 1024 * 1024 })).stdout
  } catch (error) {
    const failure = error as { stdout?: string }
    if (!failure.stdout?.trim()) throw error
    return failure.stdout
  }
}

const cruise = async (cwd: string, paths: string[]): Promise<Graph> =>
  JSON.parse(await output(checker, ['--config', '.dependency-cruiser.ts', '--output-type', 'json', ...paths], cwd))

let graph: Graph
let crossed: Graph
let scratch: string

// Each fixture is created outside the checkout and removed after the proof, including failed assertions.
const fixtures: Record<string, string> = {
  'packages/tessera-tokens/src/index.ts': 'export const tokens = 1\n',
  'packages/tessera-symbols/src/index.ts': 'export const symbols = 1\n',
  'packages/tessera-tiles/src/index.ts': 'export const tiles = 1\n',
  'packages/tessera-icons/src/reaches-tokens.ts': "import '../../tessera-tokens/src/index.ts'\n",
  'packages/tessera-symbols/src/reaches-tokens.ts': "import '../../tessera-tokens/src/index.ts'\n",
  'packages/tessera-tiles/src/reaches-icons.ts': "import '../../tessera-icons/src/index.ts'\n",
  'packages/tessera-hexmap/src/reaches-symbols.ts': "import '../../tessera-symbols/src/index.ts'\n",
  'packages/tessera/src/reaches-tiles.ts': "import '../../tessera-tiles/src/index.ts'\n",
  'packages/tessera-icons/src/index.ts': 'export type Icon = string\n',
  'packages/tessera-tokens/src/reaches-icons.ts':
    "import type { Icon } from '../../tessera-icons/src/index.ts'\nexport type Value = Icon\n",
  'packages/tessera-icons/scripts/draw.ts': 'export const draw = 1\n',
  'packages/tessera-icons/src/command.ts': "import '../scripts/draw.ts'\n",
  'packages/tessera-icons/src/consumer.ts': "import '../../../apps/storybook/observatory/client/api.ts'\n",
  'apps/storybook/observatory/client/registry.ts': 'export const instruments = []\n',
  'apps/storybook/observatory/client/views/extensions.ts': "import '../registry.ts'\n",
  'apps/storybook/observatory/client/api.ts': "import 'node:fs'\n",
  'packages/tessera-icons/src/fixture.test-support.ts': 'export const fixture = 1\n',
  'packages/tessera-icons/src/product.ts': "import './fixture.test-support.ts'\n",
  'packages/tessera-icons/src/cycle-a.ts': "import './cycle-b.ts'\n",
  'packages/tessera-icons/src/cycle-b.ts': "import './cycle-a.ts'\n",
  'packages/tessera-icons/src/missing.ts': "import './absent.ts'\n"
}

const crossings = [
  [
    'tessera-icons-dependency-direction',
    'packages/tessera-icons/src/reaches-tokens.ts',
    'packages/tessera-tokens/src/index.ts'
  ],
  [
    'tessera-symbols-dependency-direction',
    'packages/tessera-symbols/src/reaches-tokens.ts',
    'packages/tessera-tokens/src/index.ts'
  ],
  [
    'tessera-tiles-dependency-direction',
    'packages/tessera-tiles/src/reaches-icons.ts',
    'packages/tessera-icons/src/index.ts'
  ],
  [
    'tessera-hexmap-dependency-direction',
    'packages/tessera-hexmap/src/reaches-symbols.ts',
    'packages/tessera-symbols/src/index.ts'
  ],
  ['tessera-dependency-direction', 'packages/tessera/src/reaches-tiles.ts', 'packages/tessera-tiles/src/index.ts'],
  [
    'tessera-tokens-dependency-direction',
    'packages/tessera-tokens/src/reaches-icons.ts',
    'packages/tessera-icons/src/index.ts'
  ],
  [
    'package-source-meets-by-package-name',
    'packages/tessera-tokens/src/reaches-icons.ts',
    'packages/tessera-icons/src/index.ts'
  ],
  [
    'source-does-not-import-artwork-commands',
    'packages/tessera-icons/src/command.ts',
    'packages/tessera-icons/scripts/draw.ts'
  ],
  [
    'libraries-do-not-import-consumers',
    'packages/tessera-icons/src/consumer.ts',
    'apps/storybook/observatory/client/api.ts'
  ],
  [
    'preview-views-do-not-import-the-registry',
    'apps/storybook/observatory/client/views/extensions.ts',
    'apps/storybook/observatory/client/registry.ts'
  ],
  ['preview-client-reaches-no-runtime-built-in', 'apps/storybook/observatory/client/api.ts', 'fs'],
  [
    'tests-do-not-leak-into-product',
    'packages/tessera-icons/src/product.ts',
    'packages/tessera-icons/src/fixture.test-support.ts'
  ],
  ['no-circular', 'packages/tessera-icons/src/cycle-a.ts', 'packages/tessera-icons/src/cycle-b.ts']
] as const

beforeAll(async () => {
  const members = (await readdir(join(root, 'packages'), { withFileTypes: true }))
    .filter((entry) => entry.isDirectory())
    .map((entry) => `packages/${entry.name}`)
  const rootFiles = (await readdir(root)).filter((name) => name.endsWith('.ts'))
  graph = await cruise(root, [...members, 'apps/storybook/observatory', 'docs/design-review/generators', ...rootFiles])
  scratch = await mkdtemp(join(tmpdir(), 'design-boundary-proof-'))
  await writeFile(join(scratch, '.dependency-cruiser.ts'), await readFile(join(root, '.dependency-cruiser.ts')))
  await writeFile(
    join(scratch, 'tsconfig.json'),
    JSON.stringify({ extends: join(root, 'tsconfig.json'), include: ['**/*.ts'], exclude: [] })
  )
  for (const [path, source] of Object.entries(fixtures)) {
    await mkdir(dirname(join(scratch, path)), { recursive: true })
    await writeFile(join(scratch, path), source)
  }
  crossed = await cruise(scratch, Object.keys(fixtures))
}, 60_000)

afterAll(async () => {
  if (scratch) await rm(scratch, { recursive: true, force: true })
})

test('uses the supported isolated TypeScript transpiler', async () => {
  const transpilers = JSON.parse(
    await output(
      'node',
      [
        '--input-type=module',
        '--eval',
        "import {getAvailableTranspilers} from 'dependency-cruiser'; console.log(JSON.stringify(getAvailableTranspilers()))"
      ],
      tooling
    )
  ) as { name: string; available: boolean }[]
  expect(transpilers.find((entry) => entry.name === 'typescript')?.available).toBe(true)
  const repository = JSON.parse(await readFile(join(root, 'package.json'), 'utf8'))
  const isolated = JSON.parse(await readFile(join(tooling, 'package.json'), 'utf8'))
  expect(isolated.dependencies['dependency-cruiser']).toBe(repository.devDependencies['dependency-cruiser'])
})

test('reads the real graph, including resolved type-only package crossings', () => {
  // There are 77 authored source files today; private audit copies omit generated dist leaves.
  expect(
    graph.modules.filter((module) => /^(packages|apps|docs)\//u.test(module.source)).length
  ).toBeGreaterThanOrEqual(75)
  const symbols = graph.modules.find((module) => module.source === 'packages/tessera-symbols/src/types.ts')
  expect(symbols?.dependencies).toContainEqual(
    expect.objectContaining({
      module: 'tessera-icons',
      resolved: expect.stringMatching(/(?:^|\/)packages\/tessera-icons\/src\/index\.ts$/u),
      couldNotResolve: false,
      dependencyTypes: expect.arrayContaining(['type-only'])
    })
  )
  expect(graph.modules.flatMap((module) => module.dependencies).some((edge) => edge.couldNotResolve)).toBe(false)
  expect(graph.summary.violations).toEqual([])
})

test.each(crossings)('trips %s for %s -> %s', (rule, from, to) => {
  expect(crossed.modules.find((module) => module.source === from)?.dependencies).toContainEqual(
    expect.objectContaining({ resolved: to, couldNotResolve: false })
  )
  expect(
    crossed.summary.violations
      .filter((violation) => violation.from === from && violation.to === to)
      .map((violation) => violation.rule.name)
  ).toContain(rule)
})

test('reports imports that cannot resolve', () => {
  expect(
    crossed.summary.violations.some(
      (violation) =>
        violation.from === 'packages/tessera-icons/src/missing.ts' && violation.rule.name === 'no-unresolvable'
    )
  ).toBe(true)
})
