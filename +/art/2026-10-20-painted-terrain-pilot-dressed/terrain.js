// Experimental review renderer. No production package exports or contracts change.
export const W = 256
export const H = 148
export const Z = W / 8
export const PLINTH = 48
export const offsets = [[0,-2],[1,-1],[1,1],[0,2],[-1,1],[-1,-1]]
export const neighbours = [[1,-1],[1,0],[0,1],[-1,1],[-1,0],[0,-1]]
export const key = (q,r) => q + ',' + r
export const cornerKey = (cell,i) => [2*cell.q+cell.r+offsets[i][0],3*cell.r+offsets[i][1]]
export const position = (q,r,z=0) => [W*(q+r/2),3*H*r/4-Z*z]
export const corner = (cell,i) => {
  const [x,y] = cornerKey(cell,i)
  return [W*x/2,H*y/4-Z*(cell.b+cell.h[i])]
}
export const centre = (cell) => position(cell.q,cell.r,cell.b+cell.h.reduce((a,b)=>a+b,0)/6)
export function normalise(q,r,heights,variant=0) {
  const b = Math.min(...heights)
  return {q,r,b,h:heights.map(h=>h-b),variant,material:'grass'}
}
export const heightAt = (cell,edge,t) => cell.b + cell.h[edge]*(1-t)+cell.h[(edge+1)%6]*t
export function profileSegments(a,b) {
  const d0=b[0]-a[0], d1=b[1]-a[1]
  if(d0===0 && d1===0) return []
  const lerp=(v,t)=>v[0]+t*(v[1]-v[0])
  const cuts=d0*d1<0?[0,d0/(d0-d1),1]:[0,1]
  return cuts.slice(0,-1).map((t0,i)=>{
    const t1=cuts[i+1], owner=lerp(b,(t0+t1)/2)>lerp(a,(t0+t1)/2)?'b':'a'
    return {t0,t1,owner,top:[lerp(owner==='a'?a:b,t0),lerp(owner==='a'?a:b,t1)],
      bottom:[lerp(owner==='a'?b:a,t0),lerp(owner==='a'?b:a,t1)]}
  })
}
export function faces(cell,map) {
  return [2,3].flatMap(edge=>{
    const step=neighbours[edge], other=map.get(key(cell.q+step[0],cell.r+step[1]))
    const heights=[cell.b+cell.h[edge],cell.b+cell.h[(edge+1)%6]]
    const opposite=(edge+3)%6
    const lower=other?[other.b+other.h[(opposite+1)%6],other.b+other.h[opposite]]:[-PLINTH/Z,-PLINTH/Z]
    return profileSegments(heights,lower).filter(s=>s.owner==='a').map(s=>({
      edge,...s,outside:!other
    }))
  })
}
export function facePoints(cell,face) {
  const a=cornerKey(cell,face.edge),b=cornerKey(cell,(face.edge+1)%6)
  const point=(t,z)=>[W*(a[0]+t*(b[0]-a[0]))/2,H*(a[1]+t*(b[1]-a[1]))/4-Z*z]
  return [point(face.t0,face.top[0]),point(face.t1,face.top[1]),
    point(face.t1,face.bottom[1]),point(face.t0,face.bottom[0])]
}
export function fixture(scene='relief',seed=0) {
  const cells=[]
  const vertices=new Map()
  const plateau = new Set(['0,0',...neighbours.map(d=>key(...d))])
  for(let r=-2;r<=2;r++) for(let q=-2;q<=2;q++) {
    if(Math.max(Math.abs(q),Math.abs(r),Math.abs(q+r))>2)continue
    cells.push({q,r})
    if(plateau.has(key(q,r))) for(let i=0;i<6;i++) vertices.set(cornerKey({q,r},i).join(','),1)
  }
  for(const c of cells)for(let i=0;i<6;i++){
    const [x,y]=cornerKey(c,i),k=x+','+y
    if(!vertices.has(k))vertices.set(k,y<-3?Math.min(3,1+Math.round((-y-3)/2)):y>3?0:1)
  }
  return cells.map((c,index)=>{
    let hh=Array.from({length:6},(_,i)=>scene==='flat'?0:vertices.get(cornerKey(c,i).join(',')))
    // A deliberate one-unit step to the lower front ring, unlike a painted border.
    if(scene!=='flat' && c.r===2)hh=hh.map(()=>0)
    // Raised eastern outer cell proves east-facing, edge-on discontinuities.
    if(scene==='stress'&&c.q===2&&c.r===-1)hh=[2,2,1,0,0,1]
    if(scene==='stress'&&c.q===2&&c.r===0)hh=[0,0,1,2,1,0]
    return normalise(c.q,c.r,hh,(index*3+seed+(index%3)*seed)%4)
  })
}
export const sortCells = cells => [...cells].sort((a,b)=>a.r-b.r||a.q-b.q)
export function affine(source,dest) {
  const [[x0,y0],[x1,y1],[x2,y2]]=source,[[u0,v0],[u1,v1],[u2,v2]]=dest
  const det=(x1-x0)*(y2-y0)-(x2-x0)*(y1-y0)
  if(Math.abs(det)<1e-9)throw new Error('Degenerate source triangle')
  const a=((u1-u0)*(y2-y0)-(u2-u0)*(y1-y0))/det
  const c=(-(u1-u0)*(x2-x0)+(u2-u0)*(x1-x0))/det
  const b=((v1-v0)*(y2-y0)-(v2-v0)*(y1-y0))/det
  const d=(-(v1-v0)*(x2-x0)+(v2-v0)*(x1-x0))/det
  return [a,b,c,d,u0-a*x0-c*y0,v0-b*x0-d*y0]
}
export const apply = (m,p) => [m[0]*p[0]+m[2]*p[1]+m[4],m[1]*p[0]+m[3]*p[1]+m[5]]
export const mod = value => ((value%1)+1)%1
// Local material coordinates repeat under both axial neighbour translations.
// They depend on a tile's local position, never the scene origin or map size.
export const uv = (x,y) => [mod(x/W-y/(3*H/2)),mod(y/(3*H/4))]
export function boundaryDistance(x,y) {
  return Math.min(W/2-Math.abs(x),
    (H/2-Math.abs(y)-H*Math.abs(x)/(2*W))/Math.sqrt(1+(H/(2*W))**2))
}
export function validPad(cells,footprint) {
  const map=new Map(cells.map(c=>[key(c.q,c.r),c]))
  const members=footprint.map(k=>map.get(k))
  return members.every(c=>c&&c.h.every(v=>v===0))&&members.every(c=>c.b===members[0].b)
}
export function screenBounds(cells) {
  const map=new Map(cells.map(c=>[key(c.q,c.r),c]))
  const points=cells.flatMap(c=>[...Array.from({length:6},(_,i)=>corner(c,i)),
    ...faces(c,map).flatMap(f=>facePoints(c,f))])
  return [Math.min(...points.map(p=>p[0])),Math.min(...points.map(p=>p[1]))-90,
    Math.max(...points.map(p=>p[0])),Math.max(...points.map(p=>p[1]))]
}

