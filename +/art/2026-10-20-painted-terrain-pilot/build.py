"""Rebuild the review fragment from its preserved raw material/sprite inputs."""
from pathlib import Path
from PIL import Image
import base64, io, json, subprocess

HERE = Path(__file__).resolve().parent
REPO = HERE.parents[2]
images = {}
for name,size in [('grass',512),('stone',384),('hall',720)]:
    with Image.open(HERE/'originals'/f'{name}.png') as im:
        im=im.convert('RGBA' if name=='hall' else 'RGB')
        if name=='hall':
            bbox=im.getchannel('A').point(lambda x:255 if x>=16 else 0).getbbox()
            im=im.crop(bbox)
        im.thumbnail((size,size),Image.Resampling.LANCZOS)
        buf=io.BytesIO()
        im.save(buf,format='WEBP',quality=86,method=6)
        (HERE/'assets').mkdir(exist_ok=True)
        (HERE/'assets'/f'{name}.webp').write_bytes(buf.getvalue())
        images[name]='data:image/webp;base64,'+base64.b64encode(buf.getvalue()).decode()
subprocess.run(['bun','build',str(HERE/'viewer.js'),'--target=browser','--format=iife',
    '--minify','--outfile',str(HERE/'assets'/'viewer.bundle.js')],cwd=REPO,check=True)
fragment=(HERE/'pilot.html').read_text()
fragment=fragment.replace('__PILOT_ASSETS__',json.dumps(images,separators=(',',':')))
fragment=fragment.replace('__PILOT_BUNDLE__',(HERE/'assets'/'viewer.bundle.js').read_text())
assert len(fragment.encode())<1_000_000
assert '__PILOT_' not in fragment
(HERE/'painted-terrain-pilot.html').write_text(fragment)
print('Review fragment:',len(fragment.encode()),'bytes')
