import { useEffect, useId, useState, type FormEvent } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { AUTH_LINKS } from '../data/siteData'
import { blockDemoAction, useDemo } from './DemoProvider'
import { DEMO_MODE, DEMO_NOTICE } from '../lib/demoMode'

type AuthMode = 'signin' | 'signup' | 'forgot'

function GoogleLogo() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] shrink-0" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  )
}

function AppleLogo() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] shrink-0 fill-white" aria-hidden="true">
      <path d="M16.7 12.7c0-2.2 1.8-3.3 1.9-3.4-1-1.5-2.6-1.7-3.2-1.7-1.4-.1-2.7.8-3.4.8-.7 0-1.8-.8-3-.8-1.5 0-3 .9-3.8 2.3-1.6 2.8-.4 7 1.2 9.3.8 1.1 1.7 2.4 2.9 2.3 1.2 0 1.6-.8 3-.8s1.8.8 3 .8c1.2 0 2-1.1 2.8-2.2.9-1.3 1.2-2.5 1.2-2.6-.1 0-2.4-.9-2.4-3.6zm-2.2-6.6c.7-.8 1.1-1.9 1-3-.9.1-2.1.6-2.8 1.4-.6.7-1.2 1.9-1 3 1 .1 2-.4 2.8-1.4z" />
    </svg>
  )
}

function GoogleSignInButton({ href, mode }: { href: string; mode: AuthMode }) {
  const label = mode === 'signup' ? 'Sign up with Google' : 'Sign in with Google'

  return (
    <a
      href={href}
      className="flex h-10 w-full items-center justify-center gap-3 rounded border border-[#747775] bg-white px-3 text-sm font-medium text-[#1f1f1f] shadow-sm transition-colors hover:bg-[#f8f9fa] active:bg-[#f1f3f4]"
      style={{ fontFamily: 'Roboto, Inter, sans-serif' }}
    >
      <GoogleLogo />
      <span>{label}</span>
    </a>
  )
}

function AppleSignInButton({ href, mode }: { href: string; mode: AuthMode }) {
  const label = mode === 'signup' ? 'Sign up with Apple' : 'Sign in with Apple'

  return (
    <a
      href={href}
      className="flex h-10 w-full items-center justify-center gap-2.5 rounded bg-black px-3 text-sm font-medium text-white transition-colors hover:bg-[#1a1a1a] active:bg-[#2d2d2d]"
      style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", Inter, sans-serif' }}
    >
      <AppleLogo />
      <span>{label}</span>
    </a>
  )
}

