import { Consumer } from './Model'

export const List = Consumer(
  ({
    products,
    product,
    selectProduct,
    quantityInBasket
  }) =>
    <>
      <p>
        We have {products?.length} awesome products!
      </p>
      <div className="flex gap-2 mar-b-2">
        { products.map(
          p =>
            <button
              key={p.id}
              onClick={() => selectProduct(p.id)}
              className={p.id === product?.id ? 'blue' : 'grey'}
            >
              {p.name} ({quantityInBasket(p.id)})
            </button>
        )}
      </div>
    </>
)

export default List