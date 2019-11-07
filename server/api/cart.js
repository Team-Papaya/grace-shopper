//worry about importing later
const router = require('express').Router()
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const {Order, PricingHistory, Product} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    // REVIEW: this feels big enough and domain-specific enough
    // to place in it's own model method
    // This will also facilitate more isolated testing.
    // The pricing history seems like a higher complexity thing.
    const cart = await Order.findOne({
      where: {
        status: 'pending',
        sessionId: req.session.id
      },
      include: [
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
