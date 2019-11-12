const router = require('express').Router()
const {Order, Product, OrderProduct, PricingHistory} = require('../db/models')
const Sequelize = require('sequelize')
module.exports = router

router.get('/:id', async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.id, {
      include: [Product]
    })
    res.json(order)
  } catch (err) {
    next(err)
  }
})
router.post('/', async (req, res, next) => {
  try {
    const {productId, qty} = req.body

    const order = await Order.create({
      sessionId: req.session.id
    })

    const product = await Product.findByPk(Number(productId))
    await order.addProduct(product, {through: {quantity: Number(qty)}})

    res.json(
      await Order.findByPk(order.id, {
        include: [
          {
            model: Product,
            include: [
              {
                model: PricingHistory,
                where: {
                  effectiveDate: {
                    [Sequelize.Op.lt]: new Date()
                  }
                },
                order: [['effectiveDate', 'DESC']],
                limit: 1
              }
            ]
          }
        ]
      })
    )
  } catch (err) {
    next(err)
  }
})

router.put('/:id/contents', async (req, res, next) => {
  try {
    const added = await OrderProduct.findOrCreate({
      where: {
        orderId: Number(req.params.id),
        productId: Number(req.body.product)
      },
      defaults: {
        quantity: Number(req.body.quantity)
      }
    })
    if (!added[1]) {
      await added[0].update({
        quantity: added[0].quantity + Number(req.body.quantity)
      })
    }
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})
router.put('/:id/status', (req, res, next) => {
  Order.findByPk(req.params.id)
    .then(dbRes => dbRes.update({status: req.body.status}))
    .then(final => res.json(final))
    .catch(err => next(err))
})
