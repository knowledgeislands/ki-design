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
  for(let variant=0;variant<variants.length;variant++){
    const inner=sampler(swatches[variant+1])
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
      const blend=interior*interior*(3-2*interior)
      for(let k=0;k<3;k++)raw.data[(y*w+x)*4+k]=mix(sample(u,v,k),inner(u,v,k),blend)
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
  ctx.save();path(p);ctx.clip();ctx.fillStyle=face.edge===2?'rgba(25,37,48,.34)':'rgba(30,36,40,.08)';ctx.fill();ctx.restore()
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
]).then(()=>{makeTiles(images.materials[1],images.materials);ready=true;draw()}).catch(()=>{
  status.textContent='Painted materials could not be loaded.';status.setAttribute('role','alert')
})
