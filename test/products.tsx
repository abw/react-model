import userEvent from '@testing-library/user-event'
import { Provider, Consumer, useProducts } from '@/web/lib/Products/Model.ts'
import { it, expect } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import { ReactNode } from 'react'
import { sleep } from '@abw/badger-utils'

const App = () =>
  <Provider debug={true}>
    <Layout>
      <List/>
      <Info/>
    </Layout>
  </Provider>

interface LayoutExtraProps {
  children: ReactNode
}

const Layout = Consumer<LayoutExtraProps>(
  ({ ready, children }) =>
    <div className="brand surface-5 border bdr-2 pad-4">
      <h2>Peruse Our Products</h2>
      { ready
        ? children
        : <div data-testid="loading">
            Loading products...
          </div>
      }
    </div>
)

export const List = Consumer(
  ({
    products,
    product,
    selectProduct,
    quantityInBasket
  }) =>
    <>
      <p>
        We have <span data-testid="count">{products?.length}</span> products
      </p>
      <div className="flex gap-2 mar-b-2">
        { products.map(
          p =>
            <button
              key={p.id}
              onClick={() => selectProduct(p.id)}
              data-testid={`${p.id}-button`}
              className={p.id === product?.id ? 'blue' : 'grey'}
            >
              {p.name} (<span data-testid={`${p.id}-count`}>{quantityInBasket(p.id)}</span>)
            </button>
        )}
      </div>
    </>
)

const Info = Consumer(
  ({ product, quantityInBasket }) => product
    ? <div>
        <h3 data-testid="product-name">{product.name}</h3>
        <div data-testid="product-price">£{product.price}</div>
        <div data-testid="basket-count">{quantityInBasket(product.id)}</div>
        <BasketProduct quantity={quantityInBasket(product.id)}/>
        <BasketState/>
      </div>
    : <div data-testid="prompt">
        Click to select a product.
      </div>
)

const BasketState = () => {
  const {
    basket,
    emptyBasket
  } = useProducts()

  return Object.keys(basket).length
    ? <button
        onClick={emptyBasket}
        data-testid="empty-basket"
      >
        Empty basket
      </button>
    : <div data-testid="basket-is-empty">
        Basket is empty
      </div>
}

interface BasketProductProps {
  quantity: number
}

const BasketProduct = ({ quantity }: BasketProductProps) => {
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
        You have <span data-testid="product-count">{quantity}</span> in your basket.
      </p>
      <div className="flex gap-2">
        <button
          onClick={() => addProductToBasket(product.id)}
          data-testid="add-to-basket"
        >
          Add one
        </button>
        { (quantity > 0) &&
        <button
          onClick={() => removeProductFromBasket(product?.id)}
          data-testid="remove-from-basket"
        >
          Remove
        </button>
        }
      </div>
    </div>
  )
}

it(
  'adding products to basket',
  async () => {
    render(<App/>)
    const loading = screen.getByTestId('loading')
    expect(loading).toHaveTextContent('Loading products...')

    // give the products a chance to load
    await act(
      () => sleep(1050)
    )

    const prompt = screen.getByTestId('prompt')
    expect(prompt).toHaveTextContent('Click to select a product')

    const count = screen.getByTestId('count')
    expect(count).toHaveTextContent('3')

    const fooButton = screen.getByTestId('foo-button')
    const barButton = screen.getByTestId('bar-button')
    const bazButton = screen.getByTestId('baz-button')
    const fooCount = screen.getByTestId('foo-count')
    const barCount = screen.getByTestId('bar-count')
    const bazCount = screen.getByTestId('baz-count')

    expect(fooCount).toHaveTextContent('0')
    expect(barCount).toHaveTextContent('0')
    expect(bazCount).toHaveTextContent('0')

    // select the foo product
    await userEvent.click(fooButton)

    // should have the product into
    const productName = screen.getByTestId('product-name')
    const productPrice = screen.getByTestId('product-price')
    expect(productName).toHaveTextContent('Apple')
    expect(productPrice).toHaveTextContent('1.99')

    // basket is empty
    const basketState = screen.getByTestId('basket-is-empty')
    expect(basketState).toHaveTextContent('Basket is empty')

    // product count is 0
    const productCount = screen.getByTestId('product-count')
    expect(productCount).toHaveTextContent('0')

    // add to basket
    const addToBasket = screen.getByTestId('add-to-basket')
    await userEvent.click(addToBasket)
    expect(productCount).toHaveTextContent('1')
    expect(fooCount).toHaveTextContent('1')

    // add another one to basket
    await userEvent.click(addToBasket)
    expect(productCount).toHaveTextContent('2')
    expect(fooCount).toHaveTextContent('2')

    // select the bar product
    await userEvent.click(barButton)

    // should have the product into
    expect(productName).toHaveTextContent('Banana')
    expect(productPrice).toHaveTextContent('2.99')

    // add three to basket
    await userEvent.click(addToBasket)
    expect(productCount).toHaveTextContent('1')
    await userEvent.click(addToBasket)
    expect(productCount).toHaveTextContent('2')
    await userEvent.click(addToBasket)
    expect(productCount).toHaveTextContent('3')

    // check counts
    expect(fooCount).toHaveTextContent('2')
    expect(barCount).toHaveTextContent('3')
    expect(bazCount).toHaveTextContent('0')

    // select the baz product
    await userEvent.click(bazButton)

    // should have the product into
    expect(productName).toHaveTextContent('Coconut')
    expect(productPrice).toHaveTextContent('3.99')

    // add one to basket
    await userEvent.click(addToBasket)
    expect(productCount).toHaveTextContent('1')

    // check counts
    expect(fooCount).toHaveTextContent('2')
    expect(barCount).toHaveTextContent('3')
    expect(bazCount).toHaveTextContent('1')

    // remove bar from basket
    const removeFromBasket = screen.getByTestId('remove-from-basket')
    await userEvent.click(removeFromBasket)

    // check counts
    expect(fooCount).toHaveTextContent('2')
    expect(barCount).toHaveTextContent('3')
    expect(bazCount).toHaveTextContent('0')

    // empty the basket
    const emptyBasket = screen.getByTestId('empty-basket')
    await userEvent.click(emptyBasket)

    // check counts
    expect(fooCount).toHaveTextContent('0')
    expect(barCount).toHaveTextContent('0')
    expect(bazCount).toHaveTextContent('0')

    // check the basket is empty
    expect(basketState).toHaveTextContent('Basket is empty')
  }
)

