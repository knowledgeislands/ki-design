import json, re, os
B = '/tmp/claude-0/-home-claude/3349bd72-19ae-547f-b6f3-1cae99b66d64/scratchpad/'
SRC = B + 'review-src/'
icons = json.load(open(SRC + 'icons.json'))
design = open(SRC + 'DESIGN.md').read()
sec = design.split('### 8.2')[1].split('## 9.')[0]

# groups and draw briefs from 8.2 tables
groups = {}
draw = {}
cur = None
gmap = {'Symbols': 'Symbols', 'Places within an island': 'Places', 'Port modes': 'Port modes',
        'Instruments and app concepts': 'Instruments', 'Steward roles': 'Roles', 'UI basics': 'UI basics'}
for line in sec.splitlines():
    m = re.match(r'^\*\*(.+?)\*\*', line)
    if m and m.group(1) in gmap:
        cur = gmap[m.group(1)]
        continue
    m = re.match(r'^\| `([a-z-]+)` \| (.+?) \|$', line)
    if m and cur:
        i = m.group(1)
        if i == 'celestial':
            i = 'celestial-guide'
        groups[i] = cur
        draw[i] = m.group(2).replace('`', '')
values = {
    'value-trust': 'Security and reliability: shield with an eight-point star',
    'value-community': 'People and collaboration: three heads-and-shoulders outlines, no faces',
    'value-growth': 'Emergence and evolution: seedling, two leaves',
    'value-exploration': 'Discovery and curiosity: compass inside a circle',
    'value-creation': 'Ideas and expression: pen nib',
    'value-sustainability': 'Balance and regeneration: single leaf with a vein',
}
for k, v in values.items():
    groups[k] = 'Values'
    draw[k] = v
for k in icons:
    if k not in groups:
        groups[k] = 'Not in §8.2'
        draw[k] = 'In icons.json but not in the §8.2 inventory.'

# meanings from symbols.ts
ts = open(SRC + 'packages/symbols/src/symbols.ts').read()
blocks = re.findall(r'\{\s*\n(.*?)\n\s*\}', ts, re.S)
syms = []
for b in blocks:
    def f(k):
        m = re.search(r"\b" + k + r": ['\"](.+?)['\"],?\n", b + '\n')
        return m.group(1) if m else None
    if f('icon'):
        syms.append({'icon': f('icon'), 'name': f('name'), 'meaning': f('meaning'), 'status': f('status'), 'notes': f('notes')})

proposed_82 = {'mill', 'workshop', 'commons'}
data = {}
for k, svg in icons.items():
    svg = re.sub(r'\s+', ' ', svg).replace('> <', '><').strip()
    ms = [s for s in syms if s['icon'] == k]
    if ms:
        st = ms[0]['status']
    elif groups[k] == 'Roles' or k in proposed_82:
        st = 'proposed'
    elif groups[k] == 'Values':
        st = 'official'
    elif groups[k] == 'Not in §8.2':
        st = 'open'
    else:
        st = 'agreed'
    if groups[k] == 'Roles' or k in proposed_82:
        st = 'proposed'
    if k in ('citadel', 'tower'):
        st = 'retired'
    scope = 'App' if groups[k] == 'Instruments' else 'Both'
    mean = [{'n': s['name'], 'm': s['meaning'], 'st': s['status'], 'note': s['notes'] or ''} for s in ms]
    if groups[k] == 'Values':
        mean = [{'n': 'Value', 'm': values[k].split(':')[0] + '.', 'st': 'official', 'note': 'Official meaning from the Symbol Library sheet.'}]
    if k in ('citadel', 'tower'):
        mean = [{'n': 'Retired', 'm': 'Mapped to no symbol.', 'st': 'retired', 'note': 'GDR-KI-PRINCIPAL-011 retired the Citadel and dropped the Tower; the glyph stays in the package. The Capital has no glyph yet; the app\'s mark is the Observatory.'}]
    data[k] = {'g': groups[k], 'd': draw[k], 'st': st, 'sc': scope, 'mean': mean, 'svg': svg}

order = ['Symbols', 'Places', 'Port modes', 'Instruments', 'Roles', 'UI basics', 'Values', 'Not in §8.2']
names = sorted(icons, key=lambda k: (order.index(groups[k]), k))
data = {k: data[k] for k in names}
counts = {g: sum(1 for k in names if groups[k] == g) for g in order}
print(counts, sum(counts.values()))
DATA = json.dumps(data, ensure_ascii=False, separators=(',', ':')).replace('</', '<\\/')

# 24-unit grid behind the large render: 144 px, 6 px per unit
gl = ''.join(f'<line x1="{i*6}" y1="0" x2="{i*6}" y2="144"/><line x1="0" y1="{i*6}" x2="144" y2="{i*6}"/>' for i in range(1, 24))

html = open(B + 'icons_tpl.html').read().replace('/*DATA*/', DATA).replace('<!--GRID-->', gl)
out = B + 'design/project/DsIcons.dc.html'
open(out, 'w').write(html)
print(out, os.path.getsize(out))
