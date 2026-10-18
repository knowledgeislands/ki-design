/**
 * A dependency-free linter for Knowledge Islands line glyphs. It checks well-formedness, the required root
 * attributes, the element allow-list and that all geometry stays inside the 2 px safe margin.
 */

/** Root attributes every glyph must carry, exactly. */
export const requiredRootAttributes = {
  xmlns: 'http://www.w3.org/2000/svg',
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  'stroke-width': '1.5',
  'stroke-linecap': 'round',
  'stroke-linejoin': 'round'
} as const

/** The live area: geometry must stay within [2, 22] on both axes. */
export const safeArea = { min: 2, max: 22 } as const

const allowedElements = new Set([
  'svg',
  'g',
  'path',
  'circle',
  'ellipse',
  'line',
  'polyline',
  'polygon',
  'rect',
  'title'
])
const allowedChildAttributes = new Set([
  'd',
  'cx',
  'cy',
  'r',
  'rx',
  'ry',
  'x',
  'y',
  'x1',
  'y1',
  'x2',
  'y2',
  'width',
  'height',
  'points',
  'stroke-dasharray'
])

export interface SvgElement {
  readonly name: string
  readonly attributes: Readonly<Record<string, string>>
}

export interface Bounds {
  minX: number
  minY: number
  maxX: number
  maxY: number
}

const TAG = /<(\/?)([a-zA-Z][\w-]*)((?:\s+[\w:-]+="[^"]*")*)\s*(\/?)>/g
const ATTRIBUTE = /([\w:-]+)="([^"]*)"/g

/** Tokenises an SVG string into elements, throwing if it is not well-formed. */
export function parseSvg(source: string): SvgElement[] {
  const elements: SvgElement[] = []
  const stack: string[] = []
  let cursor = 0
  for (const match of source.matchAll(TAG)) {
    const [whole, closing, name = '', attributeText = '', selfClosing] = match
    const between = source.slice(cursor, match.index)
    if (between.trim() !== '' && stack.at(-1) !== 'title')
      throw new SyntaxError(`Unexpected text ${JSON.stringify(between.trim())}`)
    cursor = match.index + whole.length
    if (closing) {
      const open = stack.pop()
      if (open !== name) throw new SyntaxError(`Mismatched </${name}>, expected </${open ?? 'nothing'}>`)
      continue
    }
    const attributes: Record<string, string> = {}
    for (const [, key = '', value = ''] of attributeText.matchAll(ATTRIBUTE)) {
      if (key in attributes) throw new SyntaxError(`Duplicate attribute ${key} on <${name}>`)
      attributes[key] = value
    }
    elements.push({ name, attributes })
    if (!selfClosing) stack.push(name)
  }
  if (source.slice(cursor).trim() !== '') throw new SyntaxError('Unexpected trailing content')
  if (stack.length > 0) throw new SyntaxError(`Unclosed <${stack.join('>, <')}>`)
  return elements
}

const numbers = (text: string): number[] => (text.match(/-?(?:\d+\.?\d*|\.\d+)(?:e[-+]?\d+)?/gi) ?? []).map(Number)

/**
 * Bounds of a path's points and control points. Béziers lie inside their control hull, so this is a conservative
 * box. Arcs are rejected: draw circles and ellipses as elements instead.
 */
export function pathBounds(d: string): Bounds {
  const tokens = d.match(/[a-zA-Z]|-?(?:\d+\.?\d*|\.\d+)(?:e[-+]?\d+)?/g) ?? []
  const box: Bounds = { minX: Infinity, minY: Infinity, maxX: -Infinity, maxY: -Infinity }
  const add = (x: number, y: number) => {
    box.minX = Math.min(box.minX, x)
    box.minY = Math.min(box.minY, y)
    box.maxX = Math.max(box.maxX, x)
    box.maxY = Math.max(box.maxY, y)
  }
  let x = 0
  let y = 0
  let startX = 0
  let startY = 0
  let lastControl: [number, number] | undefined
  let command = ''
  let i = 0
  const next = (): number => {
    const token = tokens[i++]
    const value = Number(token)
    if (token === undefined || Number.isNaN(value)) throw new SyntaxError(`Malformed path data: ${d}`)
    return value
  }
  while (i < tokens.length) {
    const token = tokens[i] ?? ''
    if (/[a-zA-Z]/.test(token)) {
      command = token
      i++
    }
    const relative = command === command.toLowerCase()
    const ox = relative ? x : 0
    const oy = relative ? y : 0
    switch (command.toUpperCase()) {
      case 'M':
      case 'L':
      case 'T': {
        const px = ox + next()
        const py = oy + next()
        if (command.toUpperCase() === 'T') {
          const [cx, cy] = lastControl ? [2 * x - lastControl[0], 2 * y - lastControl[1]] : [x, y]
          add(cx, cy)
          lastControl = [cx, cy]
        } else lastControl = undefined
        x = px
        y = py
        add(x, y)
        if (command.toUpperCase() === 'M') {
          startX = x
          startY = y
          command = relative ? 'l' : 'L'
        }
        break
      }
      case 'H':
        x = ox + next()
        add(x, y)
        lastControl = undefined
        break
      case 'V':
        y = oy + next()
        add(x, y)
        lastControl = undefined
        break
      case 'C': {
        add(ox + next(), oy + next())
        const c2: [number, number] = [ox + next(), oy + next()]
        add(...c2)
        x = ox + next()
        y = oy + next()
        add(x, y)
        lastControl = c2
        break
      }
      case 'S': {
        if (lastControl) add(2 * x - lastControl[0], 2 * y - lastControl[1])
        const c2: [number, number] = [ox + next(), oy + next()]
        add(...c2)
        x = ox + next()
        y = oy + next()
        add(x, y)
        lastControl = c2
        break
      }
      case 'Q': {
        const c: [number, number] = [ox + next(), oy + next()]
        add(...c)
        x = ox + next()
        y = oy + next()
        add(x, y)
        lastControl = c
        break
      }
      case 'Z':
        x = startX
        y = startY
        lastControl = undefined
        break
      case 'A':
        throw new SyntaxError('Arc commands are not allowed in glyphs; use <circle> or <ellipse>')
      default:
        throw new SyntaxError(`Unknown path command ${JSON.stringify(command)}`)
    }
  }
  return box
}

