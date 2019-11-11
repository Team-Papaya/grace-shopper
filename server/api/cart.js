//worry about importing later
const router = require('express').Router()
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const {
  Order,
  PricingHistory,
  Product,
  PurchaseProfile
} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    const cart = await Order.findOne({
      where: {
        status: 'pending',
        sessionId: req.session.id
      },
      include: [
        {
          model: PurchaseProfile
        },
        {
          model: Product,
          include: [
            {
              model: PricingHistory,
              where: {
                effectiveDate: {
                  [Op.lt]: new Date()
                }
              },
              order: [['effectiveDate', 'DESC']],
              limit: 1
            }
          ]
        }
      ]
    })
    if (!cart) res.json({})
    else res.json(cart)
  } catch (err) {
    next(err)
  }
})

module.exports = router
