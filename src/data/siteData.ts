export const ASSETS = {
  logo: 'https://www.jovoyparis.uk/themes/beyonds/assets/img/logo/jovoy-logo.svg',
  logoWhite: 'https://www.jovoyparis.uk/themes/beyonds/assets/img/logo/jovoy-logo-white.svg',
  mayfairStore: 'https://www.jovoyparis.uk/img/cms/UK/Blocs/mayfair.png',
  perfectScentHuman: 'https://www.jovoyparis.uk/img/cms/Blocs%20Home%20Page/iStock-900979570.png',
  spray: 'https://www.jovoyparis.uk/img/cms/Blocs%20Home%20Page/Spray_jovoy.png',
  footerIcons: {
    tryMe: 'https://www.jovoyparis.uk/themes/beyonds/assets//img/icones-footer/jovoy_picto_website_Our_TRY_ME_service.svg',
    retailer: 'https://www.jovoyparis.uk/themes/beyonds/assets//img/icones-footer/jovoy_picto_website_Official_Retailer_certified_provenance.svg',
    delivery: 'https://www.jovoyparis.uk/themes/beyonds/assets//img/icones-footer/jovoy_picto_nl_loyalty_Free_delivery.svg',
    service: 'https://www.jovoyparis.uk/themes/beyonds/assets//img/icones-footer/jovoy_picto_website_Customer_Service_available.svg',
    gift: 'https://www.jovoyparis.uk/themes/beyonds/assets//img/icones-footer/jovoy_picto_website_Happy_birthday.svg',
    payment: 'https://www.jovoyparis.uk/themes/beyonds/assets//img/icones-footer/jovoy_picto_website_security_payment.svg',
    tiktok: 'https://www.jovoyparis.uk/themes/beyonds/assets//img/icones-footer/tik-tok.svg',
    tiktokWhite: 'https://www.jovoyparis.uk/themes/beyonds/assets//img/icones-footer/tik-tok-white.svg',
  },
  socialIcons: {
    youtube: '/social/youtube.svg',
    youtubeWhite: '/social/youtube-white.svg',
    instagram: '/social/instagram.svg',
    instagramWhite: '/social/instagram-white.svg',
  },
} as const

/** Smaller PrestaShop thumbnails for faster grid loading */
export function toThumbUrl(url: string): string {
  return url.replace('-home_default/', '-small_default/')
}

export interface ProductNote {
  head: string
  heart: string
  base: string
}

export interface Product {
  id: string
  name: string
  brand: string
  price: string
  image: string
  link: string
  tags?: string[]
  families?: string
  notes?: ProductNote
  tryMe?: boolean
  outOfStock?: boolean
}

export interface HeroSlide {
  id: string
  title: string
  subtitle: string
  image: string
  link?: string
}

export interface EditorialFeature {
  id: string
  name: string
  tagline: string
  description: string
  image: string
  link: string
}

export const heroSlides: HeroSlide[] = [
  {
    id: 'odyssea',
    title: 'Odyssea',
    subtitle: 'SOFT SWEETNESS, WRAPPED IN LIGHT',
    image: 'https://www.jovoyparis.uk/img/cms/UK/HomePAGE/SE%20Web%20Banner%20Jovoy%20Mayfair.jpg',
  },
  {
    id: 'ambra',
    title: 'Ambra Innamorata',
    subtitle: 'A CELEBRATION OF AMBER',
    image: 'https://www.jovoyparis.uk/img/cms/1024x500%20Welton%20Ambra%20Innamorata%20web.jpg',
  },
  {
    id: 'eliksiro',
    title: 'Eliksiro',
    subtitle: 'New extract by Jeroboam',
    image: 'https://www.jovoyparis.uk/img/cms/UK/HomePAGE/banniere_eliksiro%20(1).jpg',
  },
  {
    id: 'amber-bloom-hero',
    title: 'Amber Bloom',
    subtitle: 'Refined Freshness With A Warm Afterglow',
    image: 'https://www.jovoyparis.uk/img/cms/5d7d26be-bd9e-4c52-b69d-8da3502407e0.png',
  },
  {
    id: 'nitro-musk',
    title: 'Nitro Musk',
    subtitle: 'Exclusive At Jovoy',
    image: 'https://www.jovoyparis.uk/img/cms/Jovoy%20Banner%20Scentologia%20Nitro%20Musk.png',
  },
]