// Height of the mean-centre fan at a local point (x, y) relative to the cell centre,
// in unraised top-face pixels. Returns null outside the hex.
export function groundAt(cell,x,y) {
  const C=cell.b+cell.h.reduce((a,b)=>a+b,0)/6
  const p=i=>[W*offsets[i][0]/2,H*offsets[i][1]/4]
  const cross=(a,b)=>a[0]*b[1]-a[1]*b[0]
  for(let i=0;i<6;i++){
    const j=(i+1)%6,A=[0,0],B=p(i),D=p(j),T=[x,y]
    const det=cross(B,D)
    const v=cross(T,D)/det,w=cross(B,T)/det,u=1-v-w
    if(u>=-1e-9&&v>=-1e-9&&w>=-1e-9)return u*C+v*(cell.b+cell.h[i])+w*(cell.b+cell.h[j])
  }
  return null
}
// A small deterministic generator, so a cell's dressing depends only on its address and seed.
export function random(q,r,seed) {
  let s=(Math.imul(q|0,73856093)^Math.imul(r|0,19349663)^Math.imul(seed+1,83492791))>>>0
  return ()=>{s=(s+0x6D2B79F5)>>>0;let t=s;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return((t^t>>>14)>>>0)/4294967296}
}
// What each ground variant carries. Kinds name sprites on the props sheet.
// Each variant has alternative plantings; a cell picks one from its own seed.
export const dressingByVariant=[
  [['shrub','flowers','flowers','flowers','grass','grass'],['hedge','flowers','flowers','grass','shrub']],
  [['rock','shrub','rock','flowers','grass'],['wall','rock','shrub','flowers']],
  [['stump','shrub','grass','grass','flowers'],['wall','shrub','grass','stump']],
  [['olive','cypress','shrub','cypress','shrub'],['olive','shrub','shrub','cypress'],['pond','reeds','reeds','shrub','cypress']],
]
const flat=new Set(['pond'])
// Place props inside the hex, clear of its boundary and of each other.
// sizes: kind -> list of {w,h} sprite sizes in world pixels.
export function placeDressing(cell,sizes,seed=0) {
  const rnd=random(cell.q,cell.r,seed+cell.variant*7),out=[]
  const options=dressingByVariant[cell.variant],plan=options[Math.floor(rnd()*options.length)]
  for(const kind of plan){
    const list=sizes[kind]; if(!list?.length)continue
    const index=Math.floor(rnd()*list.length),{w}=list[index],radius=w*.42
    // The first prop anchors a group; the rest gather near it, as planting does.
    const near=out[0]
    for(let attempt=0;attempt<32;attempt++){
      const spread=near&&attempt<20?.32:.8
      const x=(near&&attempt<20?near.x:0)+(rnd()-.5)*W*spread,y=(near&&attempt<20?near.y:0)+(rnd()-.5)*H*spread
      if(boundaryDistance(x,y)<radius*.35+8)continue
      if(out.some(o=>Math.hypot((o.x-x),(o.y-y)*1.6)<(o.radius+radius)*.62))continue
      // A pond needs nearly level ground.
      if(flat.has(kind)&&Math.max(...cell.h)>1)break
      out.push({kind,index,x,y,radius,z:groundAt(cell,x,y),flat:flat.has(kind)});break
    }
  }
  return out.sort((a,b)=>(b.flat?1:0)-(a.flat?1:0)||a.y-b.y)
}
