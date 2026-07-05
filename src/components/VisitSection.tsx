import { ASSETS, storeInfo, storeLocations } from '../data/siteData'
import { OptimizedImage } from './OptimizedImage'
import { ScrollIndicator } from './ScrollIndicator'
import { PageContainer } from './PageContainer'

export function VisitSection() {
  return (
    <section id="visit" className="relative section-light border-t border-jovoy-border section-y">
      <PageContainer>
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
          <div className="perspective-scene">
            <div className="card-3d overflow-hidden rounded-2xl border border-jovoy-border bg-white shadow-lg shadow-stone-200/50">
              <OptimizedImage
                src={ASSETS.mayfairStore}
                alt="Jovoy Mayfair store"
                className="aspect-square w-full object-cover brightness-105"
                eager
                thumb={false}
              />
            </div>
          </div>

          <div>
            <h2 className="title-fluid-lg font-serif font-medium text-jovoy-ink">{storeInfo.name}</h2>
            <p className="mt-4 text-sm leading-relaxed text-jovoy-ink-soft sm:mt-5 sm:text-base">{storeInfo.description}</p>
            <div className="mt-5 space-y-1 text-sm text-jovoy-muted sm:mt-6">
              <p>{storeInfo.address}</p>
              <p>{storeInfo.hours}</p>
            </div>
            <a
              href="https://www.jovoyparis.uk/contact-us"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block rounded-full border border-jovoy-gold bg-jovoy-gold-pale px-6 py-3 text-xs font-semibold tracking-[0.15em] uppercase text-jovoy-gold transition-colors hover:bg-jovoy-gold hover:text-white sm:mt-8 sm:px-8"
            >
              Visit Our Store
            </a>
          </div>
        </div>

        <div className="mx-auto mt-12 max-w-2xl text-center sm:mt-16 md:mt-20">
          <h3 className="title-fluid font-serif font-medium text-jovoy-ink">
            Discover our other stores and their assortment
          </h3>

          <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:gap-4">
            {storeLocations.map((store) => (
              <a
                key={store.id}
                href={store.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex-1 rounded-2xl border border-jovoy-border bg-white px-6 py-4 shadow-sm transition-all hover:border-jovoy-gold hover:bg-jovoy-gold-pale/40 hover:shadow-md sm:px-8 sm:py-5"
              >
                <span className="font-serif text-lg text-jovoy-ink transition-colors group-hover:text-jovoy-gold sm:text-xl md:text-2xl">
                  {store.name}
                </span>
                <span className="mt-1 block text-xs font-semibold tracking-[0.15em] uppercase text-jovoy-gold sm:mt-2">
                  Explore →
                </span>
              </a>
            ))}
          </div>
        </div>
      </PageContainer>
      <div className="page-container flex justify-center border-t border-jovoy-border/40 pt-3 sm:pt-4">
        <ScrollIndicator href="#top" label="Back to top" direction="up" />
      </div>
    </section>
  )
}
