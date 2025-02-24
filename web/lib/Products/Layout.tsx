import { ReactNode } from 'react'
import { Consumer } from './Model'

interface LayoutExtraProps {
  children: ReactNode
}

export const Layout = Consumer<LayoutExtraProps>(
  ({ ready, children }) =>
    <div className="brand surface-5 border bdr-2 pad-4">
      <h2>Peruse Our Products</h2>
      { ready
        ? children
        : 'Loading products... (not really, just pretending)'
      }
    </div>
)

export default Layout