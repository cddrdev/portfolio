import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { securityHeaders } from './security.config.js'

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'production-security',
      apply: 'build',
      transformIndexHtml() {
        return [{
          tag: 'meta',
          attrs: {
            'http-equiv': 'Content-Security-Policy',
            content: securityHeaders['Content-Security-Policy'].replace("; frame-ancestors 'none'", ''),
          },
          injectTo: 'head-prepend',
        }]
      },
      generateBundle() {
        this.emitFile({
          type: 'asset',
          fileName: '_headers',
          source: `/*\n${Object.entries(securityHeaders).map(([name, value]) => `  ${name}: ${value}`).join('\n')}\n/assets/*\n  Cache-Control: public, max-age=31536000, immutable\n`,
        })
      },
    },
  ],
  preview: { headers: securityHeaders },
  build: { sourcemap: false },
})
