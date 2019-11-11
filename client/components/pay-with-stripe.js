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
      const {data} = await axios.post(`/api/checkout/${order.id}/pay/stripe`, {
        token,
        order,
        orderTotal
      })

      const {status} = data
      if (status === 'success') {
        await axios.put(`/api/orders/${order.id}/status`, {status: 'purchased'})
        toast('Success! Check email for details', {type: 'success'})
        props.history.push('/order/confirm/') // Refactor later to include order summary
      } else {
        toast('Something went wrong', {type: 'error'})
        props.history.push('/cart')
      }
    } catch (err) {
      console.error(err)
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
