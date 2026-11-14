/** A small, typed hyperscript: enough to build tables and controls without a framework. */

export type Child = Node | string | number | null | undefined | false | Child[]
type Attributes = Record<string, string | number | boolean | null | undefined | EventListener>

function append(parent: Node, child: Child): void {
  if (child === null || child === undefined || child === false) return
  if (Array.isArray(child)) {
    for (const c of child) append(parent, c)
    return
  }
  parent.appendChild(child instanceof Node ? child : document.createTextNode(String(child)))
}

function apply(element: Element, attributes: Attributes): void {
  for (const [name, value] of Object.entries(attributes)) {
    if (value === null || value === undefined || value === false) continue
    if (typeof value === 'function') element.addEventListener(name.replace(/^on/, ''), value)
    else element.setAttribute(name, value === true ? '' : String(value))
  }
}

export function h<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  attributes: Attributes = {},
  ...children: Child[]
): HTMLElementTagNameMap[K] {
  const element = document.createElement(tag)
  apply(element, attributes)
  append(element, children)
  return element
}

const SVG = 'http://www.w3.org/2000/svg'

export function s<K extends keyof SVGElementTagNameMap>(
  tag: K,
  attributes: Attributes = {},
  ...children: Child[]
): SVGElementTagNameMap[K] {
  const element = document.createElementNS(SVG, tag)
  apply(element, attributes)
  append(element, children)
  return element
}

export function replace(parent: Element, ...children: Child[]): void {
  parent.replaceChildren()
  append(parent, children)
}
