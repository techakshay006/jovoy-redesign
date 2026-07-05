import { useRef, useState, type MouseEvent } from 'react'
import type { Product } from '../data/siteData'
import { OptimizedImage } from './OptimizedImage'

interface ProductCardProps {
  product: Product
  eager?: boolean
  compact?: boolean
}

export function ProductCard({ product, eager = false, compact = false }: ProductCardProps) {
  const cardRef = useRef<HTMLElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const handleMove = (e: MouseEvent) => {
    if (!cardRef.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = ((e.clientY - rect.top) / rect.height - 0.5) * -5
    const y = ((e.clientX - rect.left) / rect.width - 0.5) * 5
    setTilt({ x, y })
  }

  const resetTilt = () => setTilt({ x: 0, y: 0 })

  return (
    <article
      ref={cardRef}
      className="perspective-scene group h-full"
      onMouseMove={handleMove}
      onMouseLeave={resetTilt}
    >
      <div
        className={`card-3d flex h-full flex-col overflow-hidden rounded-xl border border-jovoy-border bg-white shadow-sm sm:rounded-2xl ${
          compact ? 'min-h-0' : 'min-h-[340px] sm:min-h-[360px] lg:min-h-[400px]'
        }`}
        style={{ transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
      >
        <div className="relative shrink-0">
          <a href={product.link} target="_blank" rel="noopener noreferrer" className="relative block">
            <div className="absolute inset-x-0 top-0 z-10 flex flex-nowrap items-start justify-between gap-2 p-2.5">
              <div className="flex min-w-0 flex-nowrap items-center gap-1.5 overflow-hidden">
                {product.tags?.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="shrink-0 whitespace-nowrap rounded-full border border-jovoy-gold/30 bg-white/90 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-jovoy-gold shadow-sm backdrop-blur-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              {product.tryMe && (
                <span className="shrink-0 whitespace-nowrap rounded-full bg-jovoy-gold px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white shadow-sm">
                  Try me
                </span>
              )}
            </div>

            <div className="relative aspect-[3/4] w-full overflow-hidden bg-white">
              <OptimizedImage
                src={product.image}
                alt={product.name}
                eager={eager}
                thumb
                width={420}
                className="absolute inset-0 h-full w-full scale-[1.14] object-cover object-center transition-transform duration-500 group-hover:scale-[1.2]"
              />
            </div>
          </a>
        </div>

        <div className={`flex flex-1 flex-col bg-white ${compact ? 'p-3' : 'p-4'}`}>
          {product.families && (
            <p className="truncate text-[10px] font-semibold tracking-[0.12em] uppercase text-jovoy-gold">
              {product.families}
            </p>
          )}
          <h3 className={`mt-1 line-clamp-2 font-serif leading-tight text-jovoy-ink ${compact ? 'min-h-[2.25rem] text-sm' : 'min-h-[2.75rem] text-base'}`}>
            <a href={product.link} target="_blank" rel="noopener noreferrer" className="hover:text-jovoy-gold">
              {product.name}
            </a>
          </h3>
          <p className="mt-0.5 truncate text-xs uppercase tracking-wide text-jovoy-muted">{product.brand}</p>

          {product.notes && !compact && (
            <p className="mt-2 line-clamp-2 text-[11px] leading-snug text-jovoy-ink-soft">
              {product.notes.head} · {product.notes.heart} · {product.notes.base}
            </p>
          )}

          <div className={`mt-auto flex items-center justify-between gap-2 ${compact ? 'pt-2' : 'pt-3'}`}>
            <span className={`font-serif text-jovoy-gold ${compact ? 'text-base' : 'text-lg'}`}>{product.price}</span>
            <a
              href={product.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`shrink-0 whitespace-nowrap rounded-full font-semibold uppercase tracking-wide transition-colors ${
                compact ? 'px-3 py-2 text-[9px]' : 'px-4 py-2.5 text-[10px]'
              } ${
                product.outOfStock
                  ? 'bg-jovoy-surface-2 text-jovoy-muted'
                  : 'border border-jovoy-gold bg-jovoy-gold-pale text-jovoy-gold hover:bg-jovoy-gold hover:text-white'
              }`}
            >
              {product.outOfStock ? 'Sold Out' : 'Shop'}
            </a>
          </div>
        </div>
      </div>
    </article>
  )
}
