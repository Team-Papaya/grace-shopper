import React from 'react'
import AddToCartButton from './addToCart'
const ProductCard = props => {
  const {product} = props

  return (
    <div>
      <div>
        <img src={product.imageUrl[0]} />
      </div>
      <div>
        <div>{product.name}</div>
        <div>
          Price:{' '}
          {product.pricingHistories.length
            ? product.pricingHistories[0].price
            : 'No Price set for this product'}
          Rating:{' '}
          {product.reviews.reduce(
            (acc, curr) => acc + curr.rating / product.reviews.length,
            0
          )}{' '}
          ({product.reviews.length} reviews)
          <AddToCartButton id={product.id} />
        </div>
      </div>
    </div>
  )
}

export default ProductCard
