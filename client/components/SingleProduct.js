import React from 'react'
import {connect} from 'react-redux'
import {getProductThunk} from '../store/singleProduct'
//import {reviews} from 'reviews'

const SingleProduct = props => {
  // const productId = Number(props.match.params.productId)
  // const product = state.products.find(product => product.id === productId)

  const {product} = props
  //console.log('props: ', props)
  if (!product) return 'No Product!'
  return (
    <div>
      <h1>{product.name}</h1>
      <img src={product.imageUrl} />
      <p>{product.description}</p>
      <p>{product.quantity}</p>
    </div>
    //display reviews. if there are no reviews, say there are no reviews.
  )
}

const mapStateToProps = (state, ownProps) => {
  const productId = Number(ownProps.match.params.productId)
  console.log(state)
  const findProduct = state.products.find(product => product.id === productId)
  return {
    product: findProduct
  }
}
const mapDispatchToProps = dispatch => ({
  //fetchSingleProduct: id => dispatch(getProductThunk(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
