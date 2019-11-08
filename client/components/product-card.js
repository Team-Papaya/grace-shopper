import React from 'react'
import {
  Image,
  Container,
  Segment,
  Header,
  Rating,
  Grid
} from 'semantic-ui-react'
import AddToCartButton from './addToCart'
const ProductCard = props => {
  const {product} = props

  return (
    <div>
      <Container>
        <Segment height="10px">
          <Grid>
            <div>
              <Image size="small" src={product.imageUrl[0]} />
            </div>
            <div>
              <Header as="h2">{product.name}</Header>
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
          </Grid>
        </Segment>
      </Container>
      <AddToCartButton id={product.id} />
    </div>
  )
}

export default ProductCard
