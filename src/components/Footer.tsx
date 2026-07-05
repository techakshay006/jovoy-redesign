import {
  ASSETS,
  accountNavLinks,
  footerAboutLinks,
  footerLegalLinks,
  footerServiceLinks,
  footerServices,
  footerSocialLinks,
  footerYouLinks,
  storeInfo,
} from '../data/siteData'
import { PageContainer } from './PageContainer'
import { DemoBanner } from './DemoProvider'
import { SocialIcon } from './SocialIcon'

function FooterLinkColumn({
  title,
  links,
}: {
  title: string
  links: readonly { label: string; href: string }[]
}) {
  return (
    <div>
      <p className="text-xs font-semibold tracking-[0.18em] uppercase text-white">{title}</p>
      <ul className="mt-4 space-y-2.5">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              target={link.href.startsWith('#') ? undefined : '_blank'}
              rel={link.href.startsWith('#') ? undefined : 'noopener noreferrer'}
              className="text-sm text-white/70 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

function AccountLinkColumn({
  onSearchOpen,
  onSignInOpen,
}: {
  onSearchOpen: () => void
  onSignInOpen: () => void
}) {
  return (
    <div>
      <p className="text-xs font-semibold tracking-[0.18em] uppercase text-white">My Account</p>
      <ul className="mt-4 space-y-2.5">
        {accountNavLinks.map((link) => (
          <li key={link.label}>
            {'action' in link && link.action === 'search' ? (
              <button
                type="button"
                onClick={onSearchOpen}
                className="text-sm text-white/70 transition-colors hover:text-white"
              >
                {link.label}
              </button>
            ) : link.label === 'Sign in' ? (
              <button
                type="button"
                onClick={onSignInOpen}
                className="text-sm text-white/70 transition-colors hover:text-white"
              >
                {link.label}
              </button>
            ) : (
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white/70 transition-colors hover:text-white"
              >
                {link.label}
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export function Footer({
  onSearchOpen,
  onSignInOpen,
}: {
  onSearchOpen: () => void
  onSignInOpen: () => void
}) {
  return (
    <footer>
      <DemoBanner />
      <div className="border-t border-jovoy-border bg-white">
        <PageContainer className="py-8 sm:py-10 md:py-12">
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 sm:gap-6 md:grid-cols-3 lg:grid-cols-6 lg:gap-8">
            {footerServices.map((service) => (
              <div key={service.title} className="flex flex-col items-center text-center">
                <img src={service.icon} alt="" className="mb-3 h-10 w-10" loading="lazy" decoding="async" />
                <p className="text-[11px] leading-snug font-medium text-jovoy-ink">{service.title}</p>
                <p className="text-[10px] text-jovoy-muted">{service.subtitle}</p>
              </div>
            ))}
          </div>
        </PageContainer>
      </div>

      <div className="bg-jovoy-ink text-white">
        <PageContainer className="py-10 md:py-16">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-3">
              <img src={ASSETS.logoWhite} alt="Jovoy Mayfair" className="h-12 w-auto" loading="lazy" decoding="async" />
              <address className="mt-6 not-italic text-sm leading-relaxed text-white/75">
                {storeInfo.name}
                <br />
                {storeInfo.address}
              </address>
              <div className="mt-4 text-sm leading-relaxed text-white/75">
                P : {storeInfo.phone}
                <br />
                Monday to Saturday
                <br />
                From 11am to 7pm
              </div>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:col-span-9 lg:grid-cols-4">
              <FooterLinkColumn title="About Jovoy" links={footerAboutLinks} />
              <FooterLinkColumn title="Our Services" links={footerServiceLinks} />
              <FooterLinkColumn title="Jovoy & You" links={footerYouLinks} />
              <FooterLinkColumn title="Legal Information" links={footerLegalLinks} />
            </div>

            <div className="md:hidden lg:col-span-12">
              <AccountLinkColumn onSearchOpen={onSearchOpen} onSignInOpen={onSignInOpen} />
            </div>
          </div>

          <div className="mt-10 flex justify-center border-t border-white/10 pt-8 md:justify-end">
            <ul className="flex items-center gap-5 md:gap-7">
              {footerSocialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className="flex h-11 w-11 items-center justify-center text-white/80 transition-colors hover:text-white"
                  >
                    <SocialIcon label={link.label} variant="white" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </PageContainer>
      </div>
    </footer>
  )
}
