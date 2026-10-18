import json, os
B = '/tmp/claude-0/-home-claude/3349bd72-19ae-547f-b6f3-1cae99b66d64/scratchpad/'
SRC = B + 'review-src/'
man = json.load(open(SRC + 'packages/tiles/sets/modern/manifest.json'))

def f(n):
    return ('%.1f' % n).rstrip('0').rstrip('.')

TOP = [(0, -74), (128, -37), (128, 37), (0, 74), (-128, 37), (-128, -37)]

def hexcell(cx, cy, s, top='#a9b97c', plinth=('#8a7a62', '#73654f'), stroke='#1a2030', sw=1.2, strata=True):
    """Pointy-top dimetric hex: top face 256x148, plinth 48, scaled by s, centred on top-face centre."""
    P = lambda dx, dy: f(cx + dx * s) + ',' + f(cy + dy * s)
    out = ''
    # plinth: left front face and right front face
    out += f'<polygon points="{P(-128,37)} {P(0,74)} {P(0,122)} {P(-128,85)}" fill="{plinth[0]}" stroke="{stroke}" stroke-width="{sw}" stroke-linejoin="round"/>'
    out += f'<polygon points="{P(0,74)} {P(128,37)} {P(128,85)} {P(0,122)}" fill="{plinth[1]}" stroke="{stroke}" stroke-width="{sw}" stroke-linejoin="round"/>'
    if strata and s >= 0.3:
        for d in (16, 32):
            out += f'<polyline points="{P(-128,37+d)} {P(0,74+d)} {P(128,37+d)}" fill="none" stroke="{stroke}" stroke-opacity="0.25" stroke-width="{sw*0.8}"/>'
    pts = ' '.join(P(x, y) for x, y in TOP)
    out += f'<polygon points="{pts}" fill="{top}" stroke="{stroke}" stroke-width="{sw}" stroke-linejoin="round"/>'
    return out

def axial(q, r):
    return 256 * (q + r / 2), 111 * r

def group(cells, ox, oy, s, **kw):
    cells = sorted(cells, key=lambda c: (c[1], c[0]))  # back row to front
    out = ''
    for q, r in cells:
        x, y = axial(q, r)
        out += hexcell(ox + x * s, oy + y * s, s, **kw)
    return out

T = 'font-family="Inter, sans-serif"'
def lab(x, y, t, size=12, fill='#1a2030', anchor='middle', weight=500):
    return f'<text x="{f(x)}" y="{f(y)}" {T} font-size="{size}" font-weight="{weight}" fill="{fill}" text-anchor="{anchor}">{t}</text>'

def dim_h(x1, x2, y, t, fill='#9b2c1c'):
    return (f'<line x1="{f(x1)}" y1="{f(y)}" x2="{f(x2)}" y2="{f(y)}" stroke="{fill}" stroke-width="1"/>'
            f'<line x1="{f(x1)}" y1="{f(y-5)}" x2="{f(x1)}" y2="{f(y+5)}" stroke="{fill}" stroke-width="1"/>'
            f'<line x1="{f(x2)}" y1="{f(y-5)}" x2="{f(x2)}" y2="{f(y+5)}" stroke="{fill}" stroke-width="1"/>'
            + lab((x1 + x2) / 2, y - 6, t, 12, fill, weight=600))

def dim_v(x, y1, y2, t, fill='#9b2c1c', side='end'):
    tx = x - 8 if side == 'end' else x + 8
    return (f'<line x1="{f(x)}" y1="{f(y1)}" x2="{f(x)}" y2="{f(y2)}" stroke="{fill}" stroke-width="1"/>'
            f'<line x1="{f(x-5)}" y1="{f(y1)}" x2="{f(x+5)}" y2="{f(y1)}" stroke="{fill}" stroke-width="1"/>'
            f'<line x1="{f(x-5)}" y1="{f(y2)}" x2="{f(x+5)}" y2="{f(y2)}" stroke="{fill}" stroke-width="1"/>'
            + lab(tx, (y1 + y2) / 2 + 4, t, 12, fill, anchor=side, weight=600))

