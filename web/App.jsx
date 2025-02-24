import React    from 'react'
import site     from './config/site.jsx'
import sidebar  from './config/sidebar.jsx'
import { MDXProvider } from '@mdx-js/react'
import { SiteProvider, mdxComponents } from '@abw/badger-website'
import './styles/react-model.scss'

const pages = import.meta.glob(
  './pages/**/[a-z_]*.{jsx,mdx}',
  { eager: true }
)

const snippets = import.meta.glob(
  './snippets/**/*',
  {
    query: '?raw',
    import: 'default',
  }
)

const App = () =>
  <MDXProvider components={mdxComponents}>
    <SiteProvider
      site={site}
      pages={pages}
      sidebar={sidebar}
      snippets={snippets}
      sidebarToc
      // debugPages
    />
  </MDXProvider>

export default App