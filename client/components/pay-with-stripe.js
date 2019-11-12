/* eslint-disable camelcase */
import React from 'react'
import {connect} from 'react-redux'
import {removeCart} from '../store/cart'
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios'
import {withRouter} from 'react-router-dom'
import {toast} from 'react-toastify'

toast.configure()

const PayWithStripe = props => {
  const {order, clearCart} = props

  const orderTotal = order.products.reduce((acc, product) => {
    return (
      acc + product.pricingHistories[0].price * product.orderProduct.quantity
    )
  }, 0)

  const handleToken = async token => {
    try {
      await axios.post(`/api/checkout/${order.id}/pay/stripe`, {
        token,
        order,
        orderTotal
      })

      clearCart()
      props.history.push('/order/confirm/') // Refactor later to include order summary
    } catch (err) {
      console.error(err)
      toast('Something went wrong', {type: 'error'})
      props.history.push('/cart')
    }
  }

  return (
    <div>
      <StripeCheckout
        stripeKey="pk_test_P6XebBfeXMKQltqUrGdne5s500lLHMyqbH"
        token={handleToken}
        email={order.purchaseProfile.email}
        amount={orderTotal}
        name={"Papa's Attic"}
      />
    </div>
  )
}

const mapDispatch = dispatch => {
  return {
    clearCart: () => dispatch(removeCart())
  }
}

export default withRouter(connect(null, mapDispatch)(PayWithStripe))
