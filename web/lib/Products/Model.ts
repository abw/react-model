import { Model, debugFunction } from '@/lib/index'
{/* START */}
// PRETEND: import { Model, debugFunction } from '@abw/react-model'
import { fail, sleep } from '@abw/badger-utils'
import { useCallback, useEffect, useMemo, useState } from 'react'

// Define some types for the product records and basket
type ProductRecord = {
  id: string,
  name: string,
  price: string
}
type ProductRecords = ProductRecord[]
type ProductIndex = Record<string, ProductRecord>
type BasketItem = {
  product: ProductRecord
  quantity: number
}
type Basket = Record<string, BasketItem>

// Properties that can be passed to the Product model (via Provider)
interface ProductsProps {
  debug: boolean
}

// Some sample products (these would usually come from an API call)
const sampleProducts: ProductRecords = [
  { id: 'foo', name: 'Apple', price: '1.99' },
  { id: 'bar', name: 'Banana', price: '2.99' },
  { id: 'baz', name: 'Coconut', price: '3.99' },
]

const Products = ({ debug }: ProductsProps) => {
  // State variables for the model.  Note that most of these are typed
  // using the types we defined above.
  const [ready, setReady] = useState(false)
  const [products, setProducts] = useState<ProductRecords>([ ])
  const [productIndex, setProductIndex] = useState<ProductIndex>({ })
  const [product, setProduct] = useState<ProductRecord>()
  const [basket, setBasket] = useState<Basket>({ })

  // A useful debugging function, enabled via the debug flag.
  // View the Javascript console to see it in action.
  const dbg = useMemo(
    () => debugFunction({
      debug,
      debugPrefix: 'Products > ',
      debugColor: 'orangered'
    }),
    [debug]
  )

  // Function to load products.  This would usually involve an API call
  // but we'll simulated it by sleeping for a second (so we can show the
  // loading status) and then setting the products from the sampleProducts
  // above.
  const loadProducts = useCallback(
    () => {
      dbg('loadProducts()')
      sleep(1000).then(
        () => {
          setProducts([...sampleProducts])
          setProductIndex(
            sampleProducts.reduce(
              (byId, product) => {
                byId[product.id] = product
                return byId
              },
              { } as ProductIndex
            )
          )
          setReady(true)
        }
      )
    },
    [dbg]
  )

  // Function to select a product by id, fetching it from productIndex
  // and setting it as product
  const selectProduct = useCallback(
    (id: string) => {
      dbg(`selectProduct(${id})`)
      setProduct(
        productIndex[id]
      )
    },
    [productIndex, dbg]
  )

  // Add a product to the basket, setting the initial quantity to 0
  // and then incrementing every time it's added again
  const addProductToBasket = useCallback(
    (id: string) => {
      dbg(`addProductToBasket(${id})`)
      const product  = productIndex[id] || fail(`Invalid product: ${id}`)
      const quantity = (basket[id]?.quantity || 0) + 1
      setBasket({
        ...basket,
        [id]: { product, quantity }
      })
    },
    [productIndex, basket, dbg]
  )

  // Return the quantity of a product in the basket
  const quantityInBasket = useCallback(
    (id: string) => basket[id]?.quantity ?? 0,
    [basket]
  )

  const removeProductFromBasket = useCallback(
    (id: string) => {
      dbg(`removeProductFromBasket(${id})`)
      const newBasket = { ...basket }
      delete newBasket[id]
      setBasket(newBasket)
    },
    [basket, dbg]
  )

  // Empty all items from the basket
  const emptyBasket = useCallback(
    () => {
      dbg('emptyBasket()')
      setBasket({ })
    },
    [dbg]
  )

  // Start loading the products when first rendered
  useEffect(
    loadProducts,
    [loadProducts]
  )

  // Return an object containing the model data we want to share
  return {
    ready,
    products,
    productIndex,
    product,
    selectProduct,
    basket,
    addProductToBasket,
    quantityInBasket,
    removeProductFromBasket,
    emptyBasket
  }
}

// Wrap the Products model using the Model() higher order component
// and define named exports for the Provider, Consumer and Use hook
// (aliases to useProducts)
export const {
  Provider,
  Consumer,
  Use: useProducts
} = Model(Products)
