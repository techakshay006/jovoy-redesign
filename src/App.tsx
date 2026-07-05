import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { SplashScreen } from './components/SplashScreen'
import { Header } from './components/Header'
import { SecondaryNav, type SecondaryNavId } from './components/SecondaryNav'
import { HeroCarousel } from './components/HeroCarousel'
import { ProductSection } from './components/ProductSection'
import { EditorialSection } from './components/EditorialSection'
import { BrandStory } from './components/BrandStory'
import { Testimonials3D } from './components/Testimonials3D'
import { CTASection } from './components/CTASection'
import { VisitSection } from './components/VisitSection'
import { Footer } from './components/Footer'
import { AppBottomNav } from './components/AppBottomNav'
import { MobileMenu } from './components/MobileMenu'
import { AuthDialog } from './components/AuthDialog'
import { BackToTop } from './components/ScrollIndicator'
import { DemoBanner } from './components/DemoProvider'
import { summerProducts, lovedProducts, exclusiveProducts } from './data/siteData'

function App() {
  const [loading, setLoading] = useState(true)
  const [secondaryPreviewOpen, setSecondaryPreviewOpen] = useState(false)
  const [secondaryActive, setSecondaryActive] = useState<SecondaryNavId | null>(null)
  const [searchOpen, setSearchOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [authOpen, setAuthOpen] = useState(false)

  const openSearch = () => {
    setSearchOpen(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const closeSearch = () => setSearchOpen(false)

  const openAuth = () => setAuthOpen(true)
  const closeAuth = () => setAuthOpen(false)

  const openSecondaryExplore = (id: SecondaryNavId) => {
    setSecondaryActive(id)
    requestAnimationFrame(() => {
      document.getElementById('secondary-nav')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <SplashScreen onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <div id="top" className="app-shell min-h-screen min-h-[100dvh] bg-[#fdfcfa] pb-nav-safe">
          <Header
            onMenuOpen={() => setMenuOpen(true)}
            onSignInOpen={openAuth}
            searchOpen={searchOpen}
            onSearchOpen={openSearch}
            onSearchClose={closeSearch}
            menuOpen={menuOpen}
          />
          <DemoBanner />
          <AuthDialog open={authOpen} onClose={closeAuth} />
          <MobileMenu
            open={menuOpen}
            onClose={() => setMenuOpen(false)}
            onSearchOpen={openSearch}
            onSignInOpen={openAuth}
            onExploreOpen={openSecondaryExplore}
          />
          <SecondaryNav
            active={secondaryActive}
            onActiveChange={setSecondaryActive}
            onPreviewChange={setSecondaryPreviewOpen}
          />
          <main>
            <HeroCarousel compact={secondaryPreviewOpen} />
            <ProductSection
              id="summer"
              eyebrow="Exclusivity"
              title="Get Your Summer Feel On"
              products={summerProducts}
              variant="white"
              scrollTo="#curated"
              scrollLabel="Curated editions"
            />

            <EditorialSection />

            <BrandStory />

            <ProductSection
              id="loved"
              eyebrow="Curated Selection"
              title="You Will Love Them"
              products={lovedProducts}
              variant="cream"
              scrollTo="#testimonials"
              scrollLabel="Testimonials"
            />

            <Testimonials3D />

            <CTASection />

            <ProductSection
              id="exclusives"
              eyebrow="Most Loved"
              title="Jovoy's Most Loved Exclusives"
              products={exclusiveProducts}
              variant="white"
              scrollTo="#visit"
              scrollLabel="Visit us"
            />

            <VisitSection />
          </main>
          <Footer onSearchOpen={openSearch} onSignInOpen={openAuth} />
          <AppBottomNav
            onSearch={openSearch}
            onSignIn={openAuth}
            onMenu={() => setMenuOpen(true)}
          />
          <BackToTop />
        </div>
      )}
    </>
  )
}

export default App
