const router = require('express').Router()
const {
  Order,
  Product,
  OrderProduct,
  PricingHistory,
  PurchaseProfile,
  User
} = require('../db/models')
const Sequelize = require('sequelize')
module.exports = router

const adminRole = (req, res, next) => {
  try {
    if (req.user && req.user.role === 'Admin') {
      next()
    } else {
      const error = new Error('You are not an admin')
      throw error
      //res.redirect('/')
    }
  } catch (error) {
    next(error)
  }
}

router.get('/', adminRole, async (req, res, next) => {
  //Chris wrote part of this route. adminRole middleware might break something??
  try {
    const orders = await Order.findAll({
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
        },
        {
          model: PurchaseProfile,
          include: [
            {
              model: User
            }
          ]
        }
      ]
    })
    res.json(orders)
  } catch (err) {
    next(err)
  }
})
router.post('/', async (req, res, next) => {
  try {
    const {productId, qty} = req.body

    const order = await Order.create({
      sessionId: req.session.id,
      userId: req.user ? req.user.id : null
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

router.put('/:id/status', adminRole, async (req, res, next) => {
  try {
    if (req.body.status === 'pending') {
      throw new Error(401)
    }
    const order = await Order.findByPk(req.params.id)
    const updatedOrder = await order.update(
      // req.body
      {
        status: req.body.status
      }
    )
    res.json(updatedOrder)
  } catch (err) {
    next(err)
  }
})

// router.put('/:id/status', (req, res, next) => {
//   Order.findByPk(req.params.id)
//     .then(dbRes => dbRes.update({status: req.body.status}))
//     .then(final => res.json(final))
//     .catch(err => next(err))
// })

router.delete('/:orderId/products/:productId', (req, res, next) => {
  OrderProduct.findOne({
    where: {
      orderId: Number(req.params.orderId),
      productId: Number(req.params.productId)
    }
  })
    .then(dbRes => dbRes.destroy())
    .then(() => res.sendStatus(204))
    .catch(next)
})
