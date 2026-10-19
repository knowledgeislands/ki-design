from PIL import Image
import math
S=2  # output scale (x of 1x)
def load(name):
    im=Image.open(f'out/{name}.png'); w,h=im.size
    return im.resize((w*S//4,h*S//4),Image.LANCZOS), (h-784)*S//4
cache={}
def tile(name):
    if name not in cache: cache[name]=load(name)
    return cache[name]
# axial (q,r) -> name
land={}
def ring(n):
    out=[];q,r=-n,n  # start
    dirs=[(1,0),(1,-1),(0,-1),(-1,0),(-1,1),(0,1)]
    if n==0: return [(0,0)]
    q,r=0+(-1)*0, 0  # placeholder
    q,r=-n,0
    # standard: start at direction 4 * n
    q,r=-n, n
    for d in dirs:
        for _ in range(n):
            out.append((q,r)); q+=d[0]; r+=d[1]
    return out
plan={
 (0,0):'structure-library',(1,-1):'structure-council-hall',(0,-1):'terrain-grassland',(-1,0):'terrain-forest',
 (1,0):'terrain-grassland',(-1,1):'structure-mill',(0,1):'terrain-river',
 (0,-2):'terrain-mountain',(1,-2):'terrain-hills',(2,-2):'structure-observatory',(2,-1):'terrain-hills',(2,0):'terrain-cliffs',
 (1,1):'terrain-coastal',(0,2):'structure-lighthouse',(-1,2):'terrain-coastal',(-2,2):'terrain-marsh',(-2,1):'terrain-forest',
 (-2,0):'terrain-cliffs',(-1,-1):'terrain-forest',
}
cells=dict(plan)
for n in (3,):
    for c in ring(n): cells.setdefault(c,'terrain-ocean')
cells[(3,-1)]='terrain-sand'
pts={c:(256*S*(c[0]+c[1]/2), 111*S*c[1]) for c in cells}
xs=[p[0] for p in pts.values()];ys=[p[1] for p in pts.values()]
pad=200*S
W=int(max(xs)-min(xs)+256*S+2*pad*0.3);H=int(max(ys)-min(ys)+400*S)
canvas=Image.new('RGBA',(W,H),(15,36,64,255))
ox=-min(xs)+pad*0.3; oy=-min(ys)+250*S
for c in sorted(cells,key=lambda c:(pts[c][1],pts[c][0])):
    im,off=tile(cells[c]); x,y=pts[c]
    canvas.alpha_composite(im,(int(x+ox-128*S/2*2/2*1-0+0) - 0, int(y+oy-off)) if False else (int(x+ox), int(y+oy-off)))
canvas.convert('RGB').save('island-test.jpg',quality=88); print(canvas.size)
