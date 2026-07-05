import { useEffect, useState, type FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { searchSuggestions } from '../data/siteData'
import { useDemo } from './DemoProvider'
import { DEMO_MODE } from '../lib/demoMode'

function IconSearch() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3-3" />
    </svg>
  )
}

function AnimatedSearchPlaceholder() {
  const [index, setIndex] = useState(0)
  const [display, setDisplay] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const term = searchSuggestions[index]
    let timeout: ReturnType<typeof setTimeout>

    if (!deleting && display.length < term.length) {
      timeout = setTimeout(() => setDisplay(term.slice(0, display.length + 1)), 70)
    } else if (!deleting && display.length === term.length) {
      timeout = setTimeout(() => setDeleting(true), 1800)
    } else if (deleting && display.length > 0) {
      timeout = setTimeout(() => setDisplay(display.slice(0, -1)), 35)
    } else {
      setDeleting(false)
      setIndex((i) => (i + 1) % searchSuggestions.length)
    }

    return () => clearTimeout(timeout)
  }, [display, deleting, index])

  return (
    <span className="pointer-events-none absolute left-12 top-1/2 -translate-y-1/2 truncate text-sm text-jovoy-muted sm:left-14">
      Search for <span className="text-jovoy-gold">{display}</span>
      <span className="ml-0.5 inline-block w-px animate-pulse bg-jovoy-gold" aria-hidden />
    </span>
  )
}

interface HeaderSearchBarProps {
  open: boolean
  onClose: () => void
}

export function HeaderSearchBar({ open, onClose }: HeaderSearchBarProps) {
  const [query, setQuery] = useState('')
  const { showDemoPopup } = useDemo()

  useEffect(() => {
    if (!open) setQuery('')
  }, [open])

  const runSearch = (term: string) => {
    const q = term.trim()
    if (!q) return
    if (DEMO_MODE) {
      showDemoPopup()
      onClose()
      return
    }
    window.open(
      `https://www.jovoyparis.uk/search?controller=search&s=${encodeURIComponent(q)}`,
      '_blank',
      'noopener,noreferrer',
    )
    onClose()
  }

  const handleSearch = (e: FormEvent) => {
    e.preventDefault()
    runSearch(query)
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          data-search-open="true"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="overflow-hidden border-t border-jovoy-border/60 bg-gradient-to-r from-jovoy-gold-pale/30 via-white to-jovoy-gold-pale/20"
        >
          <div className="page-container py-3 sm:py-4">
            <form onSubmit={handleSearch}>
              <div className="rounded-2xl border border-jovoy-gold/25 bg-white p-1 shadow-sm">
                <div className="relative flex items-center gap-2 rounded-xl bg-white px-2 py-1">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center text-jovoy-gold">
                    <IconSearch />
                  </span>
                  <div className="relative min-w-0 flex-1">
                    <input
                      type="search"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      className="min-h-[44px] w-full bg-transparent pr-3 text-sm text-jovoy-ink outline-none"
                      autoFocus
                      aria-label="Search perfumes and brands"
                    />
                    {!query && <AnimatedSearchPlaceholder />}
                  </div>
                  <button
                    type="submit"
                    className="shrink-0 rounded-full bg-jovoy-gold px-4 py-2.5 text-[10px] font-semibold uppercase tracking-wider text-white transition-colors hover:bg-jovoy-gold-light sm:px-5 sm:text-xs"
                  >
                    Search
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex h-10 w-10 shrink-0 items-center justify-center text-xl text-jovoy-muted transition-colors hover:text-jovoy-ink"
                    aria-label="Close search"
                  >
                    ×
                  </button>
                </div>
              </div>
            </form>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-jovoy-muted">Popular:</span>
              {searchSuggestions.slice(0, 6).map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => {
                    setQuery(term)
                    runSearch(term)
                  }}
                  className="rounded-full border border-jovoy-border bg-white px-3 py-1.5 text-xs text-jovoy-ink-soft transition-colors hover:border-jovoy-gold hover:text-jovoy-gold"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
