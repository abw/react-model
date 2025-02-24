import define           from  './vite.defs.js'
import react            from '@vitejs/plugin-react'
import svgr             from 'vite-plugin-svgr'
import tsconfigPaths    from 'vite-tsconfig-paths'
import dts              from 'vite-plugin-dts'
import { defineConfig } from 'vite'

export default defineConfig(
  ({ command }) => ({
    plugins: [
      react(),
      svgr(),
      tsconfigPaths(),
      dts({
        exclude: [
          'test',
          'web'
        ],
      })
    ],
    publicDir: command === 'build' ? false : true,
    define,
    test: {
      environment: 'jsdom',
      globals: true,
      setupFiles: './test/setup.ts',
      include: ['test/**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
      exclude: ['test/setup.ts', 'test/lib']
    },
    build: {
      minify: true,
      sourcemap: false,
      lib: {
        entry: 'lib/index.ts',
        name: '@abw/react-model',
        fileName: 'react-model',
      },
      rollupOptions: {
        external: [
          'react',
          'react-dom',
          'react/jsx-runtime'
        ],
        output: {
          globals: {
            'react': 'react',
            'react-dom': 'ReactDOM',
            'react/jsx-runtime': 'react/jsx-runtime'
          },
        },
      },
    }
  })
)
