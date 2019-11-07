const router = require('express').Router()
const {Product, PurchaseProfile} = require('../db/models')
const Sequelize = require('sequelize')
const db = require('../db')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    console.log('shhh')
  } catch (err) {
    next(err)
  }
})
