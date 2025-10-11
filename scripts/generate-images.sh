#!/usr/bin/env bash
set -euo pipefail

# Generate optimized JPG, WebP and AVIF (if available) from SVG placeholders in public/images
# Requires ImageMagick (magick/convert) and cwebp/avifenc or ImageMagick built with webp/avif support.

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
IMG_DIR="$ROOT_DIR/public/images"

mkdir -p "$IMG_DIR"

echo "Generating optimized images in $IMG_DIR"

for base in hero-1 hero-2; do
  svg="$IMG_DIR/${base}.svg"
  jpg="$IMG_DIR/${base}.jpg"
  webp="$IMG_DIR/${base}.webp"
  avif="$IMG_DIR/${base}.avif"

  if [ ! -f "$svg" ]; then
    echo "Skipping $svg (not found)"
    continue
  fi

  echo "- Generating JPG from $svg -> $jpg"
  if command -v magick >/dev/null 2>&1; then
    magick "$svg" -strip -quality 85 -resize 2000x "$jpg"
  elif command -v convert >/dev/null 2>&1; then
    convert "$svg" -strip -quality 85 -resize 2000x "$jpg"
  else
    echo "  ImageMagick not found; please install 'magick' or 'convert' to generate JPGs." >&2
    exit 1
  fi

  echo "- Generating WebP from $jpg -> $webp"
  if command -v cwebp >/dev/null 2>&1; then
    cwebp -q 80 "$jpg" -o "$webp"
  elif command -v magick >/dev/null 2>&1; then
    magick "$jpg" -quality 80 "$webp"
  else
    echo "  cwebp not found and ImageMagick missing webp support; skipping WebP generation." >&2
  fi

  echo "- Generating AVIF from $jpg -> $avif (if avif encoder available)"
  if command -v avifenc >/dev/null 2>&1; then
    avifenc --min 30 --max 45 "$jpg" "$avif"
  elif command -v magick >/dev/null 2>&1; then
    # ImageMagick may support avif depending on build
    magick "$jpg" -quality 45 "$avif" || echo "  ImageMagick avif encode not available; skipped"
  else
    echo "  avifenc or ImageMagick avif support not available; skipping AVIF generation." >&2
  fi

done

echo "Done. Optimized images written to $IMG_DIR"
