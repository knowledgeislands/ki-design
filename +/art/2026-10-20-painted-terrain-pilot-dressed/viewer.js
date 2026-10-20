import {W,H,Z,offsets,neighbours,key,fixture,sortCells,corner,cornerKey,centre,faces,facePoints,
  affine,uv,boundaryDistance,validPad,screenBounds,position,placeDressing} from './terrain.js'

const root=document.getElementById('painted-terrain-pilot')
const canvas=root.querySelector('canvas'),ctx=canvas.getContext('2d')
const controls={scene:root.querySelector('[data-scene]'),grid:root.querySelector('[data-grid]'),
  hall:root.querySelector('[data-hall]'),dress:root.querySelector('[data-dress]'),rearrange:root.querySelector('[data-rearrange]')}
const status=root.querySelector('[data-status]')
const encoded=JSON.parse(root.querySelector('[data-assets]').textContent)
const state={scene:'relief',grid:false,hall:true,dress:true,seed:0}
const restored=window.openai?.widgetState
function restore(snapshot) {
  const saved=snapshot?.modelContent||snapshot
  if(!saved||typeof saved!=='object')return
  if(['flat','relief','stress'].includes(saved.scene))state.scene=saved.scene
  for(const k of ['grid','hall','dress'])if(typeof saved[k]==='boolean')state[k]=saved[k]
  if(Number.isInteger(saved.seed))state.seed=saved.seed
}
restore(restored)
const images={}
const tiles=[]
let ready=false, frame=null
const path=points=>{
  ctx.beginPath()
  points.forEach((p,i)=>i?ctx.lineTo(...p):ctx.moveTo(...p))
  ctx.closePath()
}
const createCanvas=(w,h)=>{
  const c=document.createElement('canvas');c.width=w;c.height=h;return c
}
const mix=(a,b,t)=>a*(1-t)+b*t
const BASE_VARIANT=3  // lush dark turf leads; the others appear as patches within it
function periodicSwatch(image) {
  const size=256, c=createCanvas(size,size),cctx=c.getContext('2d')
  cctx.drawImage(image,0,0,size,size)
  const raw=cctx.getImageData(0,0,size,size),original=new Uint8ClampedArray(raw.data),out=raw.data
  // Symmetric feathering gives equal opposite edge texels, without painting a line.
  for(let y=0;y<size;y++)for(let x=0;x<size;x++){
    const dx=Math.min(x,size-1-x),dy=Math.min(y,size-1-y)
    const wx=dx<24?.5*(1-dx/24)**2:0,wy=dy<24?.5*(1-dy/24)**2:0
    for(let k=0;k<3;k++){
      const a=original[(y*size+x)*4+k],b=original[(y*size+(size-1-x))*4+k]
      const cc=original[((size-1-y)*size+x)*4+k],d=original[((size-1-y)*size+(size-1-x))*4+k]
      out[(y*size+x)*4+k]=mix(mix(a,b,wx),mix(cc,d,wx),wy)
    }
  }
  cctx.putImageData(raw,0,0)
  return {pixels:out,size}
}
// Light-catching relief from a swatch's own brushwork: the luminance gradient towards the
// upper-left light, at a fine scale (clumps) and a broad one (undulation). Computed with
// wrap-around in swatch space, so it is periodic like the colour and joins between cells.
function reliefMaps({pixels,size}) {
  const L=new Float32Array(size*size)
  for(let i=0;i<size*size;i++)L[i]=(.2126*pixels[i*4]+.7152*pixels[i*4+1]+.0722*pixels[i*4+2])/255
  const at=(a,x,y)=>a[((y+size)%size)*size+((x+size)%size)]
  const blur=(a,r)=>{
    const t=new Float32Array(size*size),o=new Float32Array(size*size)
    for(let y=0;y<size;y++)for(let x=0;x<size;x++){let s=0;for(let k=-r;k<=r;k++)s+=at(a,x+k,y);t[y*size+x]=s/(2*r+1)}
    for(let y=0;y<size;y++)for(let x=0;x<size;x++){let s=0;for(let k=-r;k<=r;k++)s+=at(t,x,y+k);o[y*size+x]=s/(2*r+1)}
    return o
  }
  const grad=(a,d)=>{
    const g=new Float32Array(size*size)
    for(let y=0;y<size;y++)for(let x=0;x<size;x++)g[y*size+x]=at(a,x-d,y-d)-at(a,x+d,y+d)
    return g
  }
  const fine=grad(blur(L,1),2),broad=grad(blur(L,10),12)
  // A broad, soft patch field for placing a variant's material within the dominant turf.
  const field=blur(L,18);let lo=1,hi=0;for(const v of field){lo=Math.min(lo,v);hi=Math.max(hi,v)}
  for(let i=0;i<field.length;i++)field[i]=(field[i]-lo)/Math.max(1e-6,hi-lo)
  return {fine,broad,field,size}
}
function makeTiles(base,variants) {
  const dpr=2,padding=2,w=W*dpr+padding*2,h=H*dpr+padding*2
  const swatches=[periodicSwatch(base),...variants.map(periodicSwatch)]
  const sampler=({pixels,size})=>(u,v,k)=>{
    const xx=u*(size-1),yy=v*(size-1),x=Math.floor(xx),y=Math.floor(yy)
    const x1=Math.min(size-1,x+1),y1=Math.min(size-1,y+1)
    const value=(px,py)=>pixels[(py*size+px)*4+k]
    return mix(mix(value(x,y),value(x1,y),xx-x),mix(value(x,y1),value(x1,y1),xx-x),yy-y)
  }
  const sample=sampler(swatches[0])
  const relief=swatches.map(reliefMaps)
  const scalar=({size},map)=>(u,v)=>{
    const xx=u*(size-1),yy=v*(size-1),x=Math.floor(xx),y=Math.floor(yy)
    const x1=Math.min(size-1,x+1),y1=Math.min(size-1,y+1),val=(px,py)=>map[py*size+px]
    return mix(mix(val(x,y),val(x1,y),xx-x),mix(val(x,y1),val(x1,y1),xx-x),yy-y)
  }
  const baseFine=scalar(relief[0],relief[0].fine),baseBroad=scalar(relief[0],relief[0].broad)
  for(let variant=0;variant<variants.length;variant++){
    const inner=sampler(swatches[variant+1]),r=relief[variant+1]
    const innerFine=scalar(r,r.fine),innerBroad=scalar(r,r.broad),patch=scalar(r,r.field)
    // The dominant turf is the base itself; other materials appear as broad patches within it.
    const own=variant===BASE_VARIANT
    const c=createCanvas(w,h),cc=c.getContext('2d'),raw=cc.createImageData(w,h)
    for(let y=0;y<h;y++)for(let x=0;x<w;x++){
      const px=(x-padding+.5)/dpr-W/2,py=(y-padding+.5)/dpr-H/2
      const [u,v]=uv(px,py),distance=boundaryDistance(px,py)
      // An irregular transition: the collar's inner edge follows the base texture's own
      // light and dark, so hexes never show a neat ring. It depends only on local coordinates.
      const n=(sample(u,v,1)/255-.35)*2
      const interior=Math.min(1,Math.max(0,(distance-6-Math.max(0,n)*34)/26))
      // Every cell's boundary collar is the shared base turf, so any two cells join;
      // the interior is the variant's own material.
      const ou=((u+variant*.37)%1+1)%1,ov=((v+variant*.23)%1+1)%1
      const p=own?0:Math.min(1,Math.max(0,(patch(ou,ov)-.38)/.24))
      const edge=interior*interior*(3-2*interior),blend=edge*p*p*(3-2*p)
      const fine=mix(baseFine(u,v),innerFine(u,v),blend),broad=mix(baseBroad(u,v),innerBroad(u,v),blend)
      // Upper-left light on the brushwork: lift the sunward side of each clump and swell.
      const shade=Math.max(.64,Math.min(1.4,1+fine*2.6+broad*2.2))
      for(let k=0;k<3;k++)raw.data[(y*w+x)*4+k]=mix(sample(u,v,k),inner(u,v,k),blend)*shade
      raw.data[(y*w+x)*4+3]=255
    }
    cc.putImageData(raw,0,0);tiles.push(c)
  }
}
function warp(image,source,dest) {
  // Subpixel overlap closes raster AA cracks; logical triangle boundaries remain exact.
  const mid=[dest.reduce((s,p)=>s+p[0],0)/3,dest.reduce((s,p)=>s+p[1],0)/3]
  const expanded=dest.map(p=>{
    const dx=p[0]-mid[0],dy=p[1]-mid[1],length=Math.hypot(dx,dy)||1
    return [p[0]+dx/length*.22,p[1]+dy/length*.22]
  })
  const matrix=affine(source,dest)
  ctx.save();path(expanded);ctx.clip();ctx.transform(...matrix);ctx.drawImage(image,0,0);ctx.restore()
}
function slopeShade(cell,i,dest) {
  const c=centre(cell),a=corner(cell,i),b=corner(cell,(i+1)%6)
  const centreHeight=cell.b+cell.h.reduce((a,b)=>a+b,0)/6
  const h0=cell.b+cell.h[i]-centreHeight,h1=cell.b+cell.h[(i+1)%6]-centreHeight
  const dx0=a[0]-c[0],dy0=a[1]-c[1]+Z*h0,dx1=b[0]-c[0],dy1=b[1]-c[1]+Z*h1
  const det=dx0*dy1-dx1*dy0
  const gx=(h0*dy1-h1*dy0)/det,gy=(dx0*h1-dx1*h0)/det
  const light=Math.max(-.13,Math.min(.1,(gx+gy*.65)*12))
  if(Math.abs(light)<.001)return
  ctx.save();path(dest);ctx.clip()
  ctx.fillStyle=light>0?'rgba(247,222,161,'+light+')':'rgba(23,40,47,'+(-light)+')'
  ctx.fill();ctx.restore()
}
function drawTop(cell) {
  const image=tiles[cell.variant]
  const source=[W+2,H+2]
  const centerSource=source
  const destCenter=centre(cell)
  for(let i=0;i<6;i++){
    const j=(i+1)%6
    const src=[centerSource,
      [W+2+W*offsets[i][0],H+2+H*offsets[i][1]/2],
      [W+2+W*offsets[j][0],H+2+H*offsets[j][1]/2]]
    const dest=[destCenter,corner(cell,i),corner(cell,j)]
    warp(image,src,dest);slopeShade(cell,i,dest)
  }
}
function drawFace(cell,face) {
  const p=facePoints(cell,face),image=images.stone
  // Keep the rock's proportions: take a strip of the material as tall, relative to its
  // width, as the face is. Faces of one cell start at different offsets along the strata.
  const fw=Math.hypot(p[1][0]-p[0][0],p[1][1]-p[0][1]),fh=Math.max(1,Math.abs(p[3][1]-p[0][1]),Math.abs(p[2][1]-p[1][1]))
  const sw=Math.min(image.width,image.width*.55),sh=Math.min(image.height,sw*fh/fw*1.6)
  const wrap=v=>((v%100)+100)%100  // non-negative for cells at negative coordinates
  const ox=wrap(cell.q*37+cell.r*91+face.edge*53)/100*(image.width-sw),oy=wrap(cell.q*13+cell.r*29)/100*(image.height-sh)
  warp(image,[[ox,oy],[ox+sw,oy],[ox+sw,oy+sh]],[p[0],p[1],p[2]])
  warp(image,[[ox,oy],[ox+sw,oy+sh],[ox,oy+sh]],[p[0],p[2],p[3]])
  ctx.save();path(p);ctx.clip()
  ctx.fillStyle=face.edge===2?'rgba(22,32,44,.46)':'rgba(40,36,30,.14)';ctx.fill()
  // Shadow just under the turf: the overhang shades the top of every face.
  const top=Math.min(p[0][1],p[1][1]),g=ctx.createLinearGradient(0,top,0,top+16)
  g.addColorStop(0,'rgba(12,18,16,.55)');g.addColorStop(1,'rgba(12,18,16,0)')
  ctx.fillStyle=g;ctx.fill();ctx.restore()
  turfLip(cell,p)
}
// A ragged fringe of the cell's own turf hanging over an exposed edge.
function turfLip(cell,p) {
  const [a,b]=[p[0],p[1]],length=Math.hypot(b[0]-a[0],b[1]-a[1])
  let s=(cell.q*928371+cell.r*12345+Math.round(a[0]))>>>0
  const rnd=()=>{s=(s*1664525+1013904223)>>>0;return s/4294967296}
  // Irregular tufts: uneven spacing and depth, mostly shallow with the odd longer hang.
  ctx.save();ctx.beginPath();ctx.moveTo(a[0],a[1]-1.5)
  for(let d=0;d<length;d+=1.2+rnd()*2.8){
    const t=d/length,hang=rnd()<.15?2.5+rnd()*3:.6+rnd()*1.8
    ctx.lineTo(a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t+hang)
  }
  ctx.lineTo(b[0],b[1]+.8);ctx.lineTo(b[0],b[1]-1.5);ctx.closePath()
  ctx.fillStyle=ctx.createPattern(tiles[BASE_VARIANT],'repeat');ctx.fill();ctx.restore()
}
const pad=['0,0',...neighbours.map(d=>key(...d))]
const sizes={}
function dressingFor(cell) {
  if(!state.dress)return []
  const [cx,cy]=position(cell.q,cell.r,0)
  let props=placeDressing(cell,sizes,state.seed)
  // With the Hall standing, its pad keeps a clear forecourt: planting only beyond it.
  if(state.hall&&pad.includes(key(cell.q,cell.r))){
    if(cell.q===0&&cell.r===0)return []
    props=props.filter(p=>((cx+p.x)/215)**2+((cy+p.y)/125)**2>1)
  }
  return props.map(p=>({...p,sx:cx+p.x,sy:cy+p.y-Z*p.z}))
}
function drawProp(p) {
  const sprite=images.props[p.kind][p.index],{w,h}=sprite.size
  if(p.flat){ctx.drawImage(sprite.image,p.sx-w/2,p.sy-h*.6,w,h);return}
  // Soft contact shadow, offset away from the upper-left light.
  ctx.save();ctx.fillStyle='rgba(18,28,24,.16)';ctx.beginPath()
  ctx.ellipse(p.sx+w*.1,p.sy+1,w*.34,w*.34*H/W,0,0,Math.PI*2);ctx.fill();ctx.restore()
  ctx.drawImage(sprite.image,p.sx-w/2,p.sy-h*.96,w,h)
}
function drawHall(cells) {
  if(!state.hall||!validPad(cells,pad))return
  const cell=cells.find(c=>c.q===0&&c.r===0),image=images.hall
  const w=340,h=w*image.height/image.width
  const c=centre(cell)
  ctx.drawImage(image,c[0]-w*.52,c[1]+H*.22-h,w,h)
}
function gridCell(cell) {
  ctx.save();path(Array.from({length:6},(_,i)=>corner(cell,i)))
  ctx.strokeStyle=getComputedStyle(root).getPropertyValue('--foreground').trim()
  ctx.globalAlpha=.45;ctx.lineWidth=1.2;ctx.stroke();ctx.restore()
}
function draw() {
  if(!ready)return
  controls.scene.value=state.scene;controls.grid.checked=state.grid;controls.hall.checked=state.hall
  const cells=sortCells(fixture(state.scene,state.seed)),map=new Map(cells.map(c=>[key(c.q,c.r),c]))
  const [left,top,right,bottom]=screenBounds(cells)
  const box=canvas.getBoundingClientRect(),pixelRatio=Math.min(2,window.devicePixelRatio||1)
  canvas.width=Math.round(box.width*pixelRatio);canvas.height=Math.round(box.height*pixelRatio)
  ctx.clearRect(0,0,canvas.width,canvas.height)
  const scale=Math.min(canvas.width/(right-left+60),canvas.height/(bottom-top+50))
  ctx.setTransform(scale,0,0,scale,(canvas.width-(right-left)*scale)/2-left*scale,
    (canvas.height-(bottom-top)*scale)/2-top*scale)
  // Row by row: every top and face in the row, then the row's props from back to front.
  for(let index=0,row=[];index<cells.length;index++){
    const cell=cells[index];drawTop(cell)
    if(state.grid)gridCell(cell)
    for(const face of faces(cell,map))drawFace(cell,face)
    row.push(...dressingFor(cell))
    if(cells[index+1]?.r!==cell.r){
      row.sort((a,b)=>(b.flat?1:0)-(a.flat?1:0)||a.sy-b.sy).forEach(drawProp);row=[]
      if(cell.r===1)drawHall(cells)
    }
  }
  status.textContent='19 independent cells · '+(state.grid?'grid projected onto the surface':'grid hidden')+
    ' · '+(state.scene==='flat'?'equal-height joins':state.scene==='relief'?'slopes, wedges and a real front step':'opposing edge profiles split into separate faces')
  root.dataset.ready='true'
}
function schedule(){if(frame)cancelAnimationFrame(frame);frame=requestAnimationFrame(()=>{frame=null;draw()})}
function save() {
  window.openai?.setWidgetState?.({modelContent:{...state},privateContent:null})?.catch(()=>{})
}
for(const [name,node] of Object.entries(controls)){
  node.addEventListener(name==='rearrange'?'click':'change',()=>{
    if(name==='rearrange')state.seed++
    else state[name]=name==='scene'?node.value:node.checked
    save();draw()
  })
}
window.addEventListener('openai:set_globals',event=>{
  if(event.detail?.globals?.widgetState){restore(event.detail.globals.widgetState);draw()}
})
new ResizeObserver(schedule).observe(canvas)
new MutationObserver(schedule).observe(document.documentElement,{attributes:true,attributeFilter:['class','style','data-theme']})
const load=src=>new Promise((resolve,reject)=>{const im=new Image();im.onload=()=>resolve(im);im.onerror=reject;im.src=src})
Promise.all([
  load(encoded.stone).then(im=>{images.stone=im}),
  load(encoded.hall).then(im=>{images.hall=im}),
  Promise.all(encoded.materials.map(load)).then(list=>{images.materials=list}),
  Promise.all(encoded.props.map(p=>load(p.src).then(image=>({...p,image})))).then(list=>{
    images.props={}
    for(const p of list){(images.props[p.kind]||=[]).push({image:p.image,size:{w:p.w,h:p.h}});(sizes[p.kind]||=[]).push({w:p.w,h:p.h})}
  }),
]).then(()=>{makeTiles(images.materials[BASE_VARIANT],images.materials);ready=true;draw()}).catch(()=>{
  status.textContent='Painted materials could not be loaded.';status.setAttribute('role','alert')
})
