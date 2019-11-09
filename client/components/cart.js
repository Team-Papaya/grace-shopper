import React from 'react'
import {getCartThunk} from '../store/cart'
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
        <br />
        <Container>
          <Segment>
            <div className="cart-topbar">
              <div>
                <h1>Review Your Order</h1>
              </div>
            </div>
            <br />
            {!cart.purchaseProfile ? (
              <div>
                <div>
                  <h3>Shipping Information</h3>
                </div>
                <Segment>
                  <div>Purchase Profile Fields!</div>
                </Segment>
              </div>
            ) : (
              <div>
                <NavLink to="/cart/checkout/shipping">
                  <Button type="button" color="red">
                    Select Shipping Info
                  </Button>
                </NavLink>
              </div>
            )}

            <br />
            <div>
              <h3>
                {Array.isArray(cart.products) ? cart.products.length : '0'}{' '}
                Items in Cart
              </h3>
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
                    </Grid.Row>
                  )
                })}
              </Grid>
            </Segment>
            <br />
            <div className="cart-checkout-panel">
              <Grid>
                <div>
                  <h3>Total Amount: ${total}</h3>
                </div>
                {!cart.purchaseProfile ? (
                  <NavLink to="/cart/checkout/shipping">
                    <Button type="button" color="green">
                      Confirm & Pay
                    </Button>
                  </NavLink>
                ) : (
                  <div />
                )}
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
    fetchCart: () => dispatch(getCartThunk())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
