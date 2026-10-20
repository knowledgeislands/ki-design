import { execFile } from 'node:child_process'
import { mkdir, mkdtemp, readdir, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { promisify } from 'node:util'
import { afterAll, beforeAll, expect, test } from 'vitest'

const execute = promisify(execFile)
const root = resolve(import.meta.dirname, '../../..')
const tooling = join(root, 'tooling/boundaries')
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
  'packages/tokens/src/index.ts': 'export const tokens = 1\n',
  'packages/symbols/src/index.ts': 'export const symbols = 1\n',
  'packages/tiles/src/index.ts': 'export const tiles = 1\n',
  'packages/icons/src/reaches-tokens.ts': "import '../../tokens/src/index.ts'\n",
  'packages/symbols/src/reaches-tokens.ts': "import '../../tokens/src/index.ts'\n",
  'packages/tiles/src/reaches-icons.ts': "import '../../icons/src/index.ts'\n",
  'packages/hexmap/src/reaches-symbols.ts': "import '../../symbols/src/index.ts'\n",
  'packages/elements/src/reaches-tiles.ts': "import '../../tiles/src/index.ts'\n",
  'packages/icons/src/index.ts': 'export type Icon = string\n',
  'packages/tokens/src/reaches-icons.ts':
    "import type { Icon } from '../../icons/src/index.ts'\nexport type Value = Icon\n",
  'packages/icons/scripts/draw.ts': 'export const draw = 1\n',
  'packages/icons/src/command.ts': "import '../scripts/draw.ts'\n",
  'packages/icons/src/consumer.ts': "import '../../../examples/observatory-preview/server.ts'\n",
  'examples/observatory-preview/server.ts': 'export const server = 1\n',
  'examples/observatory-preview/client/registry.ts': 'export const instruments = []\n',
  'examples/observatory-preview/client/views/extensions.ts': "import '../registry.ts'\n",
  'examples/observatory-preview/client/api.ts': "import '../server.ts'\nimport 'node:fs'\n",
  'packages/icons/src/fixture.test-support.ts': 'export const fixture = 1\n',
  'packages/icons/src/product.ts': "import './fixture.test-support.ts'\n",
  'packages/icons/src/cycle-a.ts': "import './cycle-b.ts'\n",
  'packages/icons/src/cycle-b.ts': "import './cycle-a.ts'\n",
  'packages/icons/src/missing.ts': "import './absent.ts'\n"
}

const crossings = [
  ['icons-dependency-direction', 'packages/icons/src/reaches-tokens.ts', 'packages/tokens/src/index.ts'],
  ['symbols-dependency-direction', 'packages/symbols/src/reaches-tokens.ts', 'packages/tokens/src/index.ts'],
  ['tiles-dependency-direction', 'packages/tiles/src/reaches-icons.ts', 'packages/icons/src/index.ts'],
  ['hexmap-dependency-direction', 'packages/hexmap/src/reaches-symbols.ts', 'packages/symbols/src/index.ts'],
  ['elements-dependency-direction', 'packages/elements/src/reaches-tiles.ts', 'packages/tiles/src/index.ts'],
  ['tokens-dependency-direction', 'packages/tokens/src/reaches-icons.ts', 'packages/icons/src/index.ts'],
  ['package-source-meets-by-package-name', 'packages/tokens/src/reaches-icons.ts', 'packages/icons/src/index.ts'],
  ['source-does-not-import-artwork-commands', 'packages/icons/src/command.ts', 'packages/icons/scripts/draw.ts'],
  ['libraries-do-not-import-consumers', 'packages/icons/src/consumer.ts', 'examples/observatory-preview/server.ts'],
  [
    'preview-views-do-not-import-the-registry',
    'examples/observatory-preview/client/views/extensions.ts',
    'examples/observatory-preview/client/registry.ts'
  ],
  [
    'preview-client-does-not-import-the-server',
    'examples/observatory-preview/client/api.ts',
    'examples/observatory-preview/server.ts'
  ],
  ['preview-client-reaches-no-runtime-built-in', 'examples/observatory-preview/client/api.ts', 'fs'],
  ['tests-do-not-leak-into-product', 'packages/icons/src/product.ts', 'packages/icons/src/fixture.test-support.ts'],
  ['no-circular', 'packages/icons/src/cycle-a.ts', 'packages/icons/src/cycle-b.ts']
] as const

beforeAll(async () => {
  const members = (await readdir(join(root, 'packages'), { withFileTypes: true }))
    .filter((entry) => entry.isDirectory())
    .map((entry) => `packages/${entry.name}`)
  const rootFiles = (await readdir(root)).filter((name) => name.endsWith('.ts'))
  graph = await cruise(root, [
    ...members,
    'examples/observatory-preview',
    'docs/design-review/generators',
    ...rootFiles
  ])
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
    graph.modules.filter((module) => /^(packages|examples|docs)\//u.test(module.source)).length
  ).toBeGreaterThanOrEqual(75)
  const symbols = graph.modules.find((module) => module.source === 'packages/symbols/src/types.ts')
  expect(symbols?.dependencies).toContainEqual(
    expect.objectContaining({
      module: '@knowledgeislands/icons',
      resolved: expect.stringMatching(/(?:^|\/)packages\/icons\/src\/index\.ts$/u),
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
      (violation) => violation.from === 'packages/icons/src/missing.ts' && violation.rule.name === 'no-unresolvable'
    )
  ).toBe(true)
})
