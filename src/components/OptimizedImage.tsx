import { useRef, type ImgHTMLAttributes } from 'react'
import { toThumbUrl } from '../data/siteData'

interface OptimizedImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src: string
  eager?: boolean
  thumb?: boolean
}

export function OptimizedImage({
  src,
  alt = '',
  eager = false,
  thumb = true,
  className = '',
  ...props
}: OptimizedImageProps) {
  const loaded = useRef(false)
  const imageSrc = thumb && !eager ? toThumbUrl(src) : src

  return (
    <img
      src={imageSrc}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={eager ? 'high' : 'auto'}
      className={className}
      onLoad={() => {
        loaded.current = true
      }}
      {...props}
    />
  )
}