# ---------- Geometry SVG (800 x 712) ----------
g = ''
# A: one cell at 1x, top-left of top face box at (70,70)
cx, cy = 70 + 128, 80 + 74
g += lab(70, 34, 'One cell at 1×', 13, '#0f2440', 'start', 600)
g += f'<rect x="70" y="80" width="256" height="196" fill="none" stroke="#4a5568" stroke-dasharray="4 4" stroke-width="1"/>'
g += hexcell(cx, cy, 1.0, sw=1.5)
g += f'<circle cx="{cx}" cy="{cy}" r="4.5" fill="#c8963c" stroke="#1a2030" stroke-width="1"/>'
g += lab(cx, cy - 12, 'anchor (128, 74)', 11, '#1a2030')
g += dim_h(70, 326, 62, 'top face 256')
g += dim_v(52, 80, 228, '148', side='end')
# plinth dim: front point from y=cy+74=228 to 276
g += dim_v(344, 228, 276, 'plinth 48', side='start')
g += dim_v(400, 80, 276, 'cell 196', side='start')

# B: offset layout, right side
s = 0.36
ox, oy = 518, 118
g += lab(470, 34, 'Odd-r offset layout (shown at 0.36×)', 13, '#0f2440', 'start', 600)
for row in range(3):
    for col in range(3):
        x = col * 256 + (128 if row % 2 else 0)
        y = row * 111
        top = '#cfc79a' if row % 2 else '#a9b97c'
        g += hexcell(ox + x * s, oy + y * s, s, top=top, sw=1)
for row in range(3):
    for col in range(3):
        x = col * 256 + (128 if row % 2 else 0)
        g += f'<circle cx="{f(ox + x*s)}" cy="{f(oy + row*111*s)}" r="2.2" fill="#1a2030"/>'
g += dim_h(ox, ox + 256 * s, 72, 'step 256')
g += f'<line x1="{f(ox)}" y1="72" x2="{f(ox)}" y2="{oy}" stroke="#9b2c1c" stroke-width="0.8" stroke-dasharray="2 2"/>'
g += f'<line x1="{f(ox+256*s)}" y1="72" x2="{f(ox+256*s)}" y2="{oy}" stroke="#9b2c1c" stroke-width="0.8" stroke-dasharray="2 2"/>'
g += dim_v(462, oy, oy + 111 * s, 'row 111', side='end') if False else ''
g += f'<line x1="{f(ox)}" y1="{f(oy)}" x2="474" y2="{f(oy)}" stroke="#9b2c1c" stroke-width="0.8" stroke-dasharray="2 2"/>'
g += f'<line x1="{f(ox+128*s)}" y1="{f(oy+111*s)}" x2="474" y2="{f(oy+111*s)}" stroke="#9b2c1c" stroke-width="0.8" stroke-dasharray="2 2"/>'
g += (f'<line x1="474" y1="{f(oy)}" x2="474" y2="{f(oy+111*s)}" stroke="#9b2c1c" stroke-width="1"/>'
      + lab(468, oy + 111 * s / 2 + 4, 'row 111', 12, '#9b2c1c', 'end', 600))
yb = oy + 2 * 111 * s + 74 * s + 48 * s + 18
g += dim_h(ox, ox + 128 * s, yb, '')
g += f'<line x1="{f(ox+128*s)}" y1="{f(oy+111*s)}" x2="{f(ox+128*s)}" y2="{f(yb)}" stroke="#9b2c1c" stroke-width="0.8" stroke-dasharray="2 2"/>'
g += lab(ox + 64 * s + 30, yb + 18, 'odd rows +128', 12, '#9b2c1c', 'start', 600)
g += lab(470, 302, 'Dots are hex centres. Axial (q, r) for logic;', 11, '#4a5568', 'start', 400)
g += lab(470, 317, 'cube coordinates for distance and pathing.', 11, '#4a5568', 'start', 400)

