import { chromium } from 'playwright'
import { mkdir } from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outDir = path.join(__dirname, '../docs/proposal-images')
const demo = 'http://127.0.0.1:5173/'
const original = 'https://www.jovoyparis.uk/'

async function shot(page, name) {
  await page.screenshot({ path: path.join(outDir, name), fullPage: false })
  console.log('saved', name)
}

async function run() {
  await mkdir(outDir, { recursive: true })
  const browser = await chromium.launch({ headless: true })

  // Demo mobile
  const m = await browser.newPage({ viewport: { width: 390, height: 844 } })
  await m.goto(demo, { waitUntil: 'networkidle' })
  await m.waitForTimeout(1800)
  await shot(m, 'demo-mobile-home.png')
  await m.click('button[aria-label="Search"]').catch(() => m.getByRole('button', { name: 'Search' }).first().click())
  await m.waitForTimeout(600)
  await shot(m, 'demo-mobile-search.png')
  await m.keyboard.press('Escape')
  await m.waitForTimeout(400)
  await m.getByRole('button', { name: 'Contact' }).click()
  await m.waitForTimeout(600)
  await shot(m, 'demo-mobile-contact.png')
  await m.close()

  // Demo desktop
  const d = await browser.newPage({ viewport: { width: 1440, height: 900 } })
  await d.goto(demo, { waitUntil: 'networkidle' })
  await d.waitForTimeout(1800)
  await shot(d, 'demo-desktop-home.png')
  await d.locator('header button[aria-label="Search"]').click()
  await d.waitForTimeout(600)
  await shot(d, 'demo-desktop-search.png')
  await d.keyboard.press('Escape')
  await d.waitForTimeout(400)
  await d.getByRole('button', { name: 'Contact' }).hover()
  await d.waitForTimeout(800)
  await shot(d, 'demo-desktop-contact.png')
  await d.close()

  // Original mobile
  const om = await browser.newPage({ viewport: { width: 390, height: 844 } })
  await om.goto(original, { waitUntil: 'networkidle', timeout: 60000 })
  await om.waitForTimeout(2000)
  await shot(om, 'original-mobile-home.png')
  await om.close()

  // Original desktop
  const od = await browser.newPage({ viewport: { width: 1440, height: 900 } })
  await od.goto(original, { waitUntil: 'networkidle', timeout: 60000 })
  await od.waitForTimeout(2000)
  await shot(od, 'original-desktop-home.png')
  // header search area
  await od.locator('input[name="s"], input[type="search"], #search_widget input').first().scrollIntoViewIfNeeded().catch(() => {})
  await shot(od, 'original-desktop-search.png')
  await od.getByRole('link', { name: 'Contact' }).first().hover().catch(() => {})
  await od.waitForTimeout(500)
  await shot(od, 'original-desktop-header.png')
  await od.close()

  await browser.close()
}

run().catch((e) => { console.error(e); process.exit(1) })
