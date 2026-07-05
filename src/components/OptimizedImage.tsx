import type { ImgHTMLAttributes } from 'react'
import { toThumbUrl } from '../data/siteData'
import { resolveImage } from '../lib/imageUrl'

interface OptimizedImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src: string
  eager?: boolean
  thumb?: boolean
  width?: number
}

export function OptimizedImage({
  src,
  alt = '',
  eager = false,
  thumb = true,
  width = 640,
  className = '',
  ...props
}: OptimizedImageProps) {
  const remoteSrc = thumb && !eager ? toThumbUrl(src) : src
  const displayWidth = thumb && !eager ? Math.min(width, 240) : width
  const imageSrc = resolveImage(remoteSrc, { width: displayWidth, eager })

  return (
    <img
      src={imageSrc}
      alt={alt}
      width={displayWidth}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={eager ? 'high' : 'auto'}
      className={className}
      {...props}
    />
  )
}
