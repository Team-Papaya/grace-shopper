const router = require('express').Router()
const {Product, PurchaseProfile} = require('../db/models')
const Sequelize = require('sequelize')
const db = require('../db')
module.exports = router

router.get('/:userId', async (req, res, next) => {
  try {
    const pPs = await PurchaseProfile.findAll({
      where: {
        userId: req.params.userId
      }
    })

    if (!pPs) res.status(404).send()
    res.json(pPs)
  } catch (err) {
    next(err)
  }
})
