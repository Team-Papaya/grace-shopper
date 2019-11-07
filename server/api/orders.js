const router = require('express').Router()
const {Order} = require('../db/models')
module.exports = router

router.post('/', (req, res, next) => {
  const {productId, qty} = req.body

  Order.create({
    sessionId: req.session.id
  })
    .then(promisedOrder => {
      console.log(
        'Promised order - addProduct: ',
        promisedOrder.addProduct(productId, {through: {quantity: qty}})
      )
      return promisedOrder.addProduct(productId, {through: {quantity: qty}})
    })
    .then(finalPromisedOrder => {
      console.log('final: ', finalPromisedOrder)
      res.json(finalPromisedOrder)
    })
    .catch(next)
})
