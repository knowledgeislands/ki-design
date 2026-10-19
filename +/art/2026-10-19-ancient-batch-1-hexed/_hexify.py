"""Prototype: re-project AI-painted isometric diamond tiles onto the KI hex cell.

We own the geometry; the generator only paints. For each candidate:
  1. remove a flat grey background if there is no alpha;
  2. measure the painted diamond (side corners, plinth depth, face depth);
  3. re-project the painted top face into the KI pointy-top hex (2:1 dimetric),
     inscribed in the diamond so no edge is invented;
  4. keep anything that rises above the diamond's back edges (peaks, buildings);
  5. re-project the painted plinth onto the hex's two visible side faces.

Output: the 4x cell (top face 1024 x 592, plinth 192) on a 1024 x 1024 canvas
for terrain, 1024 x 1536 for single-hex structures.
"""

import sys
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter

SS = 4  # mask supersampling


def remove_flat_background(im: Image.Image, tol: int = 18) -> Image.Image:
    rgb = np.asarray(im.convert("RGB")).astype(int)
    h, w, _ = rgb.shape
    border = np.concatenate([rgb[0], rgb[-1], rgb[:, 0], rgb[:, -1]])
    bg = np.median(border, axis=0)
    close = np.abs(rgb - bg).max(axis=2) <= tol
    # flood fill from the border through background-coloured pixels
    seed = np.zeros_like(close)
    seed[0, :] = close[0, :]
    seed[-1, :] = close[-1, :]
    seed[:, 0] = close[:, 0]
    seed[:, -1] = close[:, -1]
    filled = seed.copy()
    while True:
        grown = filled.copy()
        grown[1:] |= filled[:-1]
        grown[:-1] |= filled[1:]
        grown[:, 1:] |= filled[:, :-1]
        grown[:, :-1] |= filled[:, 1:]
        grown &= close
        if (grown == filled).all():
            break
        filled = grown
    alpha = np.where(filled, 0, 255).astype(np.uint8)
    a = Image.fromarray(alpha).filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(0.8))
    out = im.convert("RGBA")
    out.putalpha(a)
    return out


def measure(im: Image.Image):
    a = np.asarray(im)[:, :, 3] > 128
    ys, xs = np.nonzero(a)
    x0, x1 = int(xs.min()), int(xs.max())
    colL = np.nonzero(a[:, x0 + 3])[0]
    colR = np.nonzero(a[:, x1 - 3])[0]
    cx = (x0 + x1) / 2
    colC = np.nonzero(a[:, int(cx)])[0]
    yL, yR = colL.min(), colR.min()
    yc = (yL + yR) / 2
    P = ((colL.max() - yL) + (colR.max() - yR)) / 2
    hh = colC.max() - (colL.max() + colR.max()) / 2
    D = x1 - x0
    return dict(x0=x0, x1=x1, cx=cx, yc=yc, yL=yL, yR=yR, P=P, hh=hh, D=D)


def poly_mask(size, pts):
    w, h = size
    m = Image.new("L", (w * SS, h * SS), 0)
    ImageDraw.Draw(m).polygon([(x * SS, y * SS) for x, y in pts], fill=255)
    return m.resize((w, h), Image.LANCZOS)


def affine_from(src_o, src_u, src_v, dst_o, dst_u, dst_v):
    """PIL AFFINE coefficients mapping output (dst) points to input (src)."""
    U = np.array([[dst_u[0], dst_v[0]], [dst_u[1], dst_v[1]]], float)
    S = np.array([[src_u[0], src_v[0]], [src_u[1], src_v[1]]], float)
    M = S @ np.linalg.inv(U)
    c = np.array(src_o) - M @ np.array(dst_o)
    return (M[0, 0], M[0, 1], c[0], M[1, 0], M[1, 1], c[1])


