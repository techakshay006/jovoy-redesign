/** Vercel edge-optimized image URL (WebP/AVIF + CDN cache). Dev uses source URLs. */
export function optimizedImageUrl(
  src: string,
  width: number,
  quality = 75,
): string {
  if (!src) return src
  if (src.startsWith('/') || src.startsWith('data:')) return src
  if (import.meta.env.DEV) return src

  return `/_vercel/image?url=${encodeURIComponent(src)}&w=${width}&q=${quality}`
}

/** Map remote Jovoy assets to sized Vercel-optimized URLs */
export function resolveImage(
  src: string,
  opts: { width: number; quality?: number; eager?: boolean },
): string {
  return optimizedImageUrl(src, opts.width, opts.quality ?? (opts.eager ? 82 : 75))
}