export const summerProducts: Product[] = [
  {
    id: 'acqua-di-sale',
    name: 'ACQUA DI SALE',
    brand: 'PROFUMUM ROMA',
    price: '£220.83',
    image: 'https://www.jovoyparis.uk/6475-home_default/acqua-di-sale-.jpg',
    link: 'https://www.jovoyparis.uk/marine/1844-acqua-di-sale-.html',
    tags: ['Exclusivity'],
    families: 'Aquatic',
    notes: { head: 'Myrtle', heart: 'Cedarwood', base: 'Algae' },
  },
  {
    id: 'sun',
    name: 'SUN',
    brand: 'VALLENSE FRAGRANCES',
    price: '£154.17',
    image: 'https://www.jovoyparis.uk/6975-home_default/sun.jpg',
    link: 'https://www.jovoyparis.uk/fruity/8888-sun.html',
    tags: ['Exclusivity'],
    families: 'Fruity, Floral, Citrus',
    notes: { head: 'Passion Fruit', heart: 'Ylang-Ylang', base: 'Benzoin' },
    tryMe: true,
  },
  {
    id: 'policromia',
    name: 'POLICROMIA',
    brand: 'BOIS 1920',
    price: '£208.33',
    image: 'https://www.jovoyparis.uk/6172-home_default/policromia.jpg',
    link: 'https://www.jovoyparis.uk/gourmand/8317-policromia.html',
    tags: ['Exclusivity'],
    families: 'Gourmand, Floral, Fruity',
    notes: { head: 'Raspberry', heart: 'Jasmine', base: 'Amber' },
    tryMe: true,
  },
  {
    id: 'juanillo',
    name: 'JUANILLO',
    brand: 'ADAMO PARFUM',
    price: '£133.33',
    image: 'https://www.jovoyparis.uk/5624-home_default/juanillo.jpg',
    link: 'https://www.jovoyparis.uk/gourmand/8058-juanillo.html',
    tags: ['Exclusivity'],
    families: 'Gourmand, Citrusy',
    notes: { head: 'Mandarin', heart: 'Pistachio', base: 'Musk' },
    tryMe: true,
  },
  {
    id: 'blanc-polychrome',
    name: 'BLANC POLYCHROME',
    brand: 'ATELIER DES ORS',
    price: '£162.50',
    image: 'https://www.jovoyparis.uk/197-home_default/blanc-polychrome.jpg',
    link: 'https://www.jovoyparis.uk/fruity/4973-blanc-polychrome.html',
    families: 'Fruity, Citrusy',
    notes: { head: 'Mandarin', heart: 'Jasmine', base: 'Ambroxan' },
    tryMe: true,
  },
  {
    id: 'mangomina-d',
    name: 'MANGOMINA D',
    brand: 'NEW NOTES',
    price: '£137.50',
    image: 'https://www.jovoyparis.uk/6760-home_default/mangomina-d.jpg',
    link: 'https://www.jovoyparis.uk/fruity/8378-mangomina-d.html',
    families: 'Fruity, Ambery, Aquatic',
    notes: { head: 'Mango', heart: 'Moss', base: 'Amber' },
    tryMe: true,
  },
  {
    id: 'cherry-prosecco',
    name: 'CHERRY PROSECCO',
    brand: 'NEW NOTES',
    price: '£157.50',
    image: 'https://www.jovoyparis.uk/6919-home_default/cherry-prosecco.jpg',
    link: 'https://www.jovoyparis.uk/fruity/8859-cherry-prosecco.html',
    tags: ['Limited Edition', 'Exclusivity'],
    families: 'Fruity, Floral',
    notes: { head: 'Cherry', heart: 'White Flowers', base: 'Musk' },
    tryMe: true,
  },
  {
    id: 'amber-bloom',
    name: 'AMBER BLOOM',
    brand: 'ELECTIMUSS LONDON',
    price: '£208.33',
    image: 'https://www.jovoyparis.uk/7591-home_default/amber-bloom.jpg',
    link: 'https://www.jovoyparis.uk/citrusy/9092-amber-bloom.html',
    tags: ['New In', 'Exclusivity'],
    families: 'Citrusy, Ambery',
    notes: { head: 'Grapefruit', heart: 'Passion Fruit', base: 'Tonka Bean' },
    tryMe: true,
  },
  {
    id: 'pacific-rock-flower',
    name: 'PACIFIC ROCK FLOWER',
    brand: 'GOLDFIELD & BANKS AUSTRALIA',
    price: '£129.17',
    image: 'https://www.jovoyparis.uk/6557-home_default/pacific-rock-flower.jpg',
    link: 'https://www.jovoyparis.uk/floral/8348-pacific-rock-flower.html',
    families: 'Floral, Aquatic',
    notes: { head: 'Eucalyptus', heart: 'White Flowers', base: 'Sandalwood' },
  },
  {
    id: 'topaz',
    name: 'TOPAZ',
    brand: 'KAJAL PERFUMES PARIS',
    price: '£160.00',
    image: 'https://www.jovoyparis.uk/6987-home_default/topaz.jpg',
    link: 'https://www.jovoyparis.uk/gourmand/8783-topaz.html',
    families: 'Gourmand, Fruity',
    notes: { head: 'Lemon', heart: 'Rose', base: 'Cashmere' },
    tryMe: true,
  },
]