def hexify(src: Path, out: Path, canvas_h: int, fit: float = 0.985):
    im = Image.open(src)
    if im.mode != "RGBA":
        im = remove_flat_background(im)
    im = im.convert("RGBA")
    arr = np.asarray(im).copy()
    arr[:, :, 3] = np.where(arr[:, :, 3] > 128, 255, arr[:, :, 3])  # firm up near-opaque alpha
    im = Image.fromarray(arr)
    g = measure(im)

    W, F, PL = 1024, 592, 192  # top-face width, top-face height, plinth
    off = canvas_h - (F + PL)
    top = [(512, off), (1024, off + 148), (1024, off + 444), (512, off + 592), (0, off + 444), (0, off + 148)]
    ccy = off + 296
    size = (W, canvas_h)

    # ground: target plan (x, 2y) -> source plan -> source screen
    s = 0.634 * g["D"] * fit / W
    k = g["hh"] / (g["D"] / 2)  # source screen-y per plan unit
    a_, e_ = s, s * 2 * k
    ground = im.transform(size, Image.AFFINE, (a_, 0, g["cx"] - 512 * a_, 0, e_, g["yc"] - ccy * e_), Image.BICUBIC)

    # source diamond top face (for "rises above the back edge")
    T = (g["cx"], g["yc"] - g["hh"])
    L = (g["x0"], g["yL"])
    R = (g["x1"], g["yR"])
    B = (g["cx"], g["yc"] + g["hh"])
    above_src = Image.new("L", im.size, 0)
    # region above the two back edges: polygon from top-left corner of image
    ImageDraw.Draw(above_src).polygon([(0, 0), (im.size[0], 0), (im.size[0], R[1]), R, T, L, (0, L[1])], fill=255)
    rises = Image.fromarray(np.minimum(np.asarray(above_src), np.asarray(im)[:, :, 3]).astype(np.uint8))
    rises_t = rises.transform(size, Image.AFFINE, (a_, 0, g["cx"] - 512 * a_, 0, e_, g["yc"] - ccy * e_), Image.BICUBIC)

    hexm = poly_mask(size, top)
    above_hex = poly_mask(size, [(0, 0), (1024, 0), (1024, off + 148), (512, off), (0, off + 148)])
    # Between the hex's back edges and the (larger) painted diamond's back edges lies a
    # strip of painted ground we drop. Where something tall crosses the painted back
    # edge (a peak, a dome, a lighthouse), keep that strip in those columns so the
    # object stays grounded instead of floating.
    rt = np.asarray(rises_t) > 128
    height = rt.sum(axis=0)
    tall = height > 40
    tall = np.convolve(tall.astype(float), np.ones(9) / 9, mode="same") > 0.5
    rows = np.arange(canvas_h)[:, None]
    first = np.where(rt.any(axis=0), rt.argmax(axis=0), canvas_h)
    band = (rows >= first[None, :]) & tall[None, :]
    rise = np.where(tall[None, :], np.maximum(np.asarray(rises_t), np.where(band, 255, 0)), 0).astype(np.uint8)  # low tufts are dropped
    rise_mask = Image.fromarray(np.minimum(np.asarray(above_hex), rise).astype(np.uint8)).filter(ImageFilter.GaussianBlur(0.7))

    # plinth faces
    P = g["P"]
    left = im.transform(size, Image.AFFINE, affine_from(L, (B[0] - L[0], B[1] - L[1]), (0, P), (0, off + 444), (512, 148), (0, PL)), Image.BICUBIC)
    right = im.transform(size, Image.AFFINE, affine_from(B, (R[0] - B[0], R[1] - B[1]), (0, P), (512, off + 592), (512, -148), (0, PL)), Image.BICUBIC)
    lm = poly_mask(size, [(0, off + 444), (512, off + 592), (512, off + 592 + PL), (0, off + 444 + PL)])
    rm = poly_mask(size, [(512, off + 592), (1024, off + 444), (1024, off + 444 + PL), (512, off + 592 + PL)])

    outim = Image.new("RGBA", size, (0, 0, 0, 0))
    for layer, mask in ((left, lm), (right, rm), (ground, hexm), (ground, rise_mask)):
        lay = layer.copy()
        lay.putalpha(Image.fromarray(np.minimum(np.asarray(mask), np.asarray(layer)[:, :, 3]).astype(np.uint8)) if mask is rise_mask else mask)
        outim.alpha_composite(lay)

    # a hairline where top face meets plinth, so tiles read as tiles at 1x
    d = ImageDraw.Draw(outim)
    d.line([(0, off + 444), (512, off + 592), (1024, off + 444)], fill=(26, 32, 48, 90), width=3)
    outim.save(out)
    return g


if __name__ == "__main__":
    src_dir, out_dir = Path(sys.argv[1]), Path(sys.argv[2])
    out_dir.mkdir(parents=True, exist_ok=True)
    for f in sorted(src_dir.glob("terrain-*.png")):
        print(f.name, hexify(f, out_dir / f.name, 1536 if f.stem == "terrain-mountain" else 1024))
    for f in sorted(src_dir.glob("structure-*.png")):
        if f.stem in ("structure-capital", "structure-port"):
            continue
        print(f.name, hexify(f, out_dir / f.name, 1536))
