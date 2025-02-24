import react            from '@vitejs/plugin-react'
import mdx              from '@mdx-js/rollup'
import define           from  './vite.defs.js'
import svgr             from 'vite-plugin-svgr'
import tsconfigPaths    from 'vite-tsconfig-paths'
import rehypeCodeProps  from 'rehype-mdx-code-props'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    {
      enforce: 'pre',
      ...mdx({
        rehypePlugins: [rehypeCodeProps],
        providerImportSource: '@mdx-js/react'
      })
    },
    react({
      include: /\.(jsx|js|mdx|md|tsx|ts)$/
    }),
    svgr(),
    tsconfigPaths({ root: '../' }),
  ],
  root: 'web',
  base: '/react-model/',
  envDir: '../',
  define,
  build: {
    emptyOutDir: true,
    outDir: '../docs',
    chunkSizeWarningLimit: 1800
  }
})

