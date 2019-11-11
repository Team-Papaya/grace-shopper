/* eslint-disable camelcase */
import React from 'react'
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios'
import {toast} from 'react-toastify'

toast.configure()

const PayWithStripe = props => {
  const {order} = props

  // TODO!!! - get orderTotal from prices of items
  const orderTotal = 101

  const handleToken = async token => {
    try {
      const {data} = await axios.post(`/api/checkout/${order.id}/pay/stripe`, {
        token,
        order
      })

      const {status} = data
      if (status === 'success') {
        toast('Success! Check email for details', {type: 'success'})
      } else {
        toast('Something went wrong', {type: 'error'})
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

export default PayWithStripe
