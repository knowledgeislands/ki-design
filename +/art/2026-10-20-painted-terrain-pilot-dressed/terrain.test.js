import {test,expect} from 'bun:test'
import {W,H,Z,PLINTH,neighbours,key,cornerKey,corner,normalise,fixture,profileSegments,faces,
  facePoints,affine,apply,uv,boundaryDistance,validPad,sortCells,groundAt,placeDressing,dressingByVariant} from './terrain.js'

test('all neighbour endpoints agree in plan and reverse, including negative positions',()=>{
  for(let q=-3;q<=3;q++)for(let r=-3;r<=3;r++)for(let e=0;e<6;e++){
    const a={q,r},d=neighbours[e],b={q:q+d[0],r:r+d[1]},op=(e+3)%6
    expect(cornerKey(a,e)).toEqual(cornerKey(b,(op+1)%6))
    expect(cornerKey(a,(e+1)%6)).toEqual(cornerKey(b,op))
  }
})
test('normalised local zeros reconstruct arbitrary absolute heights',()=>{
  for(const heights of [[-3,-2,0,1,-1,-3],[1,1,1,1,1,1],[0,0,1,2,0,0]]){
    const c=normalise(-2,1,heights)
    expect(Math.min(...c.h)).toBe(0)
    expect(c.h.map(h=>h+c.b)).toEqual(heights)
  }
})
test('documented different elevations share identical projected endpoints',()=>{
  const a=normalise(0,0,[0,0,1,2,0,0]),b=normalise(0,1,[1,2,2,2,2,2])
  expect(corner(a,2)).toEqual(corner(b,0))
  expect(corner(a,3)).toEqual(corner(b,5))
})
test('continuous joins have no faces; crossing profiles split without bow-ties',()=>{
  expect(profileSegments([1,2],[1,2])).toEqual([])
  expect(profileSegments([1,1],[0,0])[0].owner).toBe('a')
  const wedge=profileSegments([1,2],[1,0])[0]
  expect(wedge.top[0]).toBe(wedge.bottom[0])
  const split=profileSegments([0,2],[2,0])
  expect(split.map(s=>s.owner)).toEqual(['b','a'])
  expect(split[0].t1).toBe(.5)
  expect(split[1].t0).toBe(.5)
  expect(split[0].top[1]).toBe(split[0].bottom[1])
})
test('flat fixture has no internal faces and retains the fixed exterior plinth',()=>{
  const cells=fixture('flat'),map=new Map(cells.map(c=>[key(c.q,c.r),c]))
  expect(cells).toHaveLength(19)
  let external=0
  for(const c of cells)for(const f of faces(c,map)){
    expect(f.outside).toBe(true);external++
    expect(f.bottom).toEqual([-PLINTH/Z,-PLINTH/Z])
    expect(f.top).toEqual([0,0])
  }
  expect(external).toBeGreaterThan(0)
})
test('all face endpoints lie exactly on the stored incident surface profiles',()=>{
  for(const scene of ['flat','relief','stress']){
    const cells=fixture(scene),map=new Map(cells.map(c=>[key(c.q,c.r),c]))
    for(const c of cells)for(const f of faces(c,map)){
      const pts=facePoints(c,f),a=corner(c,f.edge),b=corner(c,(f.edge+1)%6)
      for(const [index,t] of [[0,f.t0],[1,f.t1]])for(let axis=0;axis<2;axis++)
        expect(pts[index][axis]).toBeCloseTo(a[axis]+t*(b[axis]-a[axis]),10)
      const d=neighbours[f.edge],other=map.get(key(c.q+d[0],c.r+d[1]))
      if(other){
        const opposite=(f.edge+3)%6,c0=corner(other,(opposite+1)%6),c1=corner(other,opposite)
        for(const [index,t]of [[3,f.t0],[2,f.t1]])for(let axis=0;axis<2;axis++)
          expect(pts[index][axis]).toBeCloseTo(c0[axis]+t*(c1[axis]-c0[axis]),10)
      }
    }
  }
})
test('affine material warp exactly maps every source triangle vertex',()=>{
  const src=[[128,74],[256,37],[256,111]],dest=[[8,10],[143,0],[143,85]],m=affine(src,dest)
  for(let i=0;i<3;i++)for(let axis=0;axis<2;axis++)expect(apply(m,src[i])[axis]).toBeCloseTo(dest[i][axis],10)
  expect(()=>affine([[0,0],[1,1],[2,2]],dest)).toThrow()
})
test('material coordinates on opposite cell edges agree under all neighbour translations',()=>{
  const flat=normalise(0,0,[0,0,0,0,0,0])
  const circularDistance=(a,b)=>Math.min(Math.abs(a-b),1-Math.abs(a-b))
  for(let e=0;e<6;e++)for(let tick=0;tick<=20;tick++){
    const t=tick/20,d=neighbours[e],a=corner(flat,e),b=corner(flat,(e+1)%6)
    const p=[a[0]+t*(b[0]-a[0]),a[1]+t*(b[1]-a[1])]
    const here=uv(...p),there=uv(p[0]-W*(d[0]+d[1]/2),p[1]-3*H*d[1]/4)
    for(let axis=0;axis<2;axis++)expect(circularDistance(here[axis],there[axis])).toBeLessThan(1e-10)
    expect(Math.abs(boundaryDistance(...p))).toBeLessThan(1e-10)
  }
})
test('compound has seven level cells and foreground cells do not rise above it',()=>{
  const pad=['0,0',...neighbours.map(d=>key(...d))]
  for(const scene of ['flat','relief','stress']){
    const cells=fixture(scene)
    expect(validPad(cells,pad)).toBe(true)
    const base=cells.find(c=>key(c.q,c.r)==='0,0').b
    expect(cells.filter(c=>c.r===2).every(c=>c.b<=base)).toBe(true)
    expect(cells.every(c=>Math.max(...c.h)<=2)).toBe(true)
    const broken=cells.map(c=>key(c.q,c.r)==='0,0'?{...c,h:[1,0,0,0,0,0]}:c)
    expect(validPad(broken,pad)).toBe(false)
  }
})
test('tile rearrangement changes artwork choice without changing geometry or order',()=>{
  const a=sortCells(fixture('relief',0)),b=sortCells(fixture('relief',1))
  expect(a.map(({variant,...c})=>c)).toEqual(b.map(({variant,...c})=>c))
  expect(a.map(c=>c.variant)).not.toEqual(b.map(c=>c.variant))
})