export const editorialFeatures: EditorialFeature[] = [
  {
    id: 'romazzino',
    name: 'ROMAZZINO',
    tagline: 'creamy sardinian summer',
    description: 'A sillage that lingers like sunset over the Sardinian coast.',
    image: 'https://www.jovoyparis.uk/img/cms/25a33ae0-8045-4907-83a2-cd74668f91c5.jpg',
    link: 'https://www.jovoyparis.uk/citrusy/9055-romazzino.html',
  },
  {
    id: 'pomegranoudh',
    name: 'POMEGRANOUDH',
    tagline: 'Deep, Rich, Intense',
    description: 'A fruity oriental perfume that refuses to be ordinary.',
    image: 'https://www.jovoyparis.uk/img/cms/e8e19108-0100-4168-aedb-a62a21830fc8.jpg',
    link: 'https://www.jovoyparis.uk/woody/9052-pomegranoudh.html',
  },
  {
    id: 'tonka-kumaru',
    name: 'Tonka Kumaru',
    tagline: 'Sweeten Up',
    description: 'A true olfactory madeleine, reimagined as a contemporary object of desire.',
    image: 'https://www.jovoyparis.uk/img/cms/AM%20Tonka%20Kumaru%20(14).jpg',
    link: 'https://www.jovoyparis.uk/amber/8953-tonka-kumaru.html',
  },
]

