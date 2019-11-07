import React from 'react'
import {connect} from 'react-redux'
import {getProductThunk} from '../store/singleProduct'
import {getReviewsThunk} from '../store/reviews'
import {NavLink} from 'react-router-dom'
import AllReviews from './all-reviews'
import {
  Image,
  Container,
  Segment,
  Grid,
  Button,
  Input,
  Label,
  Modal,
  Header
} from 'semantic-ui-react'

class SingleProduct extends React.Component {
  // constructor(props) {
  //   super(props)
  // }

  componentDidMount() {
    this.props.fetchSingleProduct(this.props.match.params.id)
    this.props.fetchAllReviews()
  }

  render() {
    const {product} = this.props
    if (!product) return 'No Product!'
    console.log(this.props.reviews)

    return (
      <div>
        <Container>
          <Segment>
            <Grid columns="one" stackable divided>
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
                <h1>{product.name}</h1>
                <img src={product.imageUrl} />
                <p>{product.description}</p>
                <p>{product.quantity}</p>
                <Segment>
                  <AllReviews reviews={this.props.reviews} />
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
    reviews: state.reviews,
    user: state.user
  }
}
const mapDispatchToProps = dispatch => ({
  fetchSingleProduct: id => dispatch(getProductThunk(id)),
  fetchAllReviews: () => dispatch(getReviewsThunk())
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