function EyeIcon({ open }: { open: boolean }) {
  if (open) {
    return (
      <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
        <path d="M3 3l18 18M10.5 10.7a2 2 0 002.8 2.8M6.9 6.9C4.6 8.4 3 10.5 3 12s3 6 9 6c1.4 0 2.7-.3 3.9-.8M14.1 14.1c-.5.5-1.2.9-2.1.9-1.7 0-3-1.3-3-3 0-.9.4-1.6.9-2.1" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

interface FieldProps {
  id: string
  label: string
  type?: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  autoComplete?: string
  required?: boolean
  showToggle?: boolean
  visible?: boolean
  onToggleVisible?: () => void
}

function Field({
  id,
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  autoComplete,
  required = true,
  showToggle,
  visible,
  onToggleVisible,
}: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-jovoy-muted">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          name={id}
          type={showToggle ? (visible ? 'text' : 'password') : type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required={required}
          className="w-full rounded-xl border border-jovoy-border bg-white px-4 py-3 pr-11 text-sm text-jovoy-ink outline-none transition-colors placeholder:text-jovoy-muted/70 focus:border-jovoy-gold focus:ring-2 focus:ring-jovoy-gold/20"
        />
        {showToggle && onToggleVisible && (
          <button
            type="button"
            onClick={onToggleVisible}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-jovoy-muted transition-colors hover:text-jovoy-ink"
            aria-label={visible ? 'Hide password' : 'Show password'}
          >
            <EyeIcon open={!!visible} />
          </button>
        )}
      </div>
    </div>
  )
}

interface AuthDialogProps {
  open: boolean
  onClose: () => void
}

const emptyForm = {
  email: '',
  password: '',
  confirmPassword: '',
  firstName: '',
  lastName: '',
}

export function AuthDialog({ open, onClose }: AuthDialogProps) {
  const formId = useId()
  const { showDemoPopup } = useDemo()
  const [mode, setMode] = useState<AuthMode>('signin')
  const [form, setForm] = useState(emptyForm)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!open) return
    setMode('signin')
    setForm(emptyForm)
    setShowPassword(false)
    setShowConfirmPassword(false)
    setError('')
  }, [open])

  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      if (!document.querySelector('[data-search-open="true"]') && !document.querySelector('[data-menu-open="true"]')) {
        document.body.style.overflow = ''
      }
    }
  }, [open, onClose])

  const setField = (key: keyof typeof form) => (value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }))
    if (error) setError('')
  }

  const submitToJovoy = (action: string, fields: Record<string, string>) => {
    if (DEMO_MODE) {
      showDemoPopup()
      return
    }
    const formEl = document.createElement('form')
    formEl.method = 'POST'
    formEl.action = action
    formEl.style.display = 'none'

    Object.entries(fields).forEach(([name, value]) => {
      const input = document.createElement('input')
      input.type = 'hidden'
      input.name = name
      input.value = value
      formEl.appendChild(input)
    })

    document.body.appendChild(formEl)
    formEl.submit()
  }

  const handleSignIn = (e: FormEvent) => {
    e.preventDefault()
    if (blockDemoAction(showDemoPopup, e)) return
    if (!form.email.trim() || !form.password) {
      setError('Please enter your email and password.')
      return
    }
    submitToJovoy(AUTH_LINKS.signIn, {
      email: form.email.trim(),
      password: form.password,
      submitLogin: '1',
    })
  }

  const handleSignUp = (e: FormEvent) => {
    e.preventDefault()
    if (blockDemoAction(showDemoPopup, e)) return
    if (!form.firstName.trim() || !form.lastName.trim()) {
      setError('Please enter your first and last name.')
      return
    }
    if (!form.email.trim()) {
      setError('Please enter your email address.')
      return
    }
    if (form.password.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.')
      return
    }
    submitToJovoy(AUTH_LINKS.signUp, {
      firstname: form.firstName.trim(),
      lastname: form.lastName.trim(),
      email: form.email.trim(),
      password: form.password,
      submitCreate: '1',
    })
  }

  const handleForgot = (e: FormEvent) => {
    e.preventDefault()
    if (blockDemoAction(showDemoPopup, e)) return
    if (!form.email.trim()) {
      setError('Please enter the email for your account.')
      return
    }
    submitToJovoy(AUTH_LINKS.forgotPassword, {
      email: form.email.trim(),
      submitRecover: '1',
    })
  }

  if (typeof document === 'undefined') return null

  const titles: Record<AuthMode, { title: string; subtitle: string }> = {
    signin: { title: 'Welcome back', subtitle: 'Sign in to your Jovoy account' },
    signup: { title: 'Create account', subtitle: 'Join Jovoy Mayfair' },
    forgot: { title: 'Reset password', subtitle: 'We will email you a reset link' },
  }

  const { title, subtitle } = titles[mode]

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            type="button"
            aria-label="Close sign in dialog"
            className="fixed inset-0 z-[80] bg-jovoy-ink/40 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="auth-dialog-title"
            className="fixed inset-x-4 top-[max(1.5rem,var(--safe-top))] z-[90] mx-auto flex max-h-[min(90dvh,calc(100dvh-2rem))] w-full max-w-md flex-col overflow-hidden rounded-2xl border border-jovoy-border bg-white shadow-2xl sm:inset-x-auto sm:left-1/2 sm:top-1/2 sm:max-h-[min(88dvh,720px)] sm:-translate-x-1/2 sm:-translate-y-1/2"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
          >
            <div className="flex shrink-0 items-center justify-between border-b border-jovoy-border px-5 py-4">
              <div>
                <p id="auth-dialog-title" className="font-serif text-xl text-jovoy-ink">
                  {title}
                </p>
                <p className="mt-0.5 text-sm text-jovoy-muted">{subtitle}</p>
                {DEMO_MODE && (
                  <p className="mt-1 text-[10px] font-medium uppercase tracking-wide text-amber-700">{DEMO_NOTICE}</p>
                )}
              </div>
              <button
                type="button"
                onClick={onClose}
                className="flex h-10 w-10 items-center justify-center rounded-full text-2xl text-jovoy-muted transition-colors hover:bg-jovoy-gold-pale hover:text-jovoy-ink"
                aria-label="Close"
              >
                ×
              </button>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5">
              {mode !== 'forgot' && (
                <div className="mb-5 grid grid-cols-2 gap-1 rounded-full border border-jovoy-border bg-jovoy-surface p-1">
                  <button
                    type="button"
                    onClick={() => {
                      setMode('signin')
                      setError('')
                    }}
                    className={`rounded-full px-3 py-2.5 text-xs font-semibold uppercase tracking-wide transition-colors ${
                      mode === 'signin'
                        ? 'bg-jovoy-gold text-white shadow-sm'
                        : 'text-jovoy-muted hover:text-jovoy-ink'
                    }`}
                  >
                    Sign in
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMode('signup')
                      setError('')
                    }}
                    className={`rounded-full px-3 py-2.5 text-xs font-semibold uppercase tracking-wide transition-colors ${
                      mode === 'signup'
                        ? 'bg-jovoy-gold text-white shadow-sm'
                        : 'text-jovoy-muted hover:text-jovoy-ink'
                    }`}
                  >
                    Sign up
                  </button>
                </div>
              )}

              {mode === 'signin' && (
                <form id={`${formId}-signin`} onSubmit={handleSignIn} className="space-y-4">
                  <Field
                    id="email"
                    label="Email"
                    type="email"
                    value={form.email}
                    onChange={setField('email')}
                    placeholder="yours@email.com"
                    autoComplete="email"
                  />
                  <Field
                    id="password"
                    label="Password"
                    value={form.password}
                    onChange={setField('password')}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    showToggle
                    visible={showPassword}
                    onToggleVisible={() => setShowPassword((v) => !v)}
                  />
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => {
                        setMode('forgot')
                        setError('')
                      }}
                      className="text-xs font-medium text-jovoy-gold transition-colors hover:text-jovoy-gold-light"
                    >
                      Forgot your password?
                    </button>
                  </div>
                  {error && <p className="text-sm text-red-600">{error}</p>}
                  <button
                    type="submit"
                    className="w-full rounded-full bg-jovoy-gold px-4 py-3.5 text-xs font-semibold uppercase tracking-wide text-white transition-colors hover:bg-jovoy-gold-light"
                  >
                    Sign in
                  </button>
                </form>
              )}

              {mode === 'signup' && (
                <form id={`${formId}-signup`} onSubmit={handleSignUp} className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <Field
                      id="firstname"
                      label="First name"
                      value={form.firstName}
                      onChange={setField('firstName')}
                      placeholder="Jane"
                      autoComplete="given-name"
                    />
                    <Field
                      id="lastname"
                      label="Last name"
                      value={form.lastName}
                      onChange={setField('lastName')}
                      placeholder="Smith"
                      autoComplete="family-name"
                    />
                  </div>
                  <Field
                    id="email"
                    label="Email"
                    type="email"
                    value={form.email}
                    onChange={setField('email')}
                    placeholder="yours@email.com"
                    autoComplete="email"
                  />
                  <Field
                    id="password"
                    label="Password"
                    value={form.password}
                    onChange={setField('password')}
                    placeholder="At least 8 characters"
                    autoComplete="new-password"
                    showToggle
                    visible={showPassword}
                    onToggleVisible={() => setShowPassword((v) => !v)}
                  />
                  <Field
                    id="confirmPassword"
                    label="Confirm password"
                    value={form.confirmPassword}
                    onChange={setField('confirmPassword')}
                    placeholder="Re-enter your password"
                    autoComplete="new-password"
                    showToggle
                    visible={showConfirmPassword}
                    onToggleVisible={() => setShowConfirmPassword((v) => !v)}
                  />
                  {error && <p className="text-sm text-red-600">{error}</p>}
                  <button
                    type="submit"
                    className="w-full rounded-full bg-jovoy-gold px-4 py-3.5 text-xs font-semibold uppercase tracking-wide text-white transition-colors hover:bg-jovoy-gold-light"
                  >
                    Create account
                  </button>
                </form>
              )}

              {mode === 'forgot' && (
                <form id={`${formId}-forgot`} onSubmit={handleForgot} className="space-y-4">
                  <p className="text-sm leading-relaxed text-jovoy-ink-soft">
                    Enter the email address linked to your account. We will send you instructions to reset your password.
                  </p>
                  <Field
                    id="email"
                    label="Email"
                    type="email"
                    value={form.email}
                    onChange={setField('email')}
                    placeholder="yours@email.com"
                    autoComplete="email"
                  />
                  {error && <p className="text-sm text-red-600">{error}</p>}
                  <button
                    type="submit"
                    className="w-full rounded-full bg-jovoy-gold px-4 py-3.5 text-xs font-semibold uppercase tracking-wide text-white transition-colors hover:bg-jovoy-gold-light"
                  >
                    Send reset link
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMode('signin')
                      setError('')
                    }}
                    className="w-full text-center text-xs font-medium text-jovoy-muted transition-colors hover:text-jovoy-gold"
                  >
                    Back to sign in
                  </button>
                </form>
              )}

              {mode !== 'forgot' && (
                <>
                  <div className="my-5 flex items-center gap-3">
                    <span className="h-px flex-1 bg-jovoy-border" />
                    <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-jovoy-muted">Or continue with</span>
                    <span className="h-px flex-1 bg-jovoy-border" />
                  </div>

                  <div className="space-y-2.5">
                    <GoogleSignInButton href={AUTH_LINKS.google} mode={mode} />
                    <AppleSignInButton href={AUTH_LINKS.apple} mode={mode} />
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body,
  )
}

interface SignInTriggerProps {
  variant?: 'icon' | 'labeled'
  onOpen: () => void
}

export function SignInTrigger({ variant = 'labeled', onOpen }: SignInTriggerProps) {
  const triggerClass =
    variant === 'labeled'
      ? 'flex items-center gap-1.5 rounded-full px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-jovoy-ink-soft transition-colors hover:bg-jovoy-gold-pale hover:text-jovoy-gold xl:px-3.5'
      : 'flex h-10 w-10 items-center justify-center rounded-full text-jovoy-ink-soft transition-colors hover:bg-jovoy-gold-pale hover:text-jovoy-gold lg:h-11 lg:w-11'

  return (
    <button type="button" className={triggerClass} aria-label="Sign in" onClick={onOpen}>
      <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] lg:h-5 lg:w-5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
      </svg>
      {variant === 'labeled' && <span>Sign in</span>}
    </button>
  )
}
