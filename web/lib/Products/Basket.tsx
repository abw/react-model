import { useProducts } from './Model'
import InBasket from './InBasket'
import NotInBasket from './NotInBasket'

const Basket = () => {
  const {
    product,
    basket,
    quantityInBasket,
    emptyBasket
  } = useProducts()

  // Just in case we don't have a product defined (and to stop Typescript
  // from warning us that product might be undefined in the code below)
  if (! product) {
    return null
  }

  const quantity = quantityInBasket(product?.id)

  return (
    <div className="flex space bottom">
      { quantity
        ? <InBasket quantity={quantity}/>
        : <NotInBasket/>
      }
      { Object.keys(basket).length
        ? <button
            onClick={emptyBasket}
            className="red"
          >
            Empty basket
          </button>
        : <div className="small italic">
            Basket is empty
          </div>
      }
    </div>
  )
}

export default Basket