import { ASSETS, storeInfo } from '../data/siteData'
import { OptimizedImage } from './OptimizedImage'
import { ScrollIndicator } from './ScrollIndicator'
import { PageContainer } from './PageContainer'

export function BrandStory() {
  return (
    <section id="brand" className="relative section-light border-b border-jovoy-border section-y">
      <PageContainer className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="text-xs font-semibold tracking-[0.3em] uppercase text-jovoy-gold">{storeInfo.tagline}</p>
          <h2 className="title-fluid-lg mt-3 font-serif font-medium leading-tight text-jovoy-ink">{storeInfo.subtagline}</h2>
          <p className="mt-2 font-serif text-lg italic text-jovoy-gold sm:text-xl">You will love them</p>
          <p className="mt-4 text-sm leading-relaxed text-jovoy-ink-soft sm:mt-5 sm:text-base">{storeInfo.description}</p>

          <div className="mt-6 flex items-center gap-4 rounded-2xl border border-jovoy-border bg-jovoy-gold-pale/50 p-4 sm:mt-8 sm:gap-5 sm:p-5">
            <OptimizedImage
              src={ASSETS.mayfairStore}
              alt="Jovoy Mayfair Store"
              className="h-12 w-auto shrink-0 sm:h-14"
              eager
              thumb={false}
            />
            <div className="min-w-0">
              <p className="font-serif text-base text-jovoy-ink sm:text-lg">{storeInfo.name}</p>
              <p className="text-sm text-jovoy-muted">{storeInfo.address}</p>
            </div>
          </div>
        </div>

        <div className="perspective-scene">
          <div className="card-3d overflow-hidden rounded-2xl border border-jovoy-border bg-white shadow-lg shadow-stone-200/50">
            <OptimizedImage
              src={ASSETS.perfectScentHuman}
              alt="Discover your perfect scent"
              className="aspect-[4/5] w-full object-cover object-top brightness-105"
              eager
              thumb={false}
            />
            <div className="bg-white p-5 text-center sm:p-6">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-jovoy-gold">Olfactory Experience</p>
              <p className="mt-2 font-serif text-lg text-jovoy-ink sm:text-xl">Over a thousand rare fragrances</p>
            </div>
          </div>
        </div>
      </PageContainer>
      <div className="page-container flex justify-center border-t border-jovoy-border/40 pt-3 sm:pt-4">
        <ScrollIndicator href="#loved" label="You will love them" />
      </div>
    </section>
  )
}
