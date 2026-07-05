import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { heroSlides } from '../data/siteData'
import { resolveImage } from '../lib/imageUrl'
import { OptimizedImage } from './OptimizedImage'
import { ScrollIndicator } from './ScrollIndicator'
import { PageContainer } from './PageContainer'

export function HeroCarousel({ compact = false }: { compact?: boolean }) {
  const [current, setCurrent] = useState(0)

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % heroSlides.length)
  }, [])

  useEffect(() => {
    const timer = setInterval(next, 6000)
    return () => clearInterval(timer)
  }, [next])

  useEffect(() => {
    heroSlides.forEach((s, i) => {
      if (i === 0) return
      const link = document.createElement('link')
      link.rel = 'prefetch'
      link.as = 'image'
      link.href = resolveImage(s.image, { width: 960, eager: true })
      document.head.appendChild(link)
    })
  }, [])

  const slide = heroSlides[current]

  return (
    <section
      className={`section-cream relative overflow-hidden border-b border-jovoy-border transition-[padding] duration-300 ease-out ${
        compact ? 'py-5 pt-4 lg:py-10' : 'section-y'
      }`}
    >
      <PageContainer className="grid items-center gap-5 sm:gap-6 lg:grid-cols-[3fr_7fr] lg:gap-6">
        <div className={`relative z-10 transition-[padding] duration-300 ${compact ? 'lg:py-4' : 'lg:py-10'}`}>
          <p className="mb-2 text-[10px] font-semibold tracking-[0.28em] uppercase text-jovoy-gold sm:mb-3 sm:text-xs">
            Be Different. Smell Unique.
          </p>
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45 }}
            >
              <h1 className="title-fluid-lg font-serif font-medium leading-[1.08] text-jovoy-ink transition-all duration-300">
                {slide.title}
              </h1>
              <p className="mt-2 font-serif text-base italic text-jovoy-ink-soft transition-all duration-300 sm:mt-3 sm:text-lg lg:text-xl">
                {slide.subtitle}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="mt-5 flex items-center gap-1 sm:mt-6 lg:mt-8">
            {heroSlides.map((s, i) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setCurrent(i)}
                className="flex h-11 min-w-[44px] items-center justify-center"
                aria-label={`Go to slide ${i + 1}`}
              >
                <span className={`block h-1.5 rounded-full transition-all ${i === current ? 'w-8 bg-jovoy-gold sm:w-10' : 'w-3 bg-jovoy-border sm:w-4'}`} />
              </button>
            ))}
          </div>
        </div>

        <div className="relative min-w-0">
          <div className="overflow-hidden rounded-xl border border-jovoy-border/60 bg-jovoy-gold-pale/25 sm:rounded-2xl lg:rounded-3xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.id}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="relative flex w-full items-center justify-center"
              >
                <OptimizedImage
                  src={slide.image}
                  alt={slide.title}
                  eager
                  thumb={false}
                  width={960}
                  className={
                    compact
                      ? 'block h-auto w-full max-h-[min(58vw,280px)] object-contain object-center sm:max-h-[300px] lg:max-h-[260px]'
                      : 'block h-auto w-full max-h-[min(68vw,360px)] object-contain object-center sm:max-h-[380px] md:max-h-[420px] lg:max-h-[440px]'
                  }
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </PageContainer>

      <div className="page-container flex justify-center border-t border-jovoy-border/50 pt-3 sm:pt-4">
        <ScrollIndicator href="#summer" label="Summer collection" />
      </div>
    </section>
  )
}
