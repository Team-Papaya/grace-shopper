import React from 'react'
import {Image, Container, Segment, Header, Rating} from 'semantic-ui-react'

const ProductCard = props => {
  const {product} = props

  return (
    <div>
      <Container>
        <Segment>
          <div>
            <Image src={product.imageUrl[0]} />
          </div>
          <div>
            <Header>{product.name}</Header>
            <div>
              Price: $
              {product.pricingHistories.length
                ? product.pricingHistories[0].price
                : 'No price set for this product'}
              <br />
              <Rating
                icon="star"
                maxRating={10}
                defaultRating={product.reviews.reduce(
                  (acc, curr) => acc + curr.rating / product.reviews.length,
                  0
                )}
              />
              Rating: ({product.reviews.length} reviews)
            </div>
          </div>
        </Segment>
      </Container>
    </div>
  )
}

export default ProductCard
