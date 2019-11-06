//worry about importing later
const router = require('express').Router()
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const {
  Order,
  PurchaseProfile,
  PricingHistory,
  Product
} = require('../db/models')

router.get('/:userId', async (req, res, next) => {
  try {
    const cart = await Order.findOne({
      where: {
        status: 'pending'
      },
      include: [
        {
          model: PurchaseProfile,
          where: {
            userId: req.params.userId
          }
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
