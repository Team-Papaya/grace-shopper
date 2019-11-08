const router = require('express').Router()
const Sequelize = require('sequelize')
//const Op = Sequelize.Op
const {Order, PurchaseProfile} = require('../db/models')
module.exports = router
router.put('/:orderId/newProfile', async (req, res, next) => {
  const profile = await PurchaseProfile.create(req.body)
  if (req.session.userId) PurchaseProfile.addUser(req.session.userId)
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