test('ground height matches corners, centre and edges of the fan',()=>{
  const cell=normalise(0,0,[2,1,0,0,1,3])
  const C=cell.b+cell.h.reduce((a,b)=>a+b,0)/6
  expect(groundAt(cell,0,0)).toBeCloseTo(C)
  expect(groundAt(cell,0,-H/2+1e-6)).toBeCloseTo(cell.b+cell.h[0],5)
  expect(groundAt(cell,W/2-1e-6,0)).toBeCloseTo((cell.b+cell.h[1]+cell.b+cell.h[2])/2,4)
  expect(groundAt(cell,W,0)).toBeNull()
})
test('dressing is deterministic, stays inside the hex and keeps its props apart',()=>{
  const sizes={shrub:[{w:40,h:30},{w:30,h:24}],flowers:[{w:30,h:24}],grass:[{w:28,h:30}],rock:[{w:50,h:36}],
    stump:[{w:24,h:20}],olive:[{w:90,h:80}],cypress:[{w:22,h:76}],hedge:[{w:70,h:30}],wall:[{w:70,h:30}],
    reeds:[{w:30,h:30}],pond:[{w:80,h:40}]}
  for(let v=0;v<dressingByVariant.length;v++)for(let q=-2;q<=2;q++)for(let r=-2;r<=2;r++){
    const cell={...normalise(q,r,[0,1,1,0,0,0]),variant:v}
    const a=placeDressing(cell,sizes,3),b=placeDressing(cell,sizes,3)
    expect(a).toEqual(b)
    for(const p of a){expect(boundaryDistance(p.x,p.y)).toBeGreaterThan(0);expect(p.z).not.toBeNull()}
  }
})
