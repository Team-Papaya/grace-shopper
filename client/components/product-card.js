import React from 'react'

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
            ? product.pricingHistories[0]
            : 'No Price set for this product'}
          Rating:{' '}
          {product.reviews.reduce(
            (acc, curr) => acc + curr.rating / product.reviews.length,
            0
          )}{' '}
          ({product.reviews.length} reviews)
        </div>
      </div>
    </div>
  )
}

export default ProductCard
