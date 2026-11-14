# tessera

Web components that both the site and the apps render with, built on [Lit](https://lit.dev/) 3. Importing the package registers them.

## `<tessera-glyph>`

```html
<tessera-glyph name="lighthouse" size="20"></tessera-glyph>
<tessera-glyph name="port" label="Port"></tessera-glyph>
```

Renders a glyph from `tessera-icons` inline, in `currentColor`. Without `label` it is decorative (`aria-hidden="true"`); with one it is exposed as an image with that name. Unknown names render nothing.

## `<tessera-hexmap>`

```html
<tessera-hexmap id="map"></tessera-hexmap>
<script type="module">
  import 'tessera'
  const map = document.querySelector('#map')
  map.map = islandMap // an islandmap/v1 object
  map.addEventListener('tessera-select', (event) => console.log(event.detail)) // { q, r, structure }
</script>
```

- Give it a map through the `.map` property, or as inline `islandmap/v1` JSON in the `src` attribute. `src` is never fetched: the components make no network calls. Invalid input renders an alert describing every problem.
- `size` sets the hex radius in user units (default 32); `.selected` rings a hex; `theme="night"` draws the night chart.
- Structures are drawn with the line glyphs from `tessera-icons` by default (`iconGlyph`); set `.glyph` to another resolver `(id) => innerSvg | undefined`.
- The map is a listbox of hexes with a roving tabindex: one hex is in the tab order, the arrow keys move along axial neighbours (left and right along the row; up and down to the diagonal that keeps the visual column), and Enter, Space or a click selects. Selecting fires `tessera-select` (bubbles, composed) with `{ q, r, structure }`.
- The chart is `renderFlatLayers` from `tessera-hexmap`, so it matches `renderFlatSvg` exactly; the interactive hexes lie transparent over it.

## Styling

Styles are token-driven: `var(--paper)`, `var(--ink)` and `var(--accent)` from `tessera-tokens`, each with a fallback. The chart's own colours come from the token values through `theme`. Each component resets its own box sizing. The stylesheets are exported as strings, `tesseraGlyphStyles` and `tesseraHexmapStyles`, for consumers' density and contrast tests.

## Tests

`bun test` runs the components in happy-dom (preloaded by `bunfig.toml`).
