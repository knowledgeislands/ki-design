import { describe, expect, test } from 'bun:test'
import { buildBoards, clearObservatoryRow, observatoryGap, staleBoards } from './build-boards.ts'

const built = buildBoards()
const boards = [...built].filter(([file]) => file.endsWith('.dc.html'))
const canvas = JSON.parse(built.get('canvas.json') ?? '{}') as { boards: Record<string, { h: number }> }

const voids = new Set(['img', 'input', 'br', 'meta', 'link', 'line', 'rect', 'circle', 'path', 'polygon', 'polyline'])

/** The board's markup inside `<x-dc>`, its logic script and its declared preview size. */
function parts(html: string): { markup: string; script: string; preview: { width: number; height: number } } {
  const markup = /<x-dc>([\s\S]*?)<\/x-dc>/.exec(html)?.[1] ?? ''
  const script = /<script type="text\/x-dc" data-dc-script data-props='([^']*)'>([\s\S]*?)<\/script>/.exec(html)
  const props = JSON.parse(script?.[1] ?? '{}') as { $preview: { width: number; height: number } }
  return { markup, script: script?.[2] ?? '', preview: props.$preview }
}

describe('design review boards', () => {
  test('the committed boards match what the generator builds from the sources', () => {
    // A failure here means a source changed without the boards being rebuilt: run `bun run self:boards`.
    expect(staleBoards(built)).toEqual([])
  })

  test('the generator is deterministic', () => {
    expect(buildBoards()).toEqual(built)
  })

  for (const [file, html] of boards) {
    describe(file, () => {
      const { markup, script, preview } = parts(html)

      test('keeps the Design Component shell', () => {
        expect(html).toContain('<script src="./support.js"></script>')
        expect(markup.trimStart().startsWith('<helmet>')).toBe(true)
        expect(script).toContain('class Component extends DCLogic')
        expect(script).toContain('renderVals()')
        expect(script).not.toContain('innerHTML')
      })

      test('has a fixed root that matches its canvas entry', () => {
        const root = /<\/helmet>\s*<div style="([^"]*)"/.exec(markup)?.[1] ?? ''
        const height = Number(/height:\s*(\d+)px/.exec(root)?.[1])
        expect(root).toMatch(/width:\s*1440px/)
        expect(height).toBe(preview.height)
        expect(canvas.boards[file]?.h).toBe(height)
      })

      test('balances its tags', () => {
        const stack: string[] = []
        for (const tag of markup.replace(/<!--[\s\S]*?-->/g, '').match(/<\/?[a-zA-Z][\w-]*[^>]*>/g) ?? []) {
          const name = (/<\/?([a-zA-Z][\w-]*)/.exec(tag)?.[1] ?? '').toLowerCase()
          if (tag.endsWith('/>') || voids.has(name)) continue
          if (tag.startsWith('</')) expect(`${stack.pop()} closed by ${name}`).toBe(`${name} closed by ${name}`)
          else stack.push(name)
        }
        expect(stack).toEqual([])
      })

      test('uses dotted lookups only, and every hole resolves on first render', () => {
        const holes = [...markup.matchAll(/\{\{\s*([^}]*?)\s*\}\}/g)].map((m) => m[1] ?? '')
        expect(holes.filter((hole) => !/^[\w.]+$/.test(hole))).toEqual([])
        class DCLogic {
          state: Record<string, unknown> = {}
          readonly props: unknown
          constructor(props: unknown) {
            this.props = props
          }
          setState(next: Record<string, unknown>): void {
            this.state = { ...this.state, ...next }
          }
        }
        const Component = new Function('DCLogic', `${script}; return Component;`)(DCLogic)
        const values = new Component(preview).renderVals() as Record<string, unknown>
        const scopes = new Map<string, string>()
        for (const m of markup.matchAll(/<sc-for list="\{\{\s*([\w.]+)\s*\}\}" as="(\w+)"/g))
          scopes.set(m[2] ?? '', m[1] ?? '')
        const lookup = (path: string): unknown => {
          const [head = '', ...rest] = path.split('.')
          let base: unknown
          const list = scopes.get(head)
          if (list !== undefined) {
            const items = lookup(list)
            if (!Array.isArray(items)) return undefined
            if (items.length === 0) return null
            base = items[0]
          } else base = values[head]
          for (const key of rest) {
            if (base === null || base === undefined) return base
            base = (base as Record<string, unknown>)[key]
          }
          return base
        }
        expect([...new Set(holes)].filter((hole) => lookup(hole) === undefined)).toEqual([])
      })
    })
  }
})

describe('clearObservatoryRow', () => {
  const canvasWith = (obsY: number) => ({
    boards: {
      DsOverview: { x: 0, y: 0, h: 1000 },
      DsDecisions: { x: 0, y: 1200, h: 2000 },
      ObsShell: { x: 0, y: obsY, h: 900 },
      ObsMap: { x: 0, y: obsY + 1400, h: 900 }
    },
    notes: { dstitle: { y: -300 }, obstitle: { y: obsY - 300 } }
  })

  test('moves the whole Observatory row and its title down together when a Ds board grows into it', () => {
    const moved = clearObservatoryRow(canvasWith(3000))
    const line = 1200 + 2000 + observatoryGap
    expect(moved.boards.ObsShell.y).toBe(line)
    expect(moved.boards.ObsMap.y).toBe(line + 1400)
    expect(moved.notes.obstitle.y).toBe(line - 300)
    expect(moved.notes.dstitle.y).toBe(-300)
    expect(moved.boards.DsDecisions.y).toBe(1200)
  })

  test('leaves a row that is already clear exactly where it is', () => {
    expect(clearObservatoryRow(canvasWith(9000))).toEqual(canvasWith(9000))
  })

  test('the committed canvas keeps the Observatory row clear of every Ds board', () => {
    const all = JSON.parse(built.get('canvas.json') ?? '{}') as {
      boards: Record<string, { y: number; h: number }>
    }
    const entries = Object.entries(all.boards)
    const dsBottom = Math.max(...entries.filter(([f]) => f.startsWith('Ds')).map(([, b]) => b.y + b.h))
    const obsTop = Math.min(...entries.filter(([f]) => f.startsWith('Obs')).map(([, b]) => b.y))
    expect(obsTop).toBeGreaterThanOrEqual(dsBottom + observatoryGap)
  })
})
