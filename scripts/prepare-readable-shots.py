#!/usr/bin/env python3
"""Crop proposal screenshots — balanced for side-by-side layout (~740px each)."""
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
IMG = ROOT / "docs" / "proposal-images"
FULL = IMG / "_full"
OUT_W = 740

JOBS = [
    # Desktop — tighter width slice = taller readable output
    ("original-desktop-home.png", "original-desktop-home.png", 1000, 0.38),
    ("demo-desktop-home.png", "demo-desktop-home.png", 1000, 0.38),
    ("original-desktop-search.png", "original-desktop-search.png", 880, 0.38),
    ("demo-desktop-search.png", "demo-desktop-search.png", 880, 0.38),
    ("original-desktop-home.png", "original-desktop-contact.png", 520, 0.38),
    ("demo-desktop-contact.png", "demo-desktop-contact.png", 920, 0.38),
    ("original-desktop-products.png", "original-desktop-products.png", None, 0.38),
    ("demo-desktop-products.png", "demo-desktop-products.png", 880, 0.38),
    # Mobile
    ("original-mobile-home.png", "original-mobile-home.png", 720, 0.20),
    ("demo-mobile-home.png", "demo-mobile-home.png", 720, 0.20),
    ("original-mobile-search.png", "original-mobile-search.png", 600, 0.20),
    ("demo-mobile-search.png", "demo-mobile-search.png", 600, 0.20),
    ("original-mobile-contact.png", "original-mobile-contact.png", 560, 0.20),
    ("demo-mobile-contact.png", "demo-mobile-contact.png", 720, 0.20),
    ("original-mobile-products.png", "original-mobile-products.png", 720, 0.20),
    ("demo-desktop-products.png", "demo-mobile-products.png", 760, 0.18),
]


def crop_readable(src: Path, dest: Path, height: int | None, width_frac: float) -> None:
    im = Image.open(src)
    w, h = im.size
    crop_w = max(360, int(w * width_frac))
    left = (w - crop_w) // 2
    crop_h = h if height is None else min(height, h)
    out = im.crop((left, 0, left + crop_w, crop_h))
    if out.width != OUT_W:
        ratio = OUT_W / out.width
        out = out.resize((OUT_W, max(1, int(out.height * ratio))), Image.Resampling.LANCZOS)
    out.save(dest, optimize=True)
    print(f"{dest.name}: {out.size[0]}x{out.size[1]}")


def main() -> None:
    for src_name, dest_name, height, width_frac in JOBS:
        src = FULL / src_name
        if not src.exists():
            src = IMG / src_name
        if not src.exists():
            print("missing", src_name)
            continue
        crop_readable(src, IMG / dest_name, height, width_frac)


if __name__ == "__main__":
    main()
