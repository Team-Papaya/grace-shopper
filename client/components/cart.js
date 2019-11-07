import React from 'react'
import {getCartThunk} from '../store/cart'
import {connect} from 'react-redux'

export class Cart extends React.Component {
  componentDidMount() {
    this.props.fetchCart(this.props.match.params.userId)
  }
  render() {
    const cart = this.props.cart
    let prices = {}
    console.log(cart)
    return (
      <div id="cart">
        <div className="cart-topbar">
          <div>
            <h1>Cart</h1>
          </div>
          <div>
            <h3>
              {Array.isArray(cart.products) ? cart.products.length : '0'} Items
              in Cart
            </h3>
          </div>
        </div>
        <div className="cart-product-list">
          {Array.isArray(cart.products) && cart.products.length > 0
            ? cart.products.map(product => {
                prices[product.name] = product.pricingHistories[0].price
                return (
                  <div className="cart-item" key={product.id}>
                    <span>
                      {product.name} Qty: {product.quantity} Price: ${product.quantity *
                        Number(prices[product.name])}
                    </span>
                  </div>
                )
              })
            : 'Your cart is empty!'}
        </div>}
        <div className="cart-checkout-panel">
          <div>
            <h3>Total Amount: ${}</h3>
          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    cart: state.cart
  }
}
const mapDispatchToProps = dispatch => {
  return {
    fetchCart: userId => dispatch(getCartThunk(userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
