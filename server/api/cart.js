//worry about importing later
const router = require('express').Router()
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
          include: [PricingHistory]
        }
      ]
    })
    res.json(cart)
  } catch (err) {
    next(err)
  }
})

module.exports = router
