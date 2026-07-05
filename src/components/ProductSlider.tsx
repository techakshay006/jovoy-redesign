import { useRef, useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import type { Product } from '../data/siteData'
import { ProductCard } from './ProductCard'
import { useMediaQuery, useVisibleCount } from '../hooks/useMediaQuery'

interface ProductSliderProps {
  products: Product[]
}

function getPageMetrics(track: HTMLDivElement) {
  const card = track.querySelector<HTMLElement>('[data-slide-card]')
  const cardWidth = card?.offsetWidth ?? 280
  const gap = parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap || '12') || 12
  return { cardWidth, gap }
}

function NavArrow({
  direction,
  disabled,
  onClick,
}: {
  direction: 'prev' | 'next'
  disabled: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-jovoy-border bg-white text-base shadow-sm transition-colors hover:border-jovoy-gold hover:text-jovoy-gold disabled:pointer-events-none disabled:opacity-30 sm:h-10 sm:w-10 sm:text-lg"
      aria-label={direction === 'prev' ? 'Previous products' : 'Next products'}
    >
      {direction === 'prev' ? '←' : '→'}
    </button>
  )
}

export function ProductSlider({ products }: ProductSliderProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [page, setPage] = useState(0)
  const visible = useVisibleCount()
  const isMobile = useMediaQuery('(max-width: 639px)')

  const maxPage = Math.max(0, Math.ceil(products.length / visible) - 1)

  const scrollToPage = useCallback(
    (next: number) => {
      const clamped = Math.max(0, Math.min(next, maxPage))
      setPage(clamped)
      const track = trackRef.current
      if (!track) return
      const { cardWidth, gap } = getPageMetrics(track)
      track.scrollTo({ left: clamped * visible * (cardWidth + gap), behavior: 'smooth' })
    },
    [maxPage, visible],
  )

  useEffect(() => {
    if (page > maxPage) setPage(maxPage)
  }, [page, maxPage])

  return (
    <div className="relative">
      <div className="flex items-center gap-1.5 sm:gap-2">
        <NavArrow direction="prev" disabled={page === 0} onClick={() => scrollToPage(page - 1)} />

        <div className="min-w-0 flex-1">
          <div
            ref={trackRef}
            className="scroll-row product-scroll-row gap-3 pb-1 sm:gap-4"
            onScroll={() => {
              const track = trackRef.current
              if (!track) return
              const { cardWidth, gap } = getPageMetrics(track)
              const pageWidth = visible * (cardWidth + gap)
              const p = Math.round(track.scrollLeft / Math.max(pageWidth, 1))
              setPage(Math.max(0, Math.min(p, maxPage)))
            }}
          >
            {products.map((product, i) => (
              <motion.div
                key={product.id}
                data-slide-card
                className="snap-card min-w-0"
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ duration: 0.35, delay: (i % visible) * 0.04 }}
              >
                <ProductCard product={product} eager={i < 4} compact={isMobile} />
              </motion.div>
            ))}
          </div>
        </div>

        <NavArrow direction="next" disabled={page >= maxPage} onClick={() => scrollToPage(page + 1)} />
      </div>

      <div className="mt-4 flex items-center justify-center gap-3 sm:mt-5">
        {isMobile ? (
          <span className="min-w-[4.5rem] text-center text-xs tabular-nums text-jovoy-muted sm:text-sm">
            {page + 1} / {maxPage + 1}
          </span>
        ) : (
          <div className="flex max-w-[min(100%,20rem)] flex-wrap items-center justify-center gap-1">
            {Array.from({ length: maxPage + 1 }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => scrollToPage(i)}
                className="flex h-9 w-9 items-center justify-center sm:h-10 sm:w-10"
                aria-label={`Slide page ${i + 1}`}
              >
                <span
                  className={`block h-1.5 rounded-full transition-all sm:h-2 ${
                    i === page ? 'w-7 bg-jovoy-gold sm:w-8' : 'w-1.5 bg-jovoy-border hover:bg-jovoy-gold/50 sm:w-2'
                  }`}
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {isMobile && (
        <p className="mt-2 text-center text-[10px] tracking-wide text-jovoy-muted">Swipe to browse</p>
      )}
    </div>
  )
}