# C: footprints
s = 0.45
base_y = 505
g += f'<line x1="40" y1="345" x2="760" y2="345" stroke="#d4c9b4" stroke-width="1"/>'
g += lab(40, 378, 'Footprints (shown at 0.45×)', 13, '#0f2440', 'start', 600)
fp = ''
fp += group([(0, 0)], 110, base_y, s)
fp += lab(110, base_y + 105, 'Single · 1 hex', 12, '#0f2440', weight=600)
fp += lab(110, base_y + 122, 'all terrain, most structures', 11, '#4a5568', weight=400)
fp += group([(0, 0), (1, 0)], 270, base_y, s)
fp += f'<line x1="270" y1="{base_y}" x2="{f(270+256*s)}" y2="{base_y}" stroke="#c8963c" stroke-width="2" stroke-dasharray="4 3"/>'
fp += f'<circle cx="270" cy="{base_y}" r="4" fill="#c8963c" stroke="#1a2030"/>'
fp += lab(270 + 128 * s, base_y + 105, 'Pair · 2 hexes, oriented 0–5', 12, '#0f2440', weight=600)
fp += lab(270 + 128 * s, base_y + 122, 'orientation = which neighbour', 11, '#4a5568', weight=400)
fl = [(0, -1), (1, -1), (-1, 0), (0, 0), (1, 0), (-1, 1), (0, 1)]
fp += group(fl, 622, base_y, s)
fp += f'<circle cx="622" cy="{base_y}" r="4" fill="#c8963c" stroke="#1a2030"/>'
fp += lab(622, base_y + 155, 'Flower · 7 hexes, centre + ring', 12, '#0f2440', weight=600)
fp += lab(622, base_y + 172, 'Citadel always; Port may be', 11, '#4a5568', weight=400)
g += fp
g += lab(40, 300, 'Light from the top-left, fixed. Taller structures', 11, '#4a5568', 'start', 400)
g += lab(40, 315, 'rise above the cell from the anchor.', 11, '#4a5568', 'start', 400)
g += lab(40, 702, 'Brass dot: the anchor hex. Painter’s order: back row to front, left to right.', 11, '#4a5568', 'start', 400)
GEO_SVG = f'<svg aria-hidden="true" width="800" height="712" viewBox="0 0 800 712" style="display:block">{g}</svg>'

# ---------- Building SVG (condition states) ----------
def P(pts, dx=40, dy=150):
    return ' '.join(f(x + dx) + ',' + f(y + dy) for x, y in pts)
b = ''
# plinth + top face, centre at (128,74) in cell coords -> translate
b += hexcell(128 + 40, 74 + 150, 1.0, sw=1.5)
INK = '#1a2030'
# building box
L = [(78, 74), (128, 99), (128, 29), (78, 4)]
R = [(128, 99), (178, 74), (178, 4), (128, 29)]
b += f'<polygon points="{P([(70,80),(128,110),(196,76),(140,50)])}" fill="#1a2030" opacity="0.12"/>'  # shadow bottom-right
b += f'<polygon points="{P(L)}" fill="#ece2c9" stroke="{INK}" stroke-width="1.25" stroke-linejoin="round"/>'
b += f'<polygon points="{P(R)}" fill="#cdbd98" stroke="{INK}" stroke-width="1.25" stroke-linejoin="round"/>'
# columns on left face
for t in (0.2, 0.4, 0.6, 0.8):
    x = 78 + 50 * t; y0 = 74 + 25 * t
    b += f'<line x1="{f(x+40)}" y1="{f(y0+150-4)}" x2="{f(x+40)}" y2="{f(y0-58+150)}" stroke="{INK}" stroke-opacity="0.35" stroke-width="1"/>'
# door on left face
b += f'<polygon points="{P([(98,84),(108,89),(108,71),(98,66)])}" fill="#5b4743" stroke="{INK}" stroke-width="1"/>'
# windows (base: unlit)
WIN = [[(140,72),(148,68),(148,56),(140,60)], [(158,63),(166,59),(166,47),(158,51)], [(140,47),(148,43),(148,31),(140,35)], [(158,38),(166,34),(166,22),(158,26)]]
WINL = [[(84,40),(91,43.5),(91,31.5),(84,28)], [(113,54.5),(120,58),(120,46),(113,42.5)]]
for w in WIN + WINL:
    b += f'<polygon points="{P(w)}" fill="#3a4050" stroke="{INK}" stroke-width="0.9"/>'
# roof (pyramid) + chimney
b += f'<polygon points="{P([(150,8),(158,4),(158,-18),(150,-14)])}" fill="#8c8577" stroke="{INK}" stroke-width="1.1"/>'
b += f'<polygon points="{P([(72,4),(128,32),(128,-44)])}" fill="#6d7a88" stroke="{INK}" stroke-width="1.25" stroke-linejoin="round"/>'
b += f'<polygon points="{P([(128,32),(184,4),(128,-44)])}" fill="#4f5b68" stroke="{INK}" stroke-width="1.25" stroke-linejoin="round"/>'
BASE_BLD = b

def layer(name, inner):
    return f'<g style="display:{{{{cond.{name}}}}}">{inner}</g>'
