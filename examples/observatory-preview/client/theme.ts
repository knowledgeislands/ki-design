/**
 * Theme: the shell follows the OS (`prefers-color-scheme`) unless the viewer chose; the choice is
 * `data-theme` on the root, which `@knowledgeislands/tokens`' CSS keys on.
 */

export type Theme = 'night' | 'light'

const darkQuery = (): MediaQueryList | null =>
  typeof matchMedia === 'function' ? matchMedia('(prefers-color-scheme: dark)') : null

export function effectiveTheme(): Theme {
  const chosen = document.documentElement.dataset['theme']
  if (chosen === 'night' || chosen === 'light') return chosen
  return darkQuery()?.matches ? 'night' : 'light'
}

export function applyTheme(theme: Theme | null): void {
  if (theme) document.documentElement.dataset['theme'] = theme
  else delete document.documentElement.dataset['theme']
}

/** Calls `listener` when the OS theme changes; returns an unsubscribe. */
export function onSystemTheme(listener: () => void): () => void {
  const query = darkQuery()
  query?.addEventListener('change', listener)
  return () => query?.removeEventListener('change', listener)
}
