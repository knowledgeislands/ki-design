import json, sys, urllib.parse
sys.path.insert(0, '/tmp/claude-0/-home-claude/3349bd72-19ae-547f-b6f3-1cae99b66d64/scratchpad/gen')
from meaning_data import S, CATS

BASE = '/tmp/claude-0/-home-claude/3349bd72-19ae-547f-b6f3-1cae99b66d64/scratchpad/'
icons = json.load(open(BASE + 'review-src/icons.json'))
NAVY = '#0f2440'

def uri(svg):
    svg = ' '.join(svg.split())
    return 'data:image/svg+xml;utf8,' + urllib.parse.quote(svg, safe='')

HEX = 'M12 2.5 L20.2 7.25 V16.75 L12 21.5 L3.8 16.75 V7.25 Z'
def placeholder():
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#8b94a3" stroke-width="1.2" stroke-dasharray="2 2"><path d="{HEX}"/></svg>'
def cond(kind):
    house = '<path d="M8 17 V12 L12 9 L16 12 V17 Z" fill="#fffaf0" stroke="#0f2440" stroke-width="1.3" stroke-linejoin="round"/>'
    extra = {
        'thriving': '<rect x="11" y="13" width="2" height="2.4" fill="#c8963c"/><path d="M14.5 9.5 C14 8 15.5 7.2 15 5.6" stroke="#4a5568" stroke-width="1" fill="none" stroke-linecap="round"/>',
        'quiet': '<rect x="11" y="13" width="2" height="2.4" fill="#d4c9b4"/>',
        'weathered': '<path d="M9.5 12.5 L10.5 14 L9.8 15.5" stroke="#9b2c1c" stroke-width="0.9" fill="none"/><circle cx="15" cy="16" r="1" fill="#2d5a3d"/><circle cx="16" cy="14.8" r="0.8" fill="#2d5a3d"/><circle cx="8.6" cy="16.2" r="0.8" fill="#2d5a3d"/>',
    }[kind]
    fill = {'thriving': '#dfe9e1', 'quiet': '#e3e8ef', 'weathered': '#f1e8d3'}[kind]
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="{HEX}" fill="{fill}" stroke="#0f2440" stroke-width="1"/>{house}{extra}</svg>'

out = []
for s in S:
    ic = s['icon']
    has = True
    if ic.startswith('@'):
        svg = cond(ic[1:])
    elif ic and ic in icons:
        svg = icons[ic].replace('currentColor', NAVY)
    else:
        svg = placeholder(); has = False
    d = {k: (v.replace('&lt;', '<').replace('&gt;', '>').replace('<handle>', '(handle)') if isinstance(v, str) else v) for k, v in s.items()}
    d['not'] = d.pop('not_')
    d['src'] = uri(svg)
    d['glyph'] = (ic if (ic and not ic.startswith('@') and ic in icons) else ('condition decal' if ic.startswith('@') else 'none yet'))
    out.append(d)

DATA = json.dumps(out, ensure_ascii=False)
CATJ = json.dumps(CATS, ensure_ascii=False)
assert '</' not in DATA

