import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { testimonials } from '../data/siteData'
import { ScrollIndicator } from './ScrollIndicator'
import { PageContainer } from './PageContainer'
import { useMediaQuery } from '../hooks/useMediaQuery'

const AUTO_INTERVAL = 6000
const RESUME_DELAY = 3000

export function Testimonials3D() {
  const [index, setIndex] = useState(0)
  const [autoPlay, setAutoPlay] = useState(true)
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isMobile = useMediaQuery('(max-width: 639px)')
  const count = testimonials.length

  const prev = () => setIndex((i) => (i - 1 + count) % count)
  const next = () => setIndex((i) => (i + 1) % count)

  const visibleCount = isMobile ? 1 : 2
  const visible = [testimonials[index]]
  if (!isMobile) {
    visible.push(testimonials[(index + 1) % count])
  }

  const pauseAutoPlay = () => {
    if (resumeTimerRef.current) {
      clearTimeout(resumeTimerRef.current)
      resumeTimerRef.current = null
    }
    setAutoPlay(false)
  }

  const scheduleResume = () => {
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current)
    resumeTimerRef.current = setTimeout(() => {
      setAutoPlay(true)
      resumeTimerRef.current = null
    }, RESUME_DELAY)
  }

  useEffect(() => {
    return () => {
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current)
    }
  }, [])

  useEffect(() => {
    if (!autoPlay) return
    const timer = setInterval(() => setIndex((i) => (i + 1) % count), AUTO_INTERVAL)
    return () => clearInterval(timer)
  }, [autoPlay, count])

  return (
    <section id="testimonials" className="relative section-cream border-b border-jovoy-border section-y">
      <PageContainer>
        <div className="mb-8 text-center sm:mb-10">
          <p className="text-xs font-semibold tracking-[0.3em] uppercase text-jovoy-gold">Voices</p>
          <h2 className="title-fluid-lg mt-2 font-serif font-medium text-jovoy-ink">What Our Clients Say</h2>
        </div>

        <div
          className="relative"
          onMouseEnter={pauseAutoPlay}
          onMouseLeave={scheduleResume}
          onFocus={pauseAutoPlay}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node)) scheduleResume()
          }}
        >
          <div className="hidden sm:block">
            <button
              type="button"
              onClick={prev}
              className="absolute -left-1 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-jovoy-border bg-white text-lg shadow-md hover:border-jovoy-gold hover:text-jovoy-gold md:-left-2"
              aria-label="Previous testimonials"
            >
              ←
            </button>
            <button
              type="button"
              onClick={next}
              className="absolute -right-1 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-jovoy-border bg-white text-lg shadow-md hover:border-jovoy-gold hover:text-jovoy-gold md:-right-2"
              aria-label="Next testimonials"
            >
              →
            </button>
          </div>

          <div className="overflow-hidden px-0 sm:px-10 md:px-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${index}-${visibleCount}`}
                initial={{ opacity: 0, x: 32 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -32 }}
                transition={{ duration: 0.4 }}
                className={`grid gap-4 ${isMobile ? 'grid-cols-1' : 'grid-cols-2 md:gap-6'}`}
              >
                {visible.map((item) => (
                  <article
                    key={item.id}
                    className="rounded-2xl border border-jovoy-border bg-white p-5 shadow-md sm:p-6 md:p-8"
                  >
                    <span className="font-serif text-4xl leading-none text-jovoy-gold/40">&ldquo;</span>
                    <p className="mt-2 font-serif text-base leading-relaxed text-jovoy-ink md:text-lg">{item.quote}</p>
                    <footer className="mt-5 border-t border-jovoy-border pt-4">
                      <p className="font-semibold text-jovoy-ink">{item.author}</p>
                      <p className="text-sm text-jovoy-muted">{item.detail}</p>
                    </footer>
                  </article>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-5 flex items-center justify-center gap-3 sm:mt-6">
            <button
              type="button"
              onClick={prev}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-jovoy-border bg-white text-lg shadow-sm hover:border-jovoy-gold hover:text-jovoy-gold sm:hidden"
              aria-label="Previous testimonials"
            >
              ←
            </button>

            {isMobile ? (
              <span className="min-w-[4rem] text-center text-sm tabular-nums text-jovoy-muted">
                {index + 1} / {count}
              </span>
            ) : (
              <div className="flex items-center gap-1">
                {testimonials.map((t, i) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setIndex(i)}
                    className="flex h-11 w-11 items-center justify-center"
                    aria-label={`Testimonial ${i + 1}`}
                  >
                    <span
                      className={`block h-2 rounded-full transition-all ${
                        i === index ? 'w-8 bg-jovoy-gold' : 'w-2 bg-jovoy-border hover:bg-jovoy-gold/50'
                      }`}
                    />
                  </button>
                ))}
              </div>
            )}

            <button
              type="button"
              onClick={next}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-jovoy-border bg-white text-lg shadow-sm hover:border-jovoy-gold hover:text-jovoy-gold sm:hidden"
              aria-label="Next testimonials"
            >
              →
            </button>
          </div>
        </div>
      </PageContainer>
      <div className="page-container flex justify-center border-t border-jovoy-border/40 pt-3 sm:pt-4">
        <ScrollIndicator href="#discover" label="Find your scent" />
      </div>
    </section>
  )
}
