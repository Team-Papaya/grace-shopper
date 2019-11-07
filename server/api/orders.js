const router = require('express').Router()
const {Order, Product} = require('../db/models')
module.exports = router

router.post('/', async (req, res, next) => {
  try {
    const {productId, qty} = req.body

    // REVIEW: any chance this could be findOrCreate?
    const order = await Order.create({
      sessionId: req.session.id
    })

    const product = await Product.findByPk(Number(productId))
    await order.addProduct(product, {through: {quantity: Number(qty)}})

    // REVIEW: why not use the existing `order` variable?
    //res.json(await order.reload())
    res.json(await Order.findByPk(order.id))
  } catch (err) {
    next(err)
  }
})