html = r'''<!doctype html>
<html lang="en-GB">
<head>
<meta charset="utf-8">
<title>Meaning — the symbol library</title>
<script src="./support.js"></script>
</head>
<body>
<x-dc>
<helmet>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600&amp;family=Cormorant+SC:wght@500;600&amp;family=Inter:wght@400;500;600&amp;display=swap" rel="stylesheet">
<style>body{margin:0}
.dm-lbl{font-size:10.5px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:#4a5568;margin-bottom:3px}
.dm-txt{font-size:13px;line-height:1.45;color:#1a2030}
.dm-mean{flex:none;max-height:30px;font-size:11.5px;line-height:15px;color:#4a5568;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.dm-chip{display:inline-block;font-size:10.5px;font-weight:600;line-height:1;padding:3px 6px;border-radius:4px;white-space:nowrap}
.dm-scope{display:inline-block;font-size:10.5px;font-weight:500;line-height:1;padding:2px 6px;border-radius:4px;border:1px solid #a7adb8;color:#4a5568;white-space:nowrap}
</style>
</helmet>
<div style="width:1440px;height:1100px;box-sizing:border-box;padding:48px 64px 40px;background:#f5efe0;color:#1a2030;font-family:Inter,system-ui,sans-serif;display:flex;flex-direction:column;gap:16px">

  <div style="display:flex;justify-content:space-between;align-items:flex-end;gap:24px">
    <div style="display:flex;flex-direction:column;gap:4px">
      <div style="font-family:'Cormorant SC',serif;font-size:16px;font-weight:600;letter-spacing:0.14em;color:#8a5a12">Design system · 2 of 8</div>
      <div style="font-family:'Cormorant Garamond',serif;font-size:48px;font-weight:600;line-height:1.05;color:#0f2440">Meaning — the symbol library</div>
      <div style="font-size:15px;color:#4a5568">Every mark that carries meaning, once. No card, no drawing. Click a card to read it.</div>
    </div>
    <div style="display:flex;flex-direction:column;align-items:flex-end;gap:8px">
      <div style="display:flex;gap:6px;align-items:center">
        <span style="font-size:11px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:#4a5568;margin-right:4px">Status</span>
        <sc-for list="{{stats}}" as="c" hint-placeholder-count="4">
          <button type="button" aria-pressed="{{c.pressed}}" onClick="{{ c.pick }}" style="{{c.style}}">{{c.label}} {{c.count}}</button>
        </sc-for>
      </div>
      <div style="font-size:12px;color:#4a5568">{{shown}}</div>
    </div>
  </div>

  <div style="display:flex;gap:6px;align-items:center;flex-wrap:wrap">
    <span style="font-size:11px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:#4a5568;margin-right:4px">Group</span>
    <sc-for list="{{cats}}" as="c" hint-placeholder-count="10">
      <button type="button" aria-pressed="{{c.pressed}}" onClick="{{ c.pick }}" style="{{c.style}}">{{c.label}} {{c.count}}</button>
    </sc-for>
    <span style="font-size:12px;color:#8a5a12;margin-left:10px">Brass edge = a meaning Kit must agree.</span>
  </div>

  <div style="display:flex;gap:24px;flex:1;min-height:0">
    <div style="flex:1;min-width:0;display:grid;grid-template-columns:repeat(6,minmax(0,1fr));grid-auto-rows:90px;gap:6px;align-content:start">
      <sc-for list="{{cards}}" as="k" hint-placeholder-count="54">
        <button type="button" aria-label="{{k.aria}}" aria-pressed="{{k.pressed}}" onClick="{{ k.pick }}" style="{{k.style}}">
          <span style="display:flex;align-items:center;gap:7px;min-width:0;flex:none">
            <img src="{{k.src}}" alt="" width="20" height="20" style="flex:none;display:block">
            <span style="font-size:13px;font-weight:600;color:#0f2440;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">{{k.name}}</span>
          </span>
          <span class="dm-mean">{{k.meaning}}</span>
          <span style="display:flex;gap:4px;align-items:center;flex:none">
            <span class="dm-chip" style="{{k.chip}}">{{k.statusLabel}}</span>
            <span class="dm-scope">{{k.scope}}</span>
          </span>
        </button>
      </sc-for>
    </div>

    <div style="width:372px;flex:none;background:#fffaf0;border:1px solid #d4c9b4;border-radius:8px;border-top:3px solid #0f2440;padding:18px 20px;box-sizing:border-box;display:flex;flex-direction:column;gap:12px;overflow:hidden">
      <div style="display:flex;gap:14px;align-items:center">
        <div style="width:60px;height:60px;flex:none;border:1px solid #d4c9b4;border-radius:8px;background:#f5efe0;display:flex;align-items:center;justify-content:center">
          <img src="{{d.src}}" alt="" width="40" height="40" style="display:block">
        </div>
        <div style="display:flex;flex-direction:column;gap:6px;min-width:0">
          <div style="font-family:'Cormorant Garamond',serif;font-size:30px;font-weight:600;line-height:1.05;color:#0f2440">{{d.name}}</div>
          <div style="display:flex;gap:5px;flex-wrap:wrap;align-items:center">
            <span class="dm-chip" style="{{d.chip}}">{{d.statusLabel}}</span>
            <span class="dm-scope">{{d.scope}}</span>
            <span style="font-size:11.5px;color:#4a5568">{{d.catLabel}} · glyph {{d.glyph}}</span>
          </div>
        </div>
      </div>
      <div style="display:{{d.flagDisp}};background:#f3dfd9;border-left:3px solid #9b2c1c;border-radius:4px;padding:8px 10px;font-size:12.5px;line-height:1.4;color:#9b2c1c;font-weight:500">{{d.flag}}</div>
      <div><div class="dm-lbl">Meaning</div><div style="font-size:15px;line-height:1.4;color:#1a2030;font-weight:500">{{d.meaning}}</div></div>
      <div><div class="dm-lbl">What it is not</div><div class="dm-txt">{{d.not}}</div></div>
      <div><div class="dm-lbl">Drawn as</div><div class="dm-txt">{{d.drawn}}</div></div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;border-top:1px solid #d4c9b4;padding-top:10px">
        <div><div class="dm-lbl">On the site</div><div class="dm-txt">{{d.site}}</div></div>
        <div><div class="dm-lbl">In the app</div><div class="dm-txt">{{d.app}}</div></div>
      </div>
      <div style="border-top:1px solid #d4c9b4;padding-top:10px">
        <div class="dm-lbl">Related</div>
        <div style="display:flex;flex-wrap:wrap;gap:5px;margin-top:4px">
          <sc-for list="{{d.rel}}" as="r" hint-placeholder-count="4">
            <button type="button" onClick="{{ r.pick }}" style="display:inline-flex;align-items:center;gap:5px;font-family:Inter,sans-serif;font-size:12px;font-weight:500;color:#0f2440;background:#f5efe0;border:1px solid #d4c9b4;border-radius:999px;padding:3px 9px 3px 5px;cursor:pointer"><img src="{{r.src}}" alt="" width="14" height="14" style="display:block">{{r.name}}</button>
          </sc-for>
        </div>
      </div>
      <div style="display:{{d.noteDisp}};font-size:12px;line-height:1.45;color:#4a5568;border-top:1px solid #d4c9b4;padding-top:10px">{{d.note}}</div>
      <div style="margin-top:auto;background:#f5efe0;border:1px solid #d4c9b4;border-radius:6px;padding:10px 12px">
        <div class="dm-lbl" style="color:#8a5a12">The meanings to agree</div>
        <div style="display:grid;grid-template-columns:auto 1fr;gap:3px 10px;font-size:12px;line-height:1.35;color:#1a2030">
          <b style="font-weight:600">Port</b><span>replaces Harbour; dock · rail depot · airport · customs house. Needs GDR.</span>
          <b style="font-weight:600">Lighthouse</b><span>guidance only.</span>
          <b style="font-weight:600">Council Hall</b><span>governance.</span>
          <b style="font-weight:600">Tower</b><span>the app's mark; the Beacon is its lamp.</span>
          <b style="font-weight:600">Reef · Lantern</b><span>blocking · attention.</span>
          <b style="font-weight:600">Fog</b><span>a map state over terrain, never a tile.</span>
          <b style="font-weight:600">Condition</b><span>thriving · quiet · weathered · ruined, from evidence freshness.</span>
        </div>
      </div>
      <div style="font-size:11px;color:#8b94a3;line-height:1.4">Source: DESIGN.md §3 and packages/symbols/src/symbols.ts. Where they differ, DESIGN.md (newer) is shown.</div>
    </div>
  </div>
</div>
</x-dc>
<script type="text/x-dc" data-dc-script data-props='{"$preview":{"width":1440,"height":1100}}'>
const SYMS = __DATA__;
const CATS = __CATS__;
const ST = {
  canon:    { label: 'Canon',    fg: '#0f2440', bg: '#e3e8ef' },
  decided:  { label: 'Decided',  fg: '#2d5a3d', bg: '#dfe9e1' },
  proposed: { label: 'Proposed', fg: '#8a5a12', bg: '#f1e8d3' },
  open:     { label: 'Open',     fg: '#9b2c1c', bg: '#f3dfd9' }
};
class Component extends DCLogic {
  renderVals() {
    const s = this.state || {};
    const cat = s.cat || 'all';
    const st = s.st || 'any';
    const byId = {};
    SYMS.forEach(x => { byId[x.id] = x; });
    const sel = byId[s.sel] ? s.sel : 'port';
    const chipStyle = (on) => 'font-family:Inter,sans-serif;font-size:12px;font-weight:500;padding:5px 10px;border-radius:999px;cursor:pointer;line-height:1;' +
      (on ? 'background:#0f2440;color:#f5efe0;border:1px solid #0f2440;' : 'background:#fffaf0;color:#1a2030;border:1px solid #d4c9b4;');
    const inCat = (x, c) => c === 'all' ? true : (c === 'key' ? !!x.key : x.cat === c);
    const inSt = (x, t) => t === 'any' ? true : x.status === t;
    const catList = [['all', 'All'], ['key', 'Key'], ...CATS].map(([id, label]) => ({
      label: label, count: SYMS.filter(x => inCat(x, id) && inSt(x, st)).length,
      pressed: id === cat ? 'true' : 'false', style: chipStyle(id === cat),
      pick: () => this.setState({ cat: id })
    }));
    const stList = [['any', 'Any'], ['canon', 'Canon'], ['decided', 'Decided'], ['proposed', 'Proposed']].map(([id, label]) => ({
      label: label, count: SYMS.filter(x => inSt(x, id) && inCat(x, cat)).length,
      pressed: id === st ? 'true' : 'false', style: chipStyle(id === st),
      pick: () => this.setState({ st: id })
    }));
    const vis = SYMS.filter(x => inCat(x, cat) && inSt(x, st));
    const chipOf = (t) => 'color:' + ST[t].fg + ';background:' + ST[t].bg + ';';
    const cards = vis.map(x => {
      const on = x.id === sel;
      return {
        name: x.name, meaning: x.meaning, scope: x.scope, src: x.src,
        statusLabel: ST[x.status].label, chip: chipOf(x.status),
        aria: x.name + ', ' + ST[x.status].label,
        pressed: on ? 'true' : 'false',
        pick: () => this.setState({ sel: x.id }),
        style: 'all:unset;box-sizing:border-box;cursor:pointer;display:flex;flex-direction:column;justify-content:space-between;gap:2px;padding:8px 9px 8px ' + (x.key ? '8px' : '9px') + ';background:' + (on ? '#ffffff' : '#fffaf0') + ';border:1px solid ' + (on ? '#0f2440' : '#d4c9b4') + ';border-radius:8px;' +
          (x.key ? 'border-left:3px solid #c8963c;' : '') + (on ? 'box-shadow:0 0 0 1px #0f2440;' : '') + 'min-width:0;overflow:hidden;font-family:Inter,sans-serif;text-align:left;'
      };
    });
    const x = byId[sel];
    const catLabel = (CATS.find(c => c[0] === x.cat) || ['', ''])[1];
    let note = x.note || '';
    if (x.ts) note = (note ? note + ' ' : '') + 'symbols.ts still says ' + x.ts + '; DESIGN.md says ' + x.status + '.';
    const rel = x.rel.filter(r => byId[r]).map(r => ({ name: byId[r].name, src: byId[r].src, pick: () => this.setState({ sel: r }) }));
    return {
      cats: catList, stats: stList, cards: cards,
      shown: 'Showing ' + vis.length + ' of ' + SYMS.length + ' symbols',
      d: {
        name: x.name, src: x.src, scope: x.scope, glyph: x.glyph, catLabel: catLabel,
        statusLabel: ST[x.status].label, chip: chipOf(x.status),
        meaning: x.meaning, not: x.not, drawn: x.drawn, site: x.site, app: x.app,
        flag: x.flag || '', flagDisp: x.flag ? 'block' : 'none',
        note: note, noteDisp: note ? 'block' : 'none',
        rel: rel
      }
    };
  }
}
</script>
</body>
</html>
'''
html = html.replace('__DATA__', DATA).replace('__CATS__', CATJ)
open(BASE + 'design/project/DsMeaning.dc.html', 'w').write(html)
print(len(out), len(html))
