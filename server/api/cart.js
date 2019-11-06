//worry about importing later
const router = require('express').Router()
const {Order, PurchaseProfile} = require('../db/models')

router.get('/:userId', async (req, res, next) => {
  try {
    const cart = await Order.findOrCreate({
      where: {
        status: 'pending'
      },
      include: [
        {
          model: PurchaseProfile,
          where: {
            userId: req.params.userId
          }
        }
      ]
    })

    res.json(cart)
  } catch (err) {
    next(err)
  }
})

module.exports = router
