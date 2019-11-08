import React from 'react'
import {connect} from 'react-redux'
import {addToCartThunk, makeCartThunk} from '../store/cart'

const addToCartButton = props => {
  return (
    <form
      onSubmit={event => {
        event.preventDefault()
        props.addToCart(props.id, event.target.quantity.value, props.cartId)
      }}
    >
      <input name="quantity" type="number" min="1" defaultValue="1" />
      <button id={props.id} type="submit">
        Add To Cart
      </button>
    </form>
  )
}
const mapStateToProps = state => ({
  cartId: state.cart.id
})
const mapDispatchToProps = dispatch => {
  return {
    addToCart: (productId, quantity, cartId) => {
      cartId
        ? dispatch(addToCartThunk(productId, cartId, quantity))
        : dispatch(makeCartThunk(productId, quantity))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(addToCartButton)
