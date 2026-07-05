import { ASSETS, scentDiscoveryText } from '../data/siteData'
import { OptimizedImage } from './OptimizedImage'
import { ScrollIndicator } from './ScrollIndicator'
import { PageContainer } from './PageContainer'

export function CTASection() {
  const ctas = [
    {
      title: 'The perfect scent(s) for you',
      cta: 'Find yours',
      href: 'https://www.jovoyparis.uk/2-perfumes',
      image: ASSETS.spray,
    },
    {
      title: 'Our Jovoy Home Scents',
      cta: 'Find Yours',
      href: 'https://www.jovoyparis.uk/3-home-other-products',
      image: 'https://www.jovoyparis.uk/img/ets_megamenu/b2439a75d2-bougiejovoy.jpg',
    },
  ]

  return (
    <section id="discover" className="relative section-light border-b border-jovoy-border section-y">
      <PageContainer>
        <div className="mx-auto mb-8 max-w-2xl text-center sm:mb-12">
          <h2 className="title-fluid font-serif font-medium text-jovoy-ink">Find your perfect scent</h2>
          <p className="mt-3 text-sm leading-relaxed text-jovoy-muted sm:mt-4 md:text-base">{scentDiscoveryText}</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
          {ctas.map((item) => (
            <a
              key={item.title}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="perspective-scene group block overflow-hidden rounded-2xl border border-jovoy-border bg-white shadow-md"
            >
              <div className="card-3d relative flex min-h-[200px] items-end sm:min-h-[260px] md:min-h-[300px]">
                <OptimizedImage
                  src={item.image}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover brightness-110"
                  width={640}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-white/40" />
                <div className="relative w-full p-5 sm:p-7">
                  <h3 className="font-serif text-xl text-jovoy-ink sm:text-2xl md:text-3xl">{item.title}</h3>
                  <span className="mt-2 inline-block text-xs font-semibold tracking-[0.15em] uppercase text-jovoy-gold group-hover:underline sm:mt-3">
                    {item.cta} →
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </PageContainer>
      <div className="page-container flex justify-center border-t border-jovoy-border/40 pt-3 sm:pt-4">
        <ScrollIndicator href="#exclusives" label="Exclusives" />
      </div>
    </section>
  )
}
