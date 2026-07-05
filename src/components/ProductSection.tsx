import type { Product } from '../data/siteData'
import { ProductSlider } from './ProductSlider'
import { ScrollIndicator } from './ScrollIndicator'
import { PageContainer } from './PageContainer'

interface ProductSectionProps {
  id: string
  eyebrow?: string
  title: string
  subtitle?: string
  products: Product[]
  variant?: 'white' | 'cream'
  scrollTo?: string
  scrollLabel?: string
}

export function ProductSection({
  id,
  eyebrow,
  title,
  subtitle,
  products,
  variant = 'white',
  scrollTo,
  scrollLabel = 'Next',
}: ProductSectionProps) {
  const bgClass = variant === 'cream' ? 'section-cream' : 'section-light'

  return (
    <section id={id} className={`relative ${bgClass} border-b border-jovoy-border section-y`}>
      <PageContainer>
        <div className="mb-6 text-center sm:mb-8">
          {eyebrow && (
            <p className="mb-2 text-xs font-semibold tracking-[0.3em] uppercase text-jovoy-gold">{eyebrow}</p>
          )}
          <h2 className="title-fluid-lg font-serif font-medium text-jovoy-ink">{title}</h2>
          {subtitle && (
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-jovoy-muted md:text-base">{subtitle}</p>
          )}
        </div>

        <ProductSlider products={products} />
      </PageContainer>

      {scrollTo && (
        <div className="page-container flex justify-center border-t border-jovoy-border/40 pt-3 sm:pt-4">
          <ScrollIndicator href={scrollTo} label={scrollLabel} />
        </div>
      )}
    </section>
  )
}
