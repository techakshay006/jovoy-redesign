import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/** Vercel rewrites /pitch → /pitch/index.html; mirror that in Vite dev/preview. */
function pitchPagePlugin(): Plugin {
  const rewritePitch = (req: { url?: string }, _res: unknown, next: () => void) => {
    const [pathname, search = ''] = (req.url ?? '').split('?')
    if (pathname === '/pitch' || pathname === '/pitch/') {
      req.url = `/pitch/index.html${search ? `?${search}` : ''}`
    }
    next()
  }

  return {
    name: 'pitch-page',
    configureServer(server) {
      server.middlewares.use(rewritePitch)
    },
    configurePreviewServer(server) {
      server.middlewares.use(rewritePitch)
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), pitchPagePlugin()],
  server: {
    port: 5173,
    strictPort: false,
    host: '127.0.0.1',
  },
  preview: {
    port: 5173,
    strictPort: false,
    host: '127.0.0.1',
  },
})