export const lovedProducts: Product[] = [
  {
    id: 'impadia',
    name: 'IMPADIA',
    brand: 'BDK PARFUMS',
    price: '£175.00',
    image: 'https://www.jovoyparis.uk/6297-home_default/impadia.jpg',
    link: 'https://www.jovoyparis.uk/floral/8298-impadia.html',
    families: 'Floral, Gourmand, Woody',
    notes: { head: 'Mandarin', heart: 'Rose', base: 'Vanilla' },
    tryMe: true,
  },
  {
    id: 'jany',
    name: 'Jany',
    brand: 'SORA DORA',
    price: '£140.00',
    image: 'https://www.jovoyparis.uk/7036-home_default/jany.jpg',
    link: 'https://www.jovoyparis.uk/gourmand/7564-jany.html',
    families: 'Gourmand, Fruity, Oriental',
    notes: { head: 'Apple', heart: 'Puff Pastry', base: 'Caramel' },
    tryMe: true,
  },
  {
    id: 'lait-et-chocolat',
    name: 'LAIT ET CHOCOLAT',
    brand: 'CHABAUD',
    price: '£70.83',
    image: 'https://www.jovoyparis.uk/368-home_default/lait-et-chocolat.jpg',
    link: 'https://www.jovoyparis.uk/gourmand/2372-lait-et-chocolat.html',
    families: 'Gourmand',
    notes: { head: 'Jasmine', heart: 'Cedarwood', base: 'Chocolate' },
    tryMe: true,
  },
  {
    id: 'talco',
    name: 'TALCO',
    brand: 'NEW NOTES',
    price: '£124.17',
    image: 'https://www.jovoyparis.uk/4619-home_default/talco.jpg',
    link: 'https://www.jovoyparis.uk/floral/7815-talco.html',
    families: 'Floral, Powdery',
    notes: { head: 'Talc', heart: 'Rose', base: 'Vanilla' },
    tryMe: true,
  },
  {
    id: 'dynasty',
    name: 'DYNASTY',
    brand: 'FABBRICA DELLA MUSA',
    price: '£183.33',
    image: 'https://www.jovoyparis.uk/6967-home_default/dynasty.jpg',
    link: 'https://www.jovoyparis.uk/perfumes-us/8726-dynasty.html',
    families: 'Citrus, Floral, Aromatic',
    notes: { head: 'Bergamot', heart: 'Tea', base: 'Cashmere' },
    tryMe: true,
  },
  {
    id: 'gozo',
    name: 'GOZO',
    brand: 'JEROBOAM',
    price: '£233.33',
    image: 'https://www.jovoyparis.uk/5800-home_default/gozo.jpg',
    link: 'https://www.jovoyparis.uk/floral/4245-gozo.html',
    families: 'Floriental, Spicy',
    notes: { head: 'Tuberose', heart: 'Cedarwood', base: 'Ambroxan' },
    tryMe: true,
  },
  {
    id: 'remember-me',
    name: 'REMEMBER ME',
    brand: 'JOVOY PARIS',
    price: '£133.33',
    image: 'https://www.jovoyparis.uk/6706-home_default/remember-me.jpg',
    link: 'https://www.jovoyparis.uk/gourmand/2903-remember-me.html',
    families: 'Oriental, Gourmand',
    notes: { head: 'Cardamom', heart: 'Frangipani Tree', base: 'Vanilla' },
    tryMe: true,
  },
  {
    id: 'psychedelique',
    name: 'PSYCHEDELIQUE',
    brand: 'JOVOY PARIS',
    price: '£133.33',
    image: 'https://www.jovoyparis.uk/6718-home_default/psychedelique.jpg',
    link: 'https://www.jovoyparis.uk/woody/465-psychedelique.html',
    families: 'Woody, Oriental',
    notes: { head: 'Citrus Fruits', heart: 'Patchouli', base: 'Vanilla' },
    tryMe: true,
  },
  {
    id: 'blanche-bete',
    name: 'BLANCHE BETE',
    brand: 'LIQUIDES IMAGINAIRES',
    price: '£191.67',
    image: 'https://www.jovoyparis.uk/2360-home_default/blanche-bete.jpg',
    link: 'https://www.jovoyparis.uk/woody/6518-blanche-bete.html',
    families: 'Floral, Musky, Oriental',
    notes: { head: 'Milk', heart: 'Jasmine', base: 'Tonka Bean' },
  },
  {
    id: 'incident-diplomatique',
    name: 'INCIDENT DIPLOMATIQUE',
    brand: 'JOVOY PARIS',
    price: '£133.33',
    image: 'https://www.jovoyparis.uk/6781-home_default/incident-diplomatique.jpg',
    link: 'https://www.jovoyparis.uk/woody/2368-incident-diplomatique.html',
    families: 'Woody, Aromatic',
    notes: { head: 'Mandarin', heart: 'Vetiver', base: 'Patchouli' },
    tryMe: true,
  },
]

