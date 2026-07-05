import { editorialFeatures } from '../data/siteData'
import { OptimizedImage } from './OptimizedImage'
import { ScrollIndicator } from './ScrollIndicator'
import { PageContainer } from './PageContainer'

function EditorialCardScroll({ feature, eager }: { feature: (typeof editorialFeatures)[number]; eager?: boolean }) {
  return (
    <a
      href={feature.link}
      target="_blank"
      rel="noopener noreferrer"
      className="perspective-scene group block h-full"
    >
      <div className="card-3d flex h-full flex-col overflow-hidden rounded-2xl border border-jovoy-border bg-white shadow-md shadow-amber-100/40">
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-white sm:aspect-[4/5]">
          <OptimizedImage
            src={feature.image}
            alt={feature.name}
            eager={eager}
            thumb={false}
            width={640}
            className="h-full w-full scale-[1.12] object-cover object-center brightness-105 transition-transform duration-500 group-hover:scale-[1.18]"
          />
        </div>
        <div className="flex flex-1 flex-col bg-white p-4 sm:p-6">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-jovoy-gold">{feature.tagline}</p>
          <h3 className="mt-2 font-serif text-lg text-jovoy-ink sm:text-xl">{feature.name}</h3>
          <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-jovoy-ink-soft">{feature.description}</p>
          <span className="mt-auto inline-block pt-4 text-xs font-semibold tracking-[0.15em] uppercase text-jovoy-gold group-hover:underline">
            Discover →
          </span>
        </div>
      </div>
    </a>
  )
}

function EditorialCardGrid({ feature, eager }: { feature: (typeof editorialFeatures)[number]; eager?: boolean }) {
  return (
    <a
      href={feature.link}
      target="_blank"
      rel="noopener noreferrer"
      className="perspective-scene group block h-full"
    >
      <div className="card-3d flex h-full min-h-[450px] flex-col overflow-hidden rounded-2xl border border-jovoy-border bg-white shadow-md shadow-amber-100/40 xl:min-h-[470px]">
        <div className="relative h-[255px] shrink-0 overflow-hidden bg-white xl:h-[275px] 2xl:h-[290px]">
          <OptimizedImage
            src={feature.image}
            alt={feature.name}
            eager={eager}
            thumb={false}
            width={640}
            className="h-full w-full scale-[1.12] object-cover object-center brightness-105 transition-transform duration-500 group-hover:scale-[1.18]"
          />
        </div>
        <div className="flex min-h-[190px] flex-1 flex-col bg-white p-4 xl:min-h-[195px] xl:p-5">
          <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-jovoy-gold">{feature.tagline}</p>
          <h3 className="mt-2 min-h-[2.5rem] font-serif text-lg leading-tight text-jovoy-ink xl:text-xl">{feature.name}</h3>
          <p className="mt-2 min-h-[2.75rem] flex-1 line-clamp-2 text-[13px] leading-snug text-jovoy-ink-soft xl:text-sm xl:leading-relaxed">
            {feature.description}
          </p>
          <span className="mt-auto inline-block pt-3 text-[11px] font-semibold tracking-[0.15em] uppercase text-jovoy-gold group-hover:underline">
            Discover →
          </span>
        </div>
      </div>
    </a>
  )
}

export function EditorialSection() {
  return (
    <section
      className="relative border-y border-jovoy-border bg-gradient-to-b from-white via-amber-50/80 to-white section-y lg:py-10 xl:py-11"
    >
      <PageContainer>
        <div id="curated" className="mb-6 text-center sm:mb-8 lg:mb-5">
          <p className="text-xs font-semibold tracking-[0.3em] uppercase text-jovoy-gold">Curated Editions</p>
          <h2 className="title-fluid-lg mt-2 font-serif font-medium text-jovoy-ink">Signature Stories</h2>
          <p className="mx-auto mt-2 max-w-lg text-sm text-jovoy-muted lg:mt-2.5">
            Bright, bold fragrances handpicked from the world&apos;s most visionary noses.
          </p>
        </div>

        <div className="lg:hidden">
          <div className="full-bleed">
            <div className="scroll-row editorial-scroll-row gap-4 pb-1">
              {editorialFeatures.map((feature, i) => (
                <div key={feature.id} className="snap-card-editorial min-w-0">
                  <EditorialCardScroll feature={feature} eager={i === 0} />
                </div>
              ))}
            </div>
          </div>
          <p className="mt-3 text-center text-[10px] tracking-wide text-jovoy-muted">Swipe to explore editions</p>
        </div>

        <div className="hidden gap-5 lg:grid lg:grid-cols-3 lg:items-stretch xl:gap-6">
          {editorialFeatures.map((feature, i) => (
            <EditorialCardGrid key={feature.id} feature={feature} eager={i < 2} />
          ))}
        </div>
      </PageContainer>

      <div className="page-container flex justify-center border-t border-jovoy-border/40 pt-3 sm:pt-4">
        <ScrollIndicator href="#brand" label="Our story" />
      </div>
    </section>
  )
}
