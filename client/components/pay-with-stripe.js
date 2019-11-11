/* eslint-disable camelcase */
import React from 'react'
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios'
import {withRouter} from 'react-router-dom'
import {toast} from 'react-toastify'

toast.configure()

const PayWithStripe = props => {
  const {order} = props

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

      toast('Success! Check email for details', {type: 'success'})
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

export default withRouter(PayWithStripe)
