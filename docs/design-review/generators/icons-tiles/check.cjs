// usage: node check.js file.dc.html '[{"state":...}]'
const fs = require('fs');
const f = process.argv[2];
const states = JSON.parse(process.argv[3] || '[{}]');
const h = fs.readFileSync(f, 'utf8');
const script = h.match(/<script type="text\/x-dc"[^>]*>([\s\S]*?)<\/script>/)[1];
const markup = h.match(/<x-dc>([\s\S]*?)<\/x-dc>/)[1];
class DCLogic { constructor(p) { this.props = p; } setState(o) { this.state = Object.assign({}, this.state, o); } }
const Component = new Function('DCLogic', script + '; return Component;')(DCLogic);
const c = new Component({});
// tag balance (rough)
const tags = markup.replace(/<!--[\s\S]*?-->/g, '').match(/<\/?[a-zA-Z][\w-]*[^>]*>/g);
const voids = new Set(['img', 'input', 'br', 'meta', 'link', 'line', 'rect', 'circle', 'path', 'polygon', 'polyline', 'ellipse', 'use', 'stop', 'hr']);
const stack = [];
for (const t of tags) {
  const name = t.match(/<\/?([a-zA-Z][\w-]*)/)[1].toLowerCase();
  if (t.endsWith('/>')) continue;
  if (t.startsWith('</')) { const top = stack.pop(); if (top !== name) { console.log('MISMATCH', top, name); process.exit(1); } }
  else if (!voids.has(name)) stack.push(name);
}
if (stack.length) console.log('UNCLOSED', stack);
// holes
const holes = [...markup.matchAll(/\{\{\s*([^}]*?)\s*\}\}/g)].map(m => m[1]);
const bad = holes.filter(x => !/^[\w.]+$/.test(x) && !/^(true|false)$/.test(x));
if (bad.length) console.log('EXPR HOLES', bad);
// for-scopes
const forVars = {};
for (const m of markup.matchAll(/<sc-for list="\{\{([\w.]+)\}\}" as="(\w+)"/g)) forVars[m[2]] = m[1];
for (const st of states) {
  c.state = st;
  const v = c.renderVals();
  const get = (path) => {
    const parts = path.split('.');
    let base;
    if (forVars[parts[0]]) {
      const arr = get(forVars[parts[0]]);
      if (!Array.isArray(arr)) return undefined;
      if (!arr.length) return null; // empty list ok
      base = arr[0];
    } else base = v[parts[0]];
    for (const p of parts.slice(1)) { if (base == null) return base; base = base[p]; }
    return base;
  };
  const missing = [...new Set(holes.filter(x => /^[\w.]+$/.test(x)))].filter(x => get(x) === undefined);
  console.log(JSON.stringify(st), 'missing:', missing);
}
console.log('ok', (fs.statSync(f).size / 1024).toFixed(1) + ' KB');
