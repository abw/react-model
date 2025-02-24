import { useProducts } from './Model.js'

interface InBasketProps {
  quantity: number
}

const InBasket = ({ quantity }: InBasketProps) => {
  const {
    product,
    addProductToBasket,
    removeProductFromBasket
  } = useProducts()

  // Just in case we don't have a product defined (and to stop Typescript
  // from warning us that product might be undefined in the code below)
  if (! product) {
    return null
  }

  return (
    <div>
      <p>
        You have {quantity} in your basket.
      </p>
      <div className="flex gap-2">
        <button
          onClick={() => addProductToBasket(product.id)}
          className="green"
        >
          Add one
        </button>
        <button
          onClick={() => removeProductFromBasket(product?.id)}
          className="orange"
        >
          Remove
        </button>
      </div>
    </div>
  )
}

export default InBasket