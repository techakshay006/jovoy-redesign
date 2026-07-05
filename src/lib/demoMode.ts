/** Set to false when connecting to live Jovoy URLs. */
export const DEMO_MODE = true

export const DEMO_NOTICE = 'For demo purpose only'

export const DEMO_POPUP = {
  title: 'Work in progress',
  message: "This feature is under development — we'll be back soon!",
  thanks: 'Thank you for your patience.',
  note: DEMO_NOTICE,
} as const

export function isAllowedInDemo(href: string | null | undefined): boolean {
  if (!href) return true
  const trimmed = href.trim()
  if (!trimmed || trimmed === '#') return true
  return trimmed.startsWith('#')
}