thr = ''
for w in WIN + WINL:
    thr += f'<polygon points="{P(w)}" fill="#c8963c" stroke="{INK}" stroke-width="0.9"/>'
thr += f'<path d="M{f(194)} {f(132)} c -6 -10 8 -16 2 -28 c -4 -8 6 -14 4 -24" fill="none" stroke="#8c8577" stroke-width="5" stroke-linecap="round" opacity="0.55"/>'
thr += f'<line x1="{f(168)}" y1="{f(106)}" x2="{f(168)}" y2="{f(80)}" stroke="{INK}" stroke-width="1.5"/>'
thr += f'<polygon points="{f(168)},{f(80)} {f(186)},{f(85)} {f(168)},{f(92)}" fill="#9b2c1c" stroke="{INK}" stroke-width="0.9"/>'
moss = ''
for (x, y, r) in [(90, 80, 7), (104, 87, 6), (150, 90, 7), (170, 80, 6), (82, 18, 5), (120, 30, 5)]:
    moss += f'<ellipse cx="{f(x+40)}" cy="{f(y+150)}" rx="{r}" ry="{r*0.6}" fill="#5f7d4c" opacity="0.85"/>'
cracks = f'<polyline points="{P([(150,30),(146,42),(152,50),(147,64)])}" fill="none" stroke="{INK}" stroke-width="1.3"/>'
cracks += f'<polyline points="{P([(86,50),(92,58),(88,66)])}" fill="none" stroke="{INK}" stroke-width="1.2"/>'
ivy = f'<path d="M{f(80+40)} {f(74+150)} q 6 -14 0 -26 q -5 -12 4 -26 q 5 -10 2 -20" fill="none" stroke="#2d5a3d" stroke-width="2.4" stroke-linecap="round"/>'
for (x, y) in [(84, 60), (80, 46), (86, 34), (84, 20), (122, 80), (118, 64)]:
    ivy += f'<ellipse cx="{f(x+40)}" cy="{f(y+150)}" rx="4" ry="2.6" fill="#2d5a3d"/>'
ivy += f'<path d="M{f(122+40)} {f(96+150)} q 4 -12 -2 -22 q -4 -8 2 -16" fill="none" stroke="#2d5a3d" stroke-width="2" stroke-linecap="round"/>'
fallen = f'<polygon points="{P([(128,32),(184,4),(160,-16),(140,6),(128,-6)])}" fill="#2b2f38" stroke="{INK}" stroke-width="1.25" stroke-linejoin="round"/>'
fallen += ''.join(f'<line x1="{f(x1+40)}" y1="{f(y1+150)}" x2="{f(x2+40)}" y2="{f(y2+150)}" stroke="#8a7a62" stroke-width="2"/>' for (x1, y1, x2, y2) in [(132, 26, 156, -8), (146, 19, 166, -4), (160, 12, 176, 2)])
fallen += ''.join(f'<polygon points="{P([(x,y),(x+9,y+3),(x+7,y+8),(x-2,y+6)])}" fill="#4f5b68" stroke="{INK}" stroke-width="1"/>' for (x, y) in [(186, 66), (198, 72), (176, 84), (192, 84)])
BLD = BASE_BLD + layer('thr', thr) + layer('moss', moss) + layer('cracks', cracks) + layer('ivy', ivy) + layer('fallen', fallen)
BLD_SVG = f'<svg aria-hidden="true" width="336" height="360" viewBox="0 0 336 360" style="display:block">{BLD}</svg>'

# ---------- manifest data ----------
tiles = []
for t in man['tiles']:
    fr = t.get('frames')
    tiles.append({'id': t['id'], 'k': t['kind'], 'fp': t['footprint'], 'o': t.get('orientation'),
                  'v': t.get('variants'), 'w': t['art']['width'], 'h': t['art']['height'],
                  'loop': fr['loop'] if fr else 1, 'st': len(t.get('states') or []), 'status': t.get('status')})
DATA = json.dumps({'tiles': tiles, 'conditions': man['conditions']}, separators=(',', ':'))

html = open(B + 'tiles_tpl.html').read()
html = html.replace('<!--GEO-->', GEO_SVG).replace('<!--BLD-->', BLD_SVG).replace('/*DATA*/', DATA)
out = B + 'design/project/DsTiles.dc.html'
open(out, 'w').write(html)
print(out, os.path.getsize(out))
