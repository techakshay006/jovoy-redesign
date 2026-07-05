import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ASSETS, accountNavLinks, footerSocialLinks, navLinks, secondaryNavLinks } from '../data/siteData'
import { resolveImage } from '../lib/imageUrl'
import type { SecondaryNavId } from './SecondaryNav'
import { SocialIcon } from './SocialIcon'

interface MobileMenuProps {
  open: boolean
  onClose: () => void
  onSearchOpen: () => void
  onSignInOpen: () => void
  onExploreOpen: (id: SecondaryNavId) => void
}

export function MobileMenu({ open, onClose, onSearchOpen, onSignInOpen, onExploreOpen }: MobileMenuProps) {
  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      if (!document.querySelector('[data-search-open="true"]')) {
        document.body.style.overflow = ''
      }
    }
  }, [open, onClose])

  if (typeof document === 'undefined') return null

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            key="menu-backdrop"
            type="button"
            aria-label="Close menu"
            className="fixed inset-0 z-[80] bg-jovoy-ink/25 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.aside
            key="menu-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            className="fixed inset-y-0 left-0 z-[90] flex w-[min(100%,22rem)] flex-col bg-white shadow-2xl lg:hidden"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.28, ease: 'easeOut' }}
            style={{ paddingTop: 'var(--safe-top)', paddingBottom: 'var(--safe-bottom)' }}
          >
            <div className="flex items-center justify-between border-b border-jovoy-border px-4 py-4">
              <img src={resolveImage(ASSETS.logo, { width: 200, eager: true })} alt="Jovoy" className="h-11" />
              <button
                type="button"
                onClick={onClose}
                className="flex h-11 w-11 items-center justify-center text-2xl text-jovoy-ink"
                aria-label="Close menu"
              >
                ×
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto overscroll-contain p-6">
              <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-jovoy-gold">Shop</p>
              <div className="mt-3 flex flex-col gap-3">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-serif text-xl text-jovoy-ink"
                    onClick={onClose}
                  >
                    {link.label}
                  </a>
                ))}
              </div>

              <div className="my-6 h-px bg-jovoy-border" />

              <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-jovoy-gold">Explore</p>
              <div className="mt-3 flex flex-col gap-3">
                {secondaryNavLinks.map((link) => (
                  <button
                    key={link.label}
                    type="button"
                    onClick={() => {
                      onExploreOpen(link.id)
                      onClose()
                    }}
                    className="text-left font-serif text-lg text-jovoy-ink-soft"
                  >
                    {link.label}
                  </button>
                ))}
              </div>

              <div className="my-6 h-px bg-jovoy-border" />

              <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-jovoy-gold">Your account</p>
              <div className="mt-3 flex flex-col gap-3">
                {accountNavLinks.map((link) =>
                  'action' in link && link.action === 'search' ? (
                    <button
                      key={link.label}
                      type="button"
                      onClick={() => {
                        onClose()
                        onSearchOpen()
                      }}
                      className="text-left font-serif text-lg text-jovoy-gold"
                    >
                      {link.label}
                    </button>
                  ) : link.label === 'Sign in' ? (
                    <button
                      key={link.label}
                      type="button"
                      onClick={() => {
                        onClose()
                        onSignInOpen()
                      }}
                      className="text-left font-serif text-lg text-jovoy-ink-soft"
                    >
                      {link.label}
                    </button>
                  ) : (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-serif text-lg text-jovoy-ink-soft"
                      onClick={onClose}
                    >
                      {link.label}
                    </a>
                  ),
                )}
              </div>

              <div className="my-6 h-px bg-jovoy-border" />

              <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-jovoy-gold">Follow us</p>
              <div className="mt-3 flex items-center gap-3">
                {footerSocialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className="flex h-11 w-11 items-center justify-center transition-opacity hover:opacity-80"
                    onClick={onClose}
                  >
                    <SocialIcon label={link.label} variant="color" className="h-8 w-8 shrink-0" />
                  </a>
                ))}
              </div>
            </nav>
          </motion.aside>
        </>
      )}
    </AnimatePresence>,
    document.body,
  )
}