export const exclusiveProducts: Product[] = [
  {
    id: 'astrum-nova',
    name: 'ASTRUM NOVA',
    brand: 'ELECTIMUSS LONDON',
    price: '£245.83',
    image: 'https://www.jovoyparis.uk/6450-home_default/astrum-nova.jpg',
    link: 'https://www.jovoyparis.uk/fruity/8650-astrum-nova.html',
    tags: ['Exclusivity'],
    families: 'Fruity, Woody',
    notes: { head: 'Mango', heart: 'Osmanthus', base: 'Oud' },
    tryMe: true,
  },
  {
    id: 'white',
    name: 'WHITE',
    brand: 'PUREDISTANCE',
    price: '£379.17',
    image: 'https://www.jovoyparis.uk/2870-home_default/white.jpg',
    link: 'https://www.jovoyparis.uk/floral/1913-white.html',
    tags: ['Exclusivity'],
    families: 'Floral, Woody, Musky',
    notes: { head: 'Rose', heart: 'Sandalwood', base: 'Iris' },
  },
  {
    id: 'mayfair-exclusive',
    name: 'JOVOY MAYFAIR EXCLUSIVE',
    brand: 'SHIRAZ PARFUMS',
    price: '£154.17',
    image: 'https://www.jovoyparis.uk/5197-home_default/jovoy-mayfair-exclusive.jpg',
    link: 'https://www.jovoyparis.uk/produits-a-traiter/8053-jovoy-mayfair-exclusive.html',
    tags: ['Out of Stock', 'Exclusivity'],
    families: 'Ambery, Oriental, Spicy',
    notes: { head: 'Blackcurrant', heart: 'Rose', base: 'Sandalwood' },
    tryMe: true,
    outOfStock: true,
  },
  {
    id: 'love-o-matic',
    name: 'LOVE-O-MATIC',
    brand: 'ROOM 1015',
    price: '£108.33',
    image: 'https://www.jovoyparis.uk/6735-home_default/love-o-matic.jpg',
    link: 'https://www.jovoyparis.uk/aldehydes/8618-love-o-matic.html',
    tags: ['Exclusivity'],
    families: 'Aldehyde',
    notes: { head: 'Strawberry', heart: 'Aldehydes', base: 'Musk' },
    tryMe: true,
  },
  {
    id: 'spirit',
    name: 'SPIRIT',
    brand: 'VALLENSE FRAGRANCES',
    price: '£154.17',
    image: 'https://www.jovoyparis.uk/6977-home_default/spirit.jpg',
    link: 'https://www.jovoyparis.uk/fougere/8887-spirit.html',
    tags: ['Exclusivity'],
    families: 'Fougere',
    notes: { head: 'Mint', heart: 'Labdanum', base: 'Box tree' },
    tryMe: true,
  },
  {
    id: 'vanitas',
    name: 'VANITAS',
    brand: 'PROFUMUM ROMA',
    price: '£220.83',
    image: 'https://www.jovoyparis.uk/1309-home_default/vanitas.jpg',
    link: 'https://www.jovoyparis.uk/powdery/1858-vanitas.html',
    tags: ['Exclusivity'],
    families: 'Powdery, Vanilla, Oriental, Gourmand',
    notes: { head: 'Vanilla', heart: 'Orange Blossom', base: 'Sandalwood' },
    tryMe: true,
  },
  {
    id: 'eden',
    name: 'EDEN',
    brand: 'ADAMO PARFUM',
    price: '£200.00',
    image: 'https://www.jovoyparis.uk/6316-home_default/eden.jpg',
    link: 'https://www.jovoyparis.uk/floral/8338-eden.html',
    tags: ['Exclusivity'],
    families: 'Floral, Fruity, Woody',
    notes: { head: 'Plum', heart: 'White Flowers', base: 'Wood' },
    tryMe: true,
  },
  {
    id: 'peachs-revenge',
    name: "PEACH'S REVENGE",
    brand: 'SARAH BAKER',
    price: '£183.33',
    image: 'https://www.jovoyparis.uk/4738-home_default/peach-s-revenche.jpg',
    link: 'https://www.jovoyparis.uk/fruity/7892-peach-s-revenche.html',
    tags: ['Exclusivity'],
    families: 'Fruity, Gourmand',
    notes: { head: 'Peach', heart: 'Iris', base: 'Caramel' },
    tryMe: true,
  },
]

export const navLinks = [
  { label: 'Brands', href: 'https://www.jovoyparis.uk/brands' },
  { label: 'Perfumes', href: 'https://www.jovoyparis.uk/2-perfumes' },
  { label: 'Home & Other Products', href: 'https://www.jovoyparis.uk/3-home-other-products' },
  { label: 'Exclusive Offers', href: 'https://www.jovoyparis.uk/exclusive-offers' },
  { label: 'Private consultation', href: 'https://www.jovoyparis.uk/content/11-private-consultation' },
]

export const secondaryNavLinks = [
  { label: 'Contact', href: 'https://www.jovoyparis.uk/contact-us', id: 'contact' },
  { label: 'Blog', href: 'https://www.jovoyparis.uk/blog', id: 'blog' },
  { label: 'Jovoy Concept', href: 'https://www.jovoyparis.uk/content/8-discover-jovoy', id: 'concept' },
] as const

