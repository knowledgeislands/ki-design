"""Rebuild the dressed review fragment from preserved inputs.

Inputs are read, never altered:
- ../2026-10-20-pilot-dressing/props-sheet.png and the four grass-*.png materials;
- ../2026-10-20-painted-terrain-pilot/originals/hall.png and stone.png, from the first pilot.

Run from anywhere with Python 3, Pillow and Bun on the path.
"""
from pathlib import Path
from PIL import Image, ImageFilter
import base64, collections, io, json, subprocess

HERE = Path(__file__).resolve().parent
REPO = HERE.parents[2]
DRESSING = HERE.parent / '2026-10-20-pilot-dressing'
ORIGINALS = HERE.parent / '2026-10-20-painted-terrain-pilot' / 'originals'

# Sheet order, row by row, as the dressing NOTES.md records it.
SHEET_ROWS = [
    ['shrub'] * 6,
    ['cypress'] * 4 + ['olive'] * 2,
    ['olive'] + ['rock'] * 4 + ['flowers'],
    ['flowers'] * 3 + ['grass'] * 2 + ['stump'],
]
# World pixels per sheet pixel. The hex top face is 256 world pixels wide.
SCALE = {'shrub': .3, 'cypress': .36, 'olive': .42, 'rock': .34, 'flowers': .27, 'grass': .25, 'stump': .25}
MATERIALS = ['grass-meadow', 'grass-stony-turf', 'grass-worn', 'grass-lush-hollows']
INTERIOR = .76  # keep the inner 76 %: each material's outer band is a plain frame


def data_uri(im: Image.Image, quality=86) -> str:
    buf = io.BytesIO()
    im.save(buf, format='WEBP', quality=quality, method=6)
    return 'data:image/webp;base64,' + base64.b64encode(buf.getvalue()).decode()


def components(alpha: Image.Image):
    """Bounding boxes of the sheet's separate props, merged over small gaps."""
    mask = alpha.point(lambda v: 255 if v > 40 else 0).filter(ImageFilter.MaxFilter(9))
    w, h = mask.size
    px = mask.load()
    seen = bytearray(w * h)
    boxes = []
    for y in range(0, h, 3):
        for x in range(0, w, 3):
            if px[x, y] and not seen[y * w + x]:
                queue = collections.deque([(x, y)])
                seen[y * w + x] = 1
                x0 = x1 = x
                y0 = y1 = y
                count = 0
                while queue:
                    cx, cy = queue.popleft()
                    count += 1
                    x0, x1, y0, y1 = min(x0, cx), max(x1, cx), min(y0, cy), max(y1, cy)
                    for nx, ny in ((cx + 1, cy), (cx - 1, cy), (cx, cy + 1), (cx, cy - 1)):
                        if 0 <= nx < w and 0 <= ny < h and px[nx, ny] and not seen[ny * w + nx]:
                            seen[ny * w + nx] = 1
                            queue.append((nx, ny))
                if count > 400:
                    boxes.append((x0, y0, x1 + 1, y1 + 1))
    return boxes


def props():
    sheet = Image.open(DRESSING / 'props-sheet.png').convert('RGBA')
    alpha = sheet.getchannel('A')
    boxes = components(alpha)
    assert len(boxes) == 24, len(boxes)
    centres = sorted({round(((b[1] + b[3]) / 2) / sheet.height * 4 - .5) for b in boxes})
    assert len(centres) == 4, centres
    rows = [sorted([b for b in boxes if round(((b[1] + b[3]) / 2) / sheet.height * 4 - .5) == r]) for r in centres]
    out = []
    for kinds, row in zip(SHEET_ROWS, rows):
        assert len(kinds) == len(row), (kinds, row)
        for kind, box in zip(kinds, row):
            sprite = sheet.crop(box)
            # Firm the generator's near-opaque alpha (max 254) and drop faint fringes.
            a = sprite.getchannel('A').point(lambda v: 0 if v < 24 else min(255, round((v - 24) * 255 / 200)))
            sprite.putalpha(a)
            sprite = sprite.crop(a.getbbox())
            s = SCALE[kind] * 2  # authored at 2x the world size, for sharp display
            sprite = sprite.resize((max(1, round(sprite.width * s)), max(1, round(sprite.height * s))), Image.Resampling.LANCZOS)
            out.append({'kind': kind, 'w': sprite.width / 2, 'h': sprite.height / 2, 'src': data_uri(sprite, 88)})
    return out


def materials():
    out = []
    for name in MATERIALS:
        im = Image.open(DRESSING / f'{name}.png').convert('RGB')
        m = round(im.width * (1 - INTERIOR) / 2)
        im = im.crop((m, m, im.width - m, im.height - m)).resize((512, 512), Image.Resampling.LANCZOS)
        out.append(data_uri(im))
    return out


def main():
    images = {'materials': materials(), 'props': props()}
    with Image.open(ORIGINALS / 'stone.png') as im:
        im = im.convert('RGB')
        im.thumbnail((384, 384), Image.Resampling.LANCZOS)
        images['stone'] = data_uri(im)
    with Image.open(ORIGINALS / 'hall.png') as im:
        im = im.convert('RGBA')
        im = im.crop(im.getchannel('A').point(lambda x: 255 if x >= 16 else 0).getbbox())
        im.thumbnail((720, 720), Image.Resampling.LANCZOS)
        images['hall'] = data_uri(im)
    (HERE / 'assets').mkdir(exist_ok=True)
    subprocess.run(['bun', 'build', str(HERE / 'viewer.js'), '--target=browser', '--format=iife',
                    '--minify', '--outfile', str(HERE / 'assets' / 'viewer.bundle.js')], cwd=REPO, check=True)
    fragment = (HERE / 'pilot.html').read_text()
    fragment = fragment.replace('__PILOT_ASSETS__', json.dumps(images, separators=(',', ':')))
    fragment = fragment.replace('__PILOT_BUNDLE__', (HERE / 'assets' / 'viewer.bundle.js').read_text())
    assert '__PILOT_' not in fragment
    page = '<!doctype html>\n<html lang="en-GB"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Dressed terrain pilot</title><style>:root{--foreground:#f5efe0;color-scheme:dark}body{margin:0;padding:16px;background:#0f2440;color:#f5efe0;font-family:Inter,system-ui,sans-serif}select,button{font:inherit}</style></head><body>\n' + fragment + '\n</body></html>\n'
    (HERE / 'dressed-terrain-pilot.html').write_text(page)
    print('Page:', len(page.encode()), 'bytes')


if __name__ == '__main__':
    main()
