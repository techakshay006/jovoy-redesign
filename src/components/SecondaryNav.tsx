import { useEffect, type MouseEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { blogPreview, conceptPreview, contactPreview, secondaryNavLinks } from '../data/siteData'
import { useDemo } from './DemoProvider'
import { DEMO_MODE } from '../lib/demoMode'

export type SecondaryNavId = 'contact' | 'blog' | 'concept'

function prefersHover() {
  return window.matchMedia('(hover: hover)').matches
}

function isLargeScreen() {
  return window.matchMedia('(min-width: 1024px)').matches
}

function ContactPanel() {
  return (
    <div className="grid gap-4 md:grid-cols-[1.2fr_1fr] md:gap-6">
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-jovoy-gold">{contactPreview.eyebrow}</p>
        <h3 className="mt-1 font-serif text-xl text-jovoy-ink">{contactPreview.title}</h3>
        <ul className="mt-3 space-y-2.5">
          {contactPreview.highlights.map((item) => (
            <li key={item.label}>
              <p className="text-[10px] font-semibold uppercase tracking-wide text-jovoy-muted">{item.label}</p>
              <p className="text-sm leading-snug text-jovoy-ink-soft">{item.value}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-xl border border-jovoy-border bg-jovoy-gold-pale/40 p-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-jovoy-gold">What you&apos;ll get</p>
        <ul className="mt-2 space-y-1.5 text-sm text-jovoy-ink-soft">
          <li>Personal guidance from fragrance specialists</li>
          <li>Try-before-you-buy with our Try Me service</li>
          <li>Store directions & consultation booking</li>
        </ul>
        <div className="mt-4 flex flex-wrap gap-2">
          {contactPreview.actions.map((action) => (
            <a
              key={action.label}
              href={action.href}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-jovoy-gold/40 bg-white px-3 py-2 text-[10px] font-semibold uppercase tracking-wide text-jovoy-gold transition-colors hover:bg-jovoy-gold hover:text-white"
            >
              {action.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

function ConceptPanel() {
  return (
    <div className="grid gap-4 md:grid-cols-[1.2fr_1fr] md:gap-6">
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-jovoy-gold">{conceptPreview.eyebrow}</p>
        <h3 className="mt-1 font-serif text-xl text-jovoy-ink">{conceptPreview.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-jovoy-ink-soft">{conceptPreview.description}</p>
        <a
          href={conceptPreview.cta.href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex text-xs font-semibold uppercase tracking-[0.12em] text-jovoy-gold hover:underline"
        >
          {conceptPreview.cta.label} →
        </a>
      </div>
      <div className="rounded-xl border border-jovoy-border bg-jovoy-gold-pale/40 p-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-jovoy-gold">What defines us</p>
        <ul className="mt-3 space-y-3">
          {conceptPreview.highlights.map((item) => (
            <li key={item.label}>
              <p className="text-[10px] font-semibold uppercase tracking-wide text-jovoy-muted">{item.label}</p>
              <p className="text-sm leading-snug text-jovoy-ink-soft">{item.value}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function BlogPanel() {
  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-jovoy-gold">{blogPreview.eyebrow}</p>
      <h3 className="mt-1 font-serif text-xl text-jovoy-ink">{blogPreview.title}</h3>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {blogPreview.posts.map((post) => (
          <a
            key={post.title}
            href={post.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-xl border border-jovoy-border bg-white p-4 transition-colors hover:border-jovoy-gold/50 hover:bg-jovoy-gold-pale/30"
          >
            <p className="font-serif text-base leading-snug text-jovoy-ink group-hover:text-jovoy-gold">{post.title}</p>
            <p className="mt-1.5 text-xs leading-relaxed text-jovoy-muted">{post.teaser}</p>
          </a>
        ))}
      </div>
      <a
        href={blogPreview.cta.href}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex text-xs font-semibold uppercase tracking-[0.12em] text-jovoy-gold hover:underline"
      >
        {blogPreview.cta.label} →
      </a>
    </div>
  )
}

interface SecondaryNavProps {
  active: SecondaryNavId | null
  onActiveChange: (id: SecondaryNavId | null) => void
  onPreviewChange?: (open: boolean) => void
}

export function SecondaryNav({ active, onActiveChange, onPreviewChange }: SecondaryNavProps) {
  const { showDemoPopup } = useDemo()

  const setPreview = (id: SecondaryNavId | null) => {
    onActiveChange(id)
    const shrinkHero = id !== null && isLargeScreen()
    onPreviewChange?.(shrinkHero)
  }

  useEffect(() => {
    const shrinkHero = active !== null && isLargeScreen()
    onPreviewChange?.(shrinkHero)
  }, [active, onPreviewChange])

  const handleLinkClick = (
    link: (typeof secondaryNavLinks)[number],
    e: MouseEvent<HTMLButtonElement>,
  ) => {
    if (prefersHover() && isLargeScreen()) {
      if (DEMO_MODE) {
        showDemoPopup()
        return
      }
      window.open(link.href, '_blank', 'noopener,noreferrer')
      return
    }

    e.preventDefault()
    setPreview(active === link.id ? null : link.id)
  }

  return (
    <nav
      id="secondary-nav"
      aria-label="Secondary navigation"
      className="relative z-40 scroll-mt-[calc(var(--header-offset)+0.5rem)] border-b border-jovoy-border/70 bg-gradient-to-r from-transparent via-jovoy-gold-pale/40 to-transparent"
      onMouseLeave={() => {
        if (prefersHover()) {
          setPreview(null)
        }
      }}
    >
      <div className="page-container">
        <div className="flex items-center justify-center gap-3 overflow-x-auto py-3 scrollbar-hide sm:gap-4 sm:py-3.5 md:gap-6 md:py-4">
          {secondaryNavLinks.map((link, index) => (
            <div key={link.id} className="flex shrink-0 items-center gap-3 sm:gap-4 md:gap-6">
              {index > 0 && <span className="hidden h-4 w-px shrink-0 bg-jovoy-border sm:block" aria-hidden />}
              <button
                type="button"
                className={`group relative min-h-[44px] shrink-0 whitespace-nowrap px-1 font-serif text-sm tracking-wide transition-colors sm:text-base md:text-lg ${
                  active === link.id ? 'text-jovoy-gold' : 'text-jovoy-ink-soft hover:text-jovoy-gold'
                }`}
                onMouseEnter={() => {
                  if (prefersHover()) {
                    setPreview(link.id)
                  }
                }}
                onClick={(e) => handleLinkClick(link, e)}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-1/2 h-px -translate-x-1/2 bg-jovoy-gold transition-all ${
                    active === link.id ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="max-h-[min(280px,40dvh)] overflow-hidden overflow-y-auto border-b border-jovoy-border bg-white/98 shadow-lg backdrop-blur-md"
          >
            <div className="page-container py-5 md:py-6">
              {active === 'contact' ? <ContactPanel /> : active === 'blog' ? <BlogPanel /> : <ConceptPanel />}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
