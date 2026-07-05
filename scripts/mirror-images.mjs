#!/usr/bin/env node
/**
 * Downloads Jovoy CDN images via Playwright (bypasses hotlink/bot blocks),
 * optimizes to WebP, saves under public/images/.
 * Run locally: npm run images
 */
import { createHash } from 'node:crypto'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const OUT_DIR = path.join(ROOT, 'public', 'images')
const MANIFEST_PATH = path.join(ROOT, 'src', 'data', 'imageManifest.json')

const SOURCE_FILES = [
  path.join(ROOT, 'src', 'data', 'siteData.ts'),
  path.join(ROOT, 'src', 'components', 'CTASection.tsx'),
]

const URL_RE = /https:\/\/www\.jovoyparis\.uk\/[^'"\s)]+/g

function slugFromUrl(url) {
  const hash = createHash('sha1').update(url).digest('hex').slice(0, 10)
  try {
    const pathname = new URL(url).pathname
    const base = path.basename(pathname, path.extname(pathname))
      .replace(/[^a-z0-9]+/gi, '-')
      .replace(/^-|-$/g, '')
      .slice(0, 40)
    return base ? `${base}-${hash}` : hash
  } catch {
    return hash
  }
}

function maxWidthFor(url) {
  if (url.includes('-home_default') || url.includes('-small_default')) return 420
  if (url.includes('/img/icones-footer/') || url.includes('/logo/')) return null
  if (url.endsWith('.svg')) return null
  if (url.includes('Banner') || url.includes('HomePAGE') || url.includes('1024x500')) return 1280
  if (url.includes('/img/cms/')) return 960
  return 720
}

async function collectUrls() {
  const urls = new Set()
  for (const file of SOURCE_FILES) {
    const text = await readFile(file, 'utf8')
    for (const match of text.matchAll(URL_RE)) {
      const url = match[0].replace(/\\$/, '')
      if (/\.(jpg|jpeg|png|webp|gif|svg)(\?|$)/i.test(url)) {
        urls.add(url)
      }
    }
  }
  return [...urls]
}

async function downloadWithBrowser(page, url) {
  const response = await page.goto(url, { waitUntil: 'commit', timeout: 45000 })
  if (!response || !response.ok()) {
    throw new Error(`HTTP ${response?.status() ?? 'no response'}`)
  }
  return Buffer.from(await response.body())
}

async function saveImage(url, input) {
  const ext = path.extname(new URL(url).pathname).toLowerCase()
  const slug = slugFromUrl(url)
  const isSvg = ext === '.svg'

  if (isSvg) {
    const outPath = path.join(OUT_DIR, `${slug}.svg`)
    await writeFile(outPath, input)
    return `/images/${slug}.svg`
  }

  const outPath = path.join(OUT_DIR, `${slug}.webp`)
  const maxWidth = maxWidthFor(url)
  let pipeline = sharp(input).rotate()
  if (maxWidth) {
    pipeline = pipeline.resize({ width: maxWidth, withoutEnlargement: true })
  }
  await pipeline.webp({ quality: 82, effort: 4 }).toFile(outPath)
  return `/images/${slug}.webp`
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true })
  const urls = await collectUrls()
  const manifest = {}
  let ok = 0
  let fail = 0

  console.log(`Mirroring ${urls.length} images via Playwright…`)

  const browser = await chromium.launch({ headless: true })
  const context = await browser.newContext({
    userAgent:
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  })
  const page = await context.newPage()
  await page.goto('https://www.jovoyparis.uk/', { waitUntil: 'domcontentloaded', timeout: 60000 })

  for (const url of urls) {
    try {
      const input = await downloadWithBrowser(page, url)
      const local = await saveImage(url, input)
      manifest[url] = local
      manifest[url.replace('-home_default/', '-small_default/')] = local
      ok++
      process.stdout.write('.')
    } catch (err) {
      fail++
      console.warn(`\nSkip ${url}: ${err.message}`)
    }
  }

  await browser.close()
  await writeFile(MANIFEST_PATH, `${JSON.stringify(manifest, null, 2)}\n`)
  console.log(`\nDone: ${ok} ok, ${fail} failed → ${MANIFEST_PATH}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
