import { useProducts } from './Model.js'

export const NotInBasket = () => {
  const { product, addProductToBasket } = useProducts()

  // Just in case we don't have a product defined (and to stop Typescript
  // from warning us that product might be undefined in the code below)
  if (! product) {
    return null
  }

  return (
    <div>
      <p>
        You don&apos;t have any in your basket.
      </p>
      <div>
        <button
          onClick={() => addProductToBasket(product.id)}
          className="green"
        >
          Add one
        </button>
      </div>
    </div>
  )
}

export default NotInBasket