const num = (attributes: Readonly<Record<string, string>>, key: string): number => Number(attributes[key] ?? 0)

/** Bounds of one drawable element, or undefined for structural elements. */
export function elementBounds({ name, attributes: a }: SvgElement): Bounds | undefined {
  switch (name) {
    case 'path':
      return pathBounds(a['d'] ?? '')
    case 'circle': {
      const r = num(a, 'r')
      return { minX: num(a, 'cx') - r, minY: num(a, 'cy') - r, maxX: num(a, 'cx') + r, maxY: num(a, 'cy') + r }
    }
    case 'ellipse': {
      const rx = num(a, 'rx')
      const ry = num(a, 'ry')
      return { minX: num(a, 'cx') - rx, minY: num(a, 'cy') - ry, maxX: num(a, 'cx') + rx, maxY: num(a, 'cy') + ry }
    }
    case 'rect':
      return {
        minX: num(a, 'x'),
        minY: num(a, 'y'),
        maxX: num(a, 'x') + num(a, 'width'),
        maxY: num(a, 'y') + num(a, 'height')
      }
    case 'line':
      return {
        minX: Math.min(num(a, 'x1'), num(a, 'x2')),
        minY: Math.min(num(a, 'y1'), num(a, 'y2')),
        maxX: Math.max(num(a, 'x1'), num(a, 'x2')),
        maxY: Math.max(num(a, 'y1'), num(a, 'y2'))
      }
    case 'polyline':
    case 'polygon': {
      const values = numbers(a['points'] ?? '')
      const xs = values.filter((_, index) => index % 2 === 0)
      const ys = values.filter((_, index) => index % 2 === 1)
      return { minX: Math.min(...xs), minY: Math.min(...ys), maxX: Math.max(...xs), maxY: Math.max(...ys) }
    }
    default:
      return undefined
  }
}

/** Lints one glyph source. An empty array means it passes. */
export function lintIcon(source: string): string[] {
  let elements: SvgElement[]
  try {
    elements = parseSvg(source)
  } catch (error) {
    return [`not well-formed: ${(error as Error).message}`]
  }
  const problems: string[] = []
  const [root, ...children] = elements
  if (root?.name !== 'svg') return ['root element must be <svg>']
  for (const [key, value] of Object.entries(requiredRootAttributes)) {
    if (root.attributes[key] !== value)
      problems.push(`root ${key} must be "${value}", got "${root.attributes[key] ?? ''}"`)
  }
  if (children.length === 0) problems.push('glyph has no drawing')
  for (const element of children) {
    if (!allowedElements.has(element.name) || element.name === 'svg') {
      problems.push(`<${element.name}> is not allowed`)
      continue
    }
    for (const key of Object.keys(element.attributes)) {
      if (!allowedChildAttributes.has(key)) problems.push(`<${element.name}> may not set ${key}`)
    }
    try {
      const box = elementBounds(element)
      if (
        box &&
        (box.minX < safeArea.min || box.minY < safeArea.min || box.maxX > safeArea.max || box.maxY > safeArea.max)
      ) {
        problems.push(`<${element.name}> leaves the safe area: [${box.minX}, ${box.minY}] – [${box.maxX}, ${box.maxY}]`)
      }
    } catch (error) {
      problems.push((error as Error).message)
    }
  }
  return problems
}
