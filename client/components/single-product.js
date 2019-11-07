import React from 'react'
import {connect} from 'react-redux'
import {getProductThunk} from '../store/singleProduct'
import {NavLink} from 'react-router-dom'
import AllReviews from './all-reviews'

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
    return (
      <div>
        <NavLink to="/productsAdd">Add a Product</NavLink>
        {/* <a href="/products/add">
          <button>Add a Product</button>
        </a> */}
        <h1>{product.name}</h1>
        <img src={product.imageUrl} />
        <p>{product.description}</p>
        <p>{product.quantity}</p>
        <AllReviews reviews={this.props.reviews} />
        {/* display reviews. if there are no reviews, say there are no reviews.  */}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    product: state.product,
    reviews: state.reviews
  }
}
const mapDispatchToProps = dispatch => ({
  fetchSingleProduct: id => dispatch(getProductThunk(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
