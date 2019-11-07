import React from 'react'
import {connect} from 'react-redux'
import {getProductThunk} from '../store/singleProduct'
//import {getReviewsThunk} from '../store/reviews'
import {NavLink} from 'react-router-dom'
import AllReviews from './all-reviews'

import {
  Image,
  Container,
  Segment,
  Grid,
  Button,
  Header
} from 'semantic-ui-react'

class SingleProduct extends React.Component {
  // constructor(props) {
  //   super(props)
  // }

  componentDidMount() {
    this.props.fetchSingleProduct(this.props.match.params.id)
  }

  render() {
    const {product} = this.props
    if (!product) return 'No Product!'
    console.log(this.props.product)

    return (
      <div>
        <Container>
          <Segment>
            <Grid columns="one">
              <Grid.Column>
                <Image src={product.imageUrl} />
              </Grid.Column>
              <Grid.Column>
                <NavLink to="/products/add">
                  <Button color="red">Add a Product</Button>
                </NavLink>
                <NavLink to={`/products/${product.id}/update`}>
                  <Button color="red">Update Product</Button>
                </NavLink>
                <Header>{product.name}</Header>
                <img src={product.imageUrl} />
                <p>
                  $
                  {(product.pricingHistories &&
                    product.pricingHistories.length &&
                    product.pricingHistories[0].price) ||
                    []}
                </p>
                <p>{product.description}</p>
                <p>Quantity: {product.quantity}</p>
                <Segment>
                  <AllReviews reviews={this.props.product.reviews || []} />
                  {/* display reviews. if there are no reviews, say there are no reviews.  */}
                </Segment>
              </Grid.Column>
            </Grid>
          </Segment>
        </Container>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    product: state.product,
    user: state.user
    //pricingHistory: state.pricingHistory
  }
}
const mapDispatchToProps = dispatch => ({
  fetchSingleProduct: id => dispatch(getProductThunk(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
