function NavIcon({ name }: { name: string }) {
  const className = 'h-5 w-5'

  if (name === 'home') {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
        <path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-9.5z" />
      </svg>
    )
  }
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
      <svg viewBox="0 0 24 24" className={`${className} wishlist-icon`} fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
        <path d="M12 20.5l-1.2-1.1C5.4 14.8 2 11.9 2 8.5A4.5 4.5 0 0 1 6.5 4 5.5 5.5 0 0 1 12 6.7 5.5 5.5 0 0 1 17.5 4 4.5 4.5 0 0 1 22 8.5c0 3.4-3.4 6.3-8.8 10.9L12 20.5z" />
      </svg>
    )
  }
  if (name === 'cart') {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
        <path d="M6 7h12l-1 14H7L6 7z" />
        <path d="M9 7V5a3 3 0 0 1 6 0v2" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  )
}

interface AppBottomNavProps {
  onSearch: () => void
  onSignIn: () => void
  onMenu: () => void
}

export function AppBottomNav({ onSearch, onSignIn, onMenu }: AppBottomNavProps) {
  const items = [
    { id: 'search', label: 'Search', icon: 'search', action: onSearch },
    { id: 'signin', label: 'Sign in', icon: 'signin', action: onSignIn },
    { id: 'wishlist', label: 'Wishlist', href: 'https://www.jovoyparis.uk/wishlist', icon: 'wishlist' },
    { id: 'cart', label: 'Cart', href: 'https://www.jovoyparis.uk/cart', icon: 'cart' },
    { id: 'menu', label: 'Menu', icon: 'menu', action: onMenu },
  ] as const

  return (
    <nav
      aria-label="App navigation"
      className="app-bottom-nav fixed inset-x-0 bottom-0 z-50 border-t border-jovoy-border bg-white/95 backdrop-blur-md md:hidden"
    >
      <div className="grid grid-cols-5">
        {items.map((item) => {
          const content = (
            <>
              <NavIcon name={item.icon} />
              <span className="text-[9px] font-semibold tracking-wide">{item.label}</span>
            </>
          )

          const className =
            'flex min-h-[56px] flex-col items-center justify-center gap-0.5 px-1 text-jovoy-ink-soft transition-colors hover:text-jovoy-gold active:text-jovoy-gold'

          if ('action' in item) {
            return (
              <button key={item.id} type="button" onClick={item.action} className={className}>
                {content}
              </button>
            )
          }

          return (
            <a
              key={item.id}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className={className}
            >
              {content}
            </a>
          )
        })}
      </div>
    </nav>
  )
}
