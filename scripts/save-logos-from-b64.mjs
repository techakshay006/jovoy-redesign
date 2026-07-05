import { writeFileSync, mkdirSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outDir = path.join(__dirname, '..', 'public', 'logo')
mkdirSync(outDir, { recursive: true })

// Fetched from jovoyparis.uk via browser (official Jovoy brand SVGs)
const logos = {
  'jovoy-logo.svg': process.env.LOGO_B64 ?? '',
  'jovoy-logo-white.svg': process.env.LOGO_WHITE_B64 ?? '',
}

for (const [name, b64] of Object.entries(logos)) {
  if (!b64) {
    console.error(`Missing base64 for ${name}`)
    process.exit(1)
  }
  const buf = Buffer.from(b64, 'base64')
  writeFileSync(path.join(outDir, name), buf)
  console.log(`${name}: ${buf.length} bytes`)
}
