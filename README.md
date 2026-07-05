# Jovoy Mayfair — Homepage Redesign

Interactive homepage prototype and owner pitch landing page.

## Live URLs (after Vercel deploy)

| Page | Path |
|------|------|
| Homepage demo | `https://jovoy-redesign.vercel.app` |
| Owner pitch (share this) | `https://jovoy-redesign.vercel.app/pitch` |

## Local development

```bash
npm install
npm run dev
```

Open `http://127.0.0.1:5173/` for the demo and `http://127.0.0.1:5173/pitch` for the pitch page.

## Deploy to Vercel

1. Create repo: [github.com/new](https://github.com/new) → name it `jovoy-redesign` (empty, no README).
2. Push code:

```bash
chmod +x scripts/push-to-github.sh
./scripts/push-to-github.sh
```

3. In [Vercel](https://vercel.com/dashboard), import `techakshay006/jovoy-redesign`. Settings are in `vercel.json` (Vite, output `dist`).

## Stack

Vite · React · TypeScript · Tailwind CSS v4 · Framer Motion
