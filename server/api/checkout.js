/* eslint-disable camelcase */
const router = require('express').Router()
const stripe = require('stripe')(process.env.STRIPE_SECRET)
const {Order, PurchaseProfile} = require('../db/models')
module.exports = router

router.put('/:orderId/newProfile', async (req, res, next) => {
  const profile = await PurchaseProfile.create(req.body)
  if (req.user && req.user.id) await profile.setUser(req.user.id)
  Order.findByPk(req.params.orderId)
    .then(dbRes => dbRes.setPurchaseProfile(profile))
    .then(() => res.sendStatus(204))
    .catch(err => next(err))
})

router.post('/:orderId/existingProfile/:profileId', (req, res, next) => {
  Order.findByPk(req.params.orderId)
    .then(ord => ord.setPurchaseProfile(req.params.profileId))
    .then(() => res.sendStatus(204))
    .catch(next)
})

router.post('/:orderId/pay/stripe', async (req, res, next) => {
  try {
    const {token, order, orderTotal} = req.body
    const {
      shipToAddress1,
      shipToAddress2,
      shipToCity,
      shipToState,
      shipToPostalCode,
      email
    } = order.purchaseProfile

    const address = {
      line1: shipToAddress1,
      line2: shipToAddress2,
      city: shipToCity,
      state: shipToState,
      country: 'United States',
      postal_code: shipToPostalCode
    }

    const customer = await stripe.customers.create({
      email,
      source: token.id
    })

    // Idempotency key is used to prevent duplicate purchase on same order.
    const idempotency_key =
      '' +
      order.id +
      order.products.reduce((acc, product) => {
        return acc + 'PID' + product.id + 'QTY' + product.orderProduct.quantity
      }, '')

    const charge = await stripe.charges.create(
      {
        amount: orderTotal,
        currency: 'usd',
        customer: customer.id,
        receipt_email: token.email,
        description: `Order ID: ${order.id}`,
        shipping: {
          name: token.card.name,
          address
        }
      },
      {
        idempotency_key
      }
    )

    console.log('Charge: ', {charge})

    const orderToUpdate = await Order.findByPk(req.params.orderId)
    await orderToUpdate.update({status: 'purchased'})
  } catch (err) {
    next(err)
  }

  res.sendStatus(200)
})
