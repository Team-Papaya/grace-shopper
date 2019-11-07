import React from 'react'
import {getCartThunk} from '../store/cart'
import {connect} from 'react-redux'
import {Container, Segment, Grid, Button, Header} from 'semantic-ui-react'

export class Cart extends React.Component {
  componentDidMount() {
    this.props.fetchCart(this.props.match.params.userId)
  }
  render() {
    const cart = this.props.cart
    let prices = {}
    let total = 0
    console.log(prices)
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
                  prices[product.name] = product.pricingHistories[0].price
                  total += product.quantity * prices[product.name]
                  return (
                    <Grid.Row key={product.id}>
                      <h3>{product.name}</h3>
                      <h5>Qty: {product.quantity}</h5>{' '}
                      <h5>Price: ${product.quantity * prices[product.name]}</h5>
                    </Grid.Row>
                  )
                })}
              </Grid>
            </Segment>
            <div className="cart-checkout-panel">
              <div>
                <h3>Total Amount: ${total}</h3>
              </div>
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
    fetchCart: userId => dispatch(getCartThunk(userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
