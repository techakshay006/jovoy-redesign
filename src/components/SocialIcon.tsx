import { footerSocialLinks } from '../data/siteData'

export type SocialLabel = (typeof footerSocialLinks)[number]['label']
export type SocialIconVariant = 'color' | 'white'

const SOCIAL_ICON_SRC: Record<SocialLabel, Record<SocialIconVariant, string>> = {
  YouTube: {
    color: '/social/youtube.svg',
    white: '/social/youtube-white.svg',
  },
  Instagram: {
    color: '/social/instagram.svg',
    white: '/social/instagram-white.svg',
  },
  TikTok: {
    color: '/social/tiktok.svg',
    white: '/social/tiktok-white.svg',
  },
}

interface SocialIconProps {
  label: SocialLabel
  variant?: SocialIconVariant
  className?: string
}

export function SocialIcon({ label, variant = 'color', className = 'h-8 w-8 md:h-10 md:w-10' }: SocialIconProps) {
  return (
    <img
      src={SOCIAL_ICON_SRC[label][variant]}
      alt=""
      className={className}
      loading="lazy"
      decoding="async"
      aria-hidden="true"
    />
  )
}
