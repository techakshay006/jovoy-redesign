import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type FormEvent,
  type MouseEvent,
  type ReactNode,
} from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { DEMO_MODE, DEMO_NOTICE, DEMO_POPUP, isAllowedInDemo } from '../lib/demoMode'

interface DemoContextValue {
  showDemoPopup: () => void
}

const DemoContext = createContext<DemoContextValue | null>(null)

export function useDemo() {
  const ctx = useContext(DemoContext)
  if (!ctx) {
    return { showDemoPopup: () => undefined, demoMode: false }
  }
  return { ...ctx, demoMode: DEMO_MODE }
}

export function DemoBanner({ className = '' }: { className?: string }) {
  if (!DEMO_MODE) return null

  return (
    <div
      className={`border-b border-amber-200/80 bg-amber-50 px-4 py-2 text-center text-[11px] font-medium tracking-wide text-amber-900 sm:text-xs ${className}`}
      role="status"
    >
      {DEMO_NOTICE} — preview only, not connected to the live Jovoy website.
    </div>
  )
}

function DemoPopupIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l3.5 2" />
      <circle cx="12" cy="12" r="9" />
      <path strokeLinecap="round" d="M8 3h8M9 21h6" opacity="0.45" />
    </svg>
  )
}

function DemoPopup({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (typeof document === 'undefined') return null

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            type="button"
            aria-label="Close demo notice"
            className="fixed inset-0 z-[100] bg-jovoy-ink/45 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <div className="pointer-events-none fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div
              role="alertdialog"
              aria-modal="true"
              aria-labelledby="demo-popup-title"
              className="pointer-events-auto w-full max-w-sm rounded-2xl border border-jovoy-border bg-white p-6 text-center shadow-2xl"
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-jovoy-gold-pale text-jovoy-gold">
                <DemoPopupIcon />
              </div>
              <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-jovoy-gold">{DEMO_NOTICE}</p>
              <h2 id="demo-popup-title" className="mt-2 font-serif text-xl text-jovoy-ink">
                {DEMO_POPUP.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-jovoy-ink-soft">{DEMO_POPUP.message}</p>
              <p className="mt-3 text-sm font-medium text-jovoy-gold">{DEMO_POPUP.thanks}</p>
              <p className="mt-2 text-xs text-jovoy-muted">{DEMO_POPUP.note}</p>
              <button
                type="button"
                onClick={onClose}
                className="mt-5 w-full rounded-full bg-jovoy-gold px-4 py-3 text-xs font-semibold uppercase tracking-wide text-white transition-colors hover:bg-jovoy-gold-light"
              >
                Got it
              </button>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>,
    document.body,
  )
}

export function DemoProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)

  const showDemoPopup = useCallback(() => {
    if (!DEMO_MODE) return
    setOpen(true)
  }, [])

  useEffect(() => {
    if (!DEMO_MODE) return

    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as Element | null)?.closest('a[href]') as HTMLAnchorElement | null
      if (!anchor) return
      if (anchor.dataset.demoAllow === 'true') return
      const href = anchor.getAttribute('href')
      if (isAllowedInDemo(href)) return
      e.preventDefault()
      e.stopPropagation()
      showDemoPopup()
    }

    const onSubmit = (e: Event) => {
      const form = e.target as HTMLFormElement | null
      if (!form || form.tagName !== 'FORM') return
      if (form.dataset.demoAllow === 'true') return
      const action = form.getAttribute('action')
      if (action && isAllowedInDemo(action)) return
      if (!action || action.startsWith('http')) {
        e.preventDefault()
        e.stopPropagation()
        showDemoPopup()
      }
    }

    document.addEventListener('click', onClick as unknown as EventListener, true)
    document.addEventListener('submit', onSubmit, true)
    return () => {
      document.removeEventListener('click', onClick as unknown as EventListener, true)
      document.removeEventListener('submit', onSubmit, true)
    }
  }, [showDemoPopup])

  return (
    <DemoContext.Provider value={{ showDemoPopup }}>
      {children}
      <DemoPopup open={open} onClose={() => setOpen(false)} />
    </DemoContext.Provider>
  )
}

/** Call from handlers (search, auth, etc.) when demo mode should block an action. */
export function blockDemoAction(
  showDemoPopup: () => void,
  e?: FormEvent | MouseEvent | { preventDefault?: () => void },
): boolean {
  if (!DEMO_MODE) return false
  e?.preventDefault?.()
  showDemoPopup()
  return true
}
