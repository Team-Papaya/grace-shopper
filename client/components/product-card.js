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
          Rating: {product.rating} ({product.reviews.length} reviews)
        </div>
      </div>
    </div>
  )
}

export default ProductCard
