import React from 'react'
import {getCartThunk, removeFromCartThunk} from '../store/cart'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import {Container, Segment, Grid, Button, Header} from 'semantic-ui-react'

export class Cart extends React.Component {
  componentDidMount() {
    this.props.fetchCart()
  }

  render() {
    const cart = this.props.cart
    let prices = {}
    let total = 0
    if (!Array.isArray(cart.products) || !cart.products.length > 0) {
      return 'Your cart is empty!'
    }
    return (
      <div>
        <Container>
          <Segment>
            <div className="cart-topbar">
              <div>
                <h1>Cart</h1>
              </div>
              <div>
                <h3>
                  {Array.isArray(cart.products) ? cart.products.length : '0'}{' '}
                  Items in Cart
                </h3>
              </div>
            </div>
            <Segment>
              <Grid row={cart.products.length}>
                {cart.products.map(product => {
                  console.log('Prices in map: ', prices)
                  console.log('Product in map: ', product)
                  prices[product.name] = product.pricingHistories[0].price
                  total += product.orderProduct.quantity * prices[product.name]
                  return (
                    <Grid.Row key={product.id}>
                      <h3>{product.name}</h3>
                      <h5>Qty: {product.orderProduct.quantity}</h5>{' '}
                      <h5>
                        Price: ${product.orderProduct.quantity *
                          prices[product.name]}
                      </h5>
                      <button
                        type="button"
                        onClick={() =>
                          this.props.removeFromCart(cart.id, product.id)
                        }
                      >
                        Remove From Cart{' '}
                      </button>
                    </Grid.Row>
                  )
                })}
              </Grid>
            </Segment>
            <div className="cart-checkout-panel">
              <Grid>
                <div>
                  <h3>Total Amount: ${total}</h3>
                </div>
                <div>
                  <NavLink to="/cart/checkout/shipping">
                    <Button type="button">Select Shipping Info</Button>
                  </NavLink>
                </div>
              </Grid>
            </div>
          </Segment>
        </Container>
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
    //!!!!!!!!!!!!!!userId should come out of the api route and the thunk as soon as Chris and I have the same code on master!!!!!!!!!!!!!
    fetchCart: () => dispatch(getCartThunk()),
    removeFromCart: (cartId, orderId) =>
      dispatch(removeFromCartThunk(cartId, orderId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