export const contactPreview = {
  eyebrow: 'Visit & connect',
  title: 'Jovoy Mayfair',
  highlights: [
    { label: 'Address', value: '21 Conduit St, London W1S 2XP' },
    { label: 'Hours', value: 'Monday to Saturday — 11am to 7pm' },
    { label: 'Phone', value: '+44 7745 214646' },
  ],
  actions: [
    { label: 'Contact us', href: 'https://www.jovoyparis.uk/contact-us' },
    { label: 'Private consultation', href: 'https://www.jovoyparis.uk/content/11-private-consultation' },
    { label: 'Order tracking', href: 'https://www.jovoyparis.uk/guest-tracking' },
  ],
}

export const blogPreview = {
  eyebrow: 'The olfactory journal',
  title: 'Stories, notes & rare finds',
  posts: [
    {
      title: 'How to build a niche fragrance wardrobe',
      teaser: 'Layering, seasons, and signatures — a guide from our Mayfair experts.',
      href: 'https://www.jovoyparis.uk/blog',
    },
    {
      title: 'Inside Jovoy: discovering independent perfumers',
      teaser: 'Meet the houses behind our most sought-after exclusives.',
      href: 'https://www.jovoyparis.uk/blog',
    },
  ],
  cta: { label: 'Read all stories', href: 'https://www.jovoyparis.uk/blog' },
}

export const conceptPreview = {
  eyebrow: 'Discover Jovoy',
  title: 'The Jovoy Concept',
  description:
    'Rarity, discoveries, wonder, and elegance — Jovoy draws its spirit from François Hénin\'s founding vision: an embassy of rare perfumes where curiosity meets exceptional niche fragrance.',
  highlights: [
    { label: 'Try Me', value: 'Sample at home before you commit — just like in store' },
    { label: 'Curated houses', value: 'Independent perfumers and visionary noses from around the world' },
    { label: 'Olfactory journey', value: 'Explore by notes, families, brands, and perfumer' },
  ],
  cta: { label: 'Discover Jovoy', href: 'https://www.jovoyparis.uk/content/8-discover-jovoy' },
}

export const footerServices = [
  { icon: ASSETS.footerIcons.tryMe, title: 'We refund your try me', subtitle: 'under Conditions' },
  { icon: ASSETS.footerIcons.retailer, title: 'Official Retailer', subtitle: 'Certified Origin' },
  { icon: ASSETS.footerIcons.delivery, title: 'Free delivery within the UK', subtitle: 'for orders over £50' },
  { icon: ASSETS.footerIcons.service, title: 'Customer service', subtitle: 'available 5 days a week' },
  { icon: ASSETS.footerIcons.gift, title: 'Gift wrapping', subtitle: '& personalized note' },
  { icon: ASSETS.footerIcons.payment, title: 'Secure payment', subtitle: 'Cards, Amex, Paypal' },
]

export const footerAboutLinks = [
  { label: 'Discover Jovoy', href: 'https://www.jovoyparis.uk/content/4-discover-jovoy' },
  { label: 'Stores', href: 'https://www.jovoyparis.uk/stores' },
  { label: 'Blog', href: 'https://www.jovoyparis.uk/blog' },
]

export const footerServiceLinks = [
  { label: 'TRY ME', href: 'https://www.jovoyparis.uk/content/6-try-me' },
  { label: 'Jovoy Box', href: 'https://www.jovoyparis.uk/content/7-jovoy-box' },
]

export const footerYouLinks = [
  { label: 'Deliveries', href: 'https://www.jovoyparis.uk/content/1-delivery' },
  { label: 'Contact us', href: 'https://www.jovoyparis.uk/contact-us' },
  { label: 'Order tracking', href: 'https://www.jovoyparis.uk/guest-tracking' },
]

export const footerLegalLinks = [
  { label: 'General Terms and conditions', href: 'https://www.jovoyparis.uk/content/2-general-terms-and-conditions' },
  { label: 'General Terms & Conditions of Sale', href: 'https://www.jovoyparis.uk/content/3-general-terms-conditions-of-sale' },
  { label: 'Terms and conditions of Use', href: 'https://www.jovoyparis.uk/content/5-terms-and-conditions-of-use' },
  { label: 'Personnal Date & Cookies', href: 'https://www.jovoyparis.uk/content/8-personnal-date-cookies' },
  { label: 'Cookie settings', href: '#' },
]

