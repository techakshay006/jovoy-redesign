interface ScrollIndicatorProps {
  href: string
  label?: string
  direction?: 'down' | 'up'
  className?: string
}

export function ScrollIndicator({
  href,
  label = 'Scroll',
  direction = 'down',
  className = '',
}: ScrollIndicatorProps) {
  return (
    <a
      href={href}
      className={`scroll-indicator flex min-h-[44px] flex-col items-center justify-center gap-1 px-2 text-jovoy-gold transition-opacity hover:opacity-80 ${className}`}
      aria-label={`Scroll to ${label}`}
    >
      <span className="text-[10px] font-semibold tracking-[0.22em] uppercase">{label}</span>
      <svg
        className={`h-4 w-4 sm:h-5 sm:w-5 ${direction === 'down' ? 'animate-bounce' : ''}`}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden
      >
        {direction === 'down' ? (
          <path d="M12 5v14M6 13l6 6 6-6" />
        ) : (
          <path d="M12 19V5M6 11l6-6 6 6" />
        )}
      </svg>
    </a>
  )
}

export function BackToTop() {
  return (
    <a
      href="#top"
      className="back-to-top-btn fixed z-40 flex h-12 w-12 items-center justify-center rounded-full border border-jovoy-border bg-white text-jovoy-gold shadow-lg transition-all hover:border-jovoy-gold hover:bg-jovoy-gold-pale"
      style={{
        right: 'max(1.5rem, env(safe-area-inset-right))',
      }}
      aria-label="Back to top"
    >
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
        <path d="M12 19V5M6 11l6-6 6 6" />
      </svg>
    </a>
  )
}
