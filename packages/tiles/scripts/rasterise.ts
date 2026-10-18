/**
 * Renders an SVG string to PNG with Playwright's Chromium, for review images. Playwright is not a dependency of
 * this package: it is imported on demand, and `KI_CHROMIUM` may point at a Chromium binary.
 */
import { existsSync, writeFileSync } from 'node:fs'

interface Chromium {
  launch(options: { executablePath?: string }): Promise<{
    newPage(options: { viewport: { width: number; height: number }; deviceScaleFactor: number }): Promise<{
      setContent(html: string): Promise<void>
      screenshot(options: { omitBackground: boolean; fullPage: boolean }): Promise<Uint8Array>
    }>
    close(): Promise<void>
  }>
}

export async function rasterise(svg: string, out: string, scale = 1, background = 'transparent'): Promise<void> {
  const match = /<svg[^>]*\swidth="([\d.]+)"[^>]*\sheight="([\d.]+)"/.exec(svg)
  if (!match) throw new Error('SVG needs numeric width and height')
  const width = Math.ceil(Number(match[1]))
  const height = Math.ceil(Number(match[2]))
  const name = 'playwright'
  const { chromium } = (await import(name)) as { chromium: Chromium }
  const fallback = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome'
  const executablePath = process.env['KI_CHROMIUM'] ?? (existsSync(fallback) ? fallback : undefined)
  const browser = await chromium.launch(executablePath ? { executablePath } : {})
  try {
    const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: scale })
    await page.setContent(
      `<!doctype html><html><head><style>html,body{margin:0;background:${background}}svg{display:block}</style></head><body>${svg}</body></html>`
    )
    const png = await page.screenshot({ omitBackground: background === 'transparent', fullPage: false })
    writeFileSync(out, png)
  } finally {
    await browser.close()
  }
}
