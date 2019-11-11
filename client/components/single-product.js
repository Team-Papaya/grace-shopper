import React from 'react'
import {connect} from 'react-redux'
import {getProductThunk} from '../store/singleProduct'
import {getCategoriesThunk} from '../store/categories'
import {NavLink} from 'react-router-dom'
import AllReviews from './all-reviews'
import {SidebarComponent, NewReviewForm} from './'
import {
  Image,
  Container,
  Segment,
  Grid,
  Button,
  Header,
  Icon
} from 'semantic-ui-react'

class SingleProduct extends React.Component {
  componentDidMount() {
    this.props.getProductThunk(this.props.match.params.id)
  }

  render() {
    const {product} = this.props
    if (!product) return 'No Product!'
    const categories = product.categories
    return (
      <div>
        <SidebarComponent />
        <Container>
          <Segment>
            <Grid columns="one">
              <Grid.Column>
                <NavLink to="/cart">
                  <Button animated="vertical" color="green">
                    <Button.Content hidden>
                      <Icon name="shop" />
                    </Button.Content>
                    <Button.Content visible>Add to Cart</Button.Content>
                  </Button>
                </NavLink>
                <NavLink to="/products/add">
                  <Button color="red">Add a Product</Button>
                </NavLink>
                <NavLink to={`/products/${product.id}/update`}>
                  <Button color="red">Update Product</Button>
                </NavLink>
                <Header>{product.name}</Header>
                <Grid.Column>
                  <Image size="medium" src={product.imageUrl} />
                </Grid.Column>
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
                <Segment>
                  <Header as="h3">Categories:</Header>
                  {categories &&
                    categories.map(category => (
                      <li key={category.id}>{category.name}</li>
                    ))}
                </Segment>
              </Grid.Column>
            </Grid>
          </Segment>
          <Segment>
            <NewReviewForm
              productId={product.id}
              username={this.props.user.username}
            />
          </Segment>
        </Container>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    product: state.product,
    user: state.singleUser
    //pricingHistory: state.pricingHistory
  }
}
const mapDispatchToProps = dispatch => ({
  getProductThunk: id => dispatch(getProductThunk(id)),
  getCategory: categoryTag => dispatch(getCategoriesThunk(categoryTag))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
