import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ASSETS, navLinks } from '../data/siteData'
import { resolveImage } from '../lib/imageUrl'
import { HeaderSearchBar } from './HeaderSearchBar'
import { SignInTrigger } from './AuthDialog'

function AccountIcon({ name }: { name: string }) {
  const className = 'h-[18px] w-[18px] lg:h-5 lg:w-5'

  if (name === 'search') {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
        <circle cx="11" cy="11" r="7" />
        <path d="M20 20l-3-3" />
      </svg>
    )
  }
  if (name === 'signin') {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
      </svg>
    )
  }
  if (name === 'wishlist') {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
        <path d="M12 20.5l-1.2-1.1C5.4 14.8 2 11.9 2 8.5A4.5 4.5 0 0 1 6.5 4 5.5 5.5 0 0 1 12 6.7 5.5 5.5 0 0 1 17.5 4 4.5 4.5 0 0 1 22 8.5c0 3.4-3.4 6.3-8.8 10.9L12 20.5z" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="M6 7h12l-1 14H7L6 7z" />
      <path d="M9 7V5a3 3 0 0 1 6 0v2" />
    </svg>
  )
}

interface HeaderProps {
  onMenuOpen: () => void
  onSignInOpen: () => void
  searchOpen: boolean
  onSearchOpen: () => void
  onSearchClose: () => void
  menuOpen?: boolean
}

export function Header({
  onMenuOpen,
  onSignInOpen,
  searchOpen,
  onSearchOpen,
  onSearchClose,
  menuOpen = false,
}: HeaderProps) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const iconButtonClass =
    'flex h-10 w-10 items-center justify-center rounded-full text-jovoy-ink-soft transition-colors hover:bg-jovoy-gold-pale hover:text-jovoy-gold lg:h-11 lg:w-11'

  return (
    <header
      className={`sticky top-0 z-50 border-b border-jovoy-border bg-white/95 backdrop-blur-md transition-shadow ${scrolled ? 'shadow-md' : ''}`}
      style={{ paddingTop: 'var(--safe-top)' }}
    >
      <div className="page-container">
        <div className="flex flex-nowrap items-center gap-2 py-2.5 sm:gap-3 sm:py-3 md:py-4">
          <motion.a
            href="#top"
            className="shrink-0"
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            whileHover={{ scale: 1.03 }}
          >
            <motion.img
              src={resolveImage(ASSETS.logo, { width: 256, eager: true })}
              alt="Jovoy Mayfair"
              className="h-11 w-auto sm:h-14 md:h-16 lg:h-[4.5rem] xl:h-[4.75rem]"
              animate={{ opacity: [1, 0.88, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.a>

          <div className="ml-auto hidden min-w-0 items-center gap-3 md:flex lg:gap-4 xl:gap-5">
            <nav className="flex min-w-0 items-center gap-x-2 overflow-x-auto scrollbar-hide lg:gap-x-4 xl:gap-x-5">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 whitespace-nowrap text-[9px] font-semibold tracking-[0.1em] uppercase text-jovoy-ink-soft transition-colors hover:text-jovoy-gold lg:text-[10px] xl:text-[11px]"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <span className="hidden h-5 w-px shrink-0 bg-jovoy-border lg:block" aria-hidden />

            <nav aria-label="Account" className="flex shrink-0 items-center gap-0.5 lg:gap-1">
            <button
              type="button"
              onClick={() => (searchOpen ? onSearchClose() : onSearchOpen())}
              className={`${iconButtonClass} ${searchOpen ? 'bg-jovoy-gold-pale text-jovoy-gold' : ''}`}
              aria-label="Search"
              aria-expanded={searchOpen}
            >
              <AccountIcon name="search" />
            </button>
            <div className="hidden lg:block">
              <SignInTrigger variant="labeled" onOpen={onSignInOpen} />
            </div>
            <div className="lg:hidden">
              <SignInTrigger variant="icon" onOpen={onSignInOpen} />
            </div>
            <a
              href="https://www.jovoyparis.uk/wishlist"
              target="_blank"
              rel="noopener noreferrer"
              className={iconButtonClass}
              aria-label="Wishlist"
            >
              <span className="wishlist-icon">
                <AccountIcon name="wishlist" />
              </span>
            </a>
            <a
              href="https://www.jovoyparis.uk/cart"
              target="_blank"
              rel="noopener noreferrer"
              className={iconButtonClass}
              aria-label="Cart"
            >
              <AccountIcon name="cart" />
            </a>
            </nav>
          </div>

          {/* Mobile menu trigger */}
          <button
            type="button"
            className="ml-auto flex h-11 w-11 items-center justify-center md:hidden"
            onClick={onMenuOpen}
            aria-label="Open menu"
            aria-expanded={menuOpen}
          >
            <span className="flex flex-col gap-1.5">
              <span className="block h-px w-5 bg-jovoy-ink" />
              <span className="block h-px w-5 bg-jovoy-ink" />
              <span className="block h-px w-5 bg-jovoy-ink" />
            </span>
          </button>

          {/* Tablet menu trigger */}
          <button
            type="button"
            className="hidden h-11 w-11 items-center justify-center lg:hidden md:flex"
            onClick={onMenuOpen}
            aria-label="Open menu"
            aria-expanded={menuOpen}
          >
            <span className="flex flex-col gap-1.5">
              <span className="block h-px w-5 bg-jovoy-ink" />
              <span className="block h-px w-5 bg-jovoy-ink" />
              <span className="block h-px w-5 bg-jovoy-ink" />
            </span>
          </button>
        </div>
      </div>

      <HeaderSearchBar open={searchOpen} onClose={onSearchClose} />
    </header>
  )
}
