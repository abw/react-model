import Basket from './Basket'
import { Consumer } from './Model'

export const Info = Consumer(
  ({ product }) => product
    ? <div className="grey surface-5 border bdr-1 pad-a-4 mar-t-4">
        <h3>{product.name}</h3>
        <div className="large price">£{product.price}</div>
        <Basket/>
      </div>
    : <div className="prompt">
        Click on a button to select a product.
      </div>
)

export default Info