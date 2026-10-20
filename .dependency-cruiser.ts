import type { IConfiguration } from 'dependency-cruiser'

/** Package directions follow the declared dependencies, including those used only by tests and examples. */
const directions = {
  tokens: [],
  icons: [],
  symbols: ['icons'],
  tiles: ['tokens'],
  hexmap: ['tokens', 'icons'],
  elements: ['tokens', 'icons', 'hexmap']
} as const

type Package = keyof typeof directions
const packages = Object.keys(directions) as Package[]
const owners = (...names: readonly string[]) => `^packages/(${names.join('|')})/`
const source = '^packages/[^/]+/src/'
const commands = '^packages/[^/]+/scripts/'
const preview = '^examples/observatory-preview/'
const testFile = '\\.(test|test-support)\\.[cm]?[jt]sx?$'

const config: IConfiguration = {
  forbidden: [
    {
      name: 'no-circular',
      comment: 'Shared contracts sit beneath their callers; neither value nor type imports may form a cycle.',
      severity: 'error',
      from: {},
      to: { circular: true }
    },
    {
      name: 'no-unresolvable',
      comment: 'Every import must resolve before its destination can be checked against a boundary.',
      severity: 'error',
      from: {},
      to: { couldNotResolve: true }
    },
    ...packages.map((name) => ({
      name: `${name}-dependency-direction`,
      comment: `${name} source may use only its declared design dependencies: ${directions[name].join(', ') || 'none'}. Commands do not change the library direction.`,
      severity: 'error' as const,
      from: { path: `${owners(name)}src/` },
      to: {
        path: owners(
          ...packages.filter((other) => other !== name && !(directions[name] as readonly string[]).includes(other))
        )
      }
    })),
    {
      name: 'source-does-not-import-artwork-commands',
      comment: 'Library source supplies consumers; artwork and contact-sheet commands consume it, never the reverse.',
      severity: 'error',
      from: { path: source },
      to: { path: commands }
    },
    {
      name: 'libraries-do-not-import-consumers',
      comment:
        'The preview and design-review generators compose libraries; library source cannot depend on those consumers or checker tooling.',
      severity: 'error',
      from: { path: source },
      to: { path: '^(examples/|docs/|tooling/|packages/boundaries/)' }
    },
    {
      name: 'package-source-meets-by-package-name',
      comment:
        'A library reaches another library through its declared package API, rather than a relative path into its source.',
      severity: 'error',
      from: { path: '^packages/([^/]+)/src/' },
      to: { dependencyTypes: ['local'], path: '^packages/', pathNot: '^packages/$1/' }
    },
    {
      name: 'preview-views-do-not-import-the-registry',
      comment:
        'The registry composes views and injects catalogue and enablement controls; a view cannot import its composer.',
      severity: 'error',
      from: { path: `${preview}client/views/` },
      to: { path: `${preview}client/registry\\.ts$` }
    },
    {
      name: 'preview-client-does-not-import-the-server',
      comment: 'The browser uses the HTTP API; server implementation stays outside its import graph.',
      severity: 'error',
      from: { path: `${preview}client/` },
      to: { path: `${preview}server\\.ts$` }
    },
    {
      name: 'preview-client-reaches-no-runtime-built-in',
      comment: 'The preview client runs in the browser, where Node and Bun runtime modules are unavailable.',
      severity: 'error',
      from: { path: `${preview}client/` },
      to: { dependencyTypes: ['core'] }
    },
    {
      name: 'tests-do-not-leak-into-product',
      comment:
        'Tests and their helpers exercise the product; importing them from product source would reverse that seam.',
      severity: 'error',
      from: { pathNot: testFile },
      to: { path: testFile }
    }
  ],
  options: {
    doNotFollow: { path: 'node_modules' },
    tsConfig: { fileName: 'tsconfig.json' },
    tsPreCompilationDeps: true,
    builtInModules: { add: ['bun', 'bun:test', 'bun:sqlite', 'bun:ffi', 'bun:jsc'] },
    enhancedResolveOptions: {
      exportsFields: ['exports'],
      conditionNames: ['import', 'types', 'bun', 'node', 'default'],
      extensions: ['.ts', '.d.ts', '.js', '.mjs', '.json']
    }
  }
}

export default config
