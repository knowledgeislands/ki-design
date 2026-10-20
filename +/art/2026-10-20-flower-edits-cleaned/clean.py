"""Derive cleaned copies of the flower edits; the originals are never altered.

1. Alpha: the generator's alpha peaks at 254 and leaves a faint exterior halo. Values below 16
   become 0, values from 16 to 240 are stretched linearly to 0-255, and everything above is 255.
2. Tone: one gamma curve on luminance for the whole image, chosen so the mean brightness of its
   green (grass) pixels matches Council Hall A's own grass. Hue and the relationships between
   grass, rock and building are kept; only overall brightness moves.
"""
import sys
from pathlib import Path
import numpy as np
from PIL import Image

def grass_mask(rgb, alpha):
    return (alpha > 0.9) & (rgb[..., 1] > rgb[..., 0] * 0.95) & (rgb[..., 1] > rgb[..., 2] * 1.15)

def luminance(rgb):
    return 0.2126 * rgb[..., 0] + 0.7152 * rgb[..., 1] + 0.0722 * rgb[..., 2]

def mean_grass(path):
    a = np.asarray(Image.open(path).convert('RGBA')).astype(float) / 255
    return luminance(a[..., :3][grass_mask(a[..., :3], a[..., 3])]).mean()

def clean(src, dst, target, tone=True):
    a = np.asarray(Image.open(src).convert('RGBA')).astype(float) / 255
    rgb, alpha = a[..., :3], a[..., 3]
    alpha = np.clip((alpha - 16 / 255) / ((240 - 16) / 255), 0, 1)
    gamma = 1.0
    if tone:
        m = grass_mask(rgb, a[..., 3])
        lo, hi = 0.5, 3.0
        for _ in range(40):  # bisection: gamma so that the mean grass luminance hits the target
            gamma = (lo + hi) / 2
            L = luminance(rgb[m]) ** gamma
            lo, hi = (gamma, hi) if L.mean() > target else (lo, gamma)
        L0 = np.maximum(luminance(rgb), 1e-6)
        rgb = np.clip(rgb * (L0 ** gamma / L0)[..., None], 0, 1)
    out = np.dstack([rgb, alpha]) * 255
    Image.fromarray(out.round().astype(np.uint8), 'RGBA').save(dst, optimize=True)
    return gamma

if __name__ == '__main__':
    src_dir, out_dir, ref = Path(sys.argv[1]), Path(sys.argv[2]), Path(sys.argv[3])
    out_dir.mkdir(parents=True, exist_ok=True)
    target = mean_grass(ref)
    print('target grass luminance', round(target, 3))
    for name in ['grassland', 'council-hall', 'snow']:
        g = clean(src_dir / f'{name}.png', out_dir / f'{name}.png', target, tone=name != 'snow')
        print(name, 'gamma', round(g, 3), 'grass L after', round(mean_grass(out_dir / f'{name}.png'), 3) if name != 'snow' else '-')