export const footerSocialLinks = [
  { label: 'YouTube', href: 'https://www.youtube.com/channel/UCrBowEK16pbK1NnDt8UIxpQ' },
  { label: 'Instagram', href: 'https://www.instagram.com/jovoymayfair/' },
  { label: 'TikTok', href: 'https://www.tiktok.com/@jovoymayfair' },
] as const

export const storeInfo = {
  name: 'Jovoy Mayfair',
  address: '21 Conduit St, London W1S 2XP',
  phone: '+44 7745 214646',
  hours: 'Monday to Saturday — From 11am to 7pm',
  description:
    'Situated in the heart of London, Jovoy is the perfect destination for fragrance lovers who enjoy exploring and discovering unique scents through a curated selection of niche brands in a cozy environment and surrounded by a dedicated team. Come and start/continue your perfume journey with us. Over a thousand olfactory experiences await you . . .',
  tagline: 'Jovoy Mayfair, The Embassy of Rare Perfumes in London',
  subtagline: 'More than 70 brands and 1000 different perfumes.',
}

export const storeLocations = [
  {
    id: 'paris',
    name: 'Jovoy Paris',
    href: 'https://www.jovoyparis.com/',
  },
  {
    id: 'qatar',
    name: 'Qatar',
    href: 'https://www.jovoygcc.com/',
  },
] as const

export const scentDiscoveryText =
  'Discover our exclusive selection of niche perfumes and rare fragrances, created by independent houses and visionary noses. Each niche fragrance offers a unique olfactory signature and exceptional raw materials. Try our rare fragrances with our sampling service and let yourself be seduced by confidential, elegant and unforgettable scents. Explore the world of niche fragrances and find your signature scent that reflects your personality and style.'

export const searchSuggestions = [
  'Odyssea',
  'Ambra Innamorata',
  'Jeroboam Eliksiro',
  'Nitro Musk',
  'Profumum Roma',
  'Xerjoff',
  'Exclusivity',
  'Try me samples',
  'Niche fragrances',
] as const

export const AUTH_LINKS = {
  signIn: 'https://www.jovoyparis.uk/login',
  signUp: 'https://www.jovoyparis.uk/login?create_account=1',
  forgotPassword: 'https://www.jovoyparis.uk/password-recovery',
  account: 'https://www.jovoyparis.uk/my-account',
  google: 'https://www.jovoyparis.uk/login',
  apple: 'https://www.jovoyparis.uk/login',
} as const

export const accountNavLinks = [
  { label: 'Search', href: 'https://www.jovoyparis.uk/search?controller=search', action: 'search' as const },
  { label: 'Sign in', href: AUTH_LINKS.signIn },
  { label: 'My Account', href: AUTH_LINKS.account },
  { label: 'Wishlist', href: 'https://www.jovoyparis.uk/wishlist' },
  { label: 'Cart', href: 'https://www.jovoyparis.uk/cart' },
] as const

export interface Testimonial {
  id: string
  quote: string
  author: string
  detail: string
}

export const testimonials: Testimonial[] = [
  {
    id: '1',
    quote:
      'Jovoy Mayfair transformed how I discover fragrance. The team guided me to scents I never would have found alone.',
    author: 'Elena M.',
    detail: 'Niche perfume enthusiast, London',
  },
  {
    id: '2',
    quote:
      'The Try Me service is brilliant — I sampled five exclusives before committing. Every bottle felt personally curated.',
    author: 'James R.',
    detail: 'Mayfair regular',
  },
  {
    id: '3',
    quote:
      'Over a thousand perfumes under one roof, yet it never feels overwhelming. A true embassy of rare fragrances.',
    author: 'Sophie L.',
    detail: 'First visit, now a loyal client',
  },
  {
    id: '4',
    quote:
      'From Cherry Prosecco to Astrum Nova — the exclusives here are unmatched anywhere else in the UK.',
    author: 'Amir K.',
    detail: 'Collector & connoisseur',
  },
]

export const sectionLinks = [
  { label: 'Summer Collection', href: '#summer' },
  { label: 'Curated Editions', href: '#curated' },
  { label: 'You Will Love Them', href: '#loved' },
  { label: 'Exclusives', href: '#exclusives' },
  { label: 'Testimonials', href: '#testimonials' },
]
