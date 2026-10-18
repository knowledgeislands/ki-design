import json, re, sys
icons = json.load(open('../review-src/icons.json'))
for tpl, out in [('overview.tpl.html','DsOverview.dc.html'),('structure.tpl.html','DsStructure.dc.html')]:
    try: t = open(tpl).read()
    except FileNotFoundError: continue
    used = sorted(set(re.findall(r"'([a-z][a-z0-9-]+)'", t)) & set(icons))
    sub = {k: re.sub(r'>\s+<', '><', re.sub(r'\s+', ' ', icons[k])).strip() for k in used}
    t = t.replace('__ICONS__', json.dumps(sub))
    open('../design/project/'+out, 'w').write(t)
    print(out, len(t), used)
