const express = require('express')
const router = express.Router()
const {Product} = require('../db/models')

router.get('/:productId', async (req, res, next) => {
  try {
    const product = await Product.findByPk(
      req.params.productId
      //consider eager loading reviews
    )
    if (product) {
      res.json(product)
    } else {
      res.sendStatus(404)
    }
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const product = await Product.create(req.body)
    res.json(product)
  } catch (err) {
    next(err)
  }
})

router.put('/:productId', async (req, res, next) => {
  try {
    const updatedProduct = await Product.findByPk(Number(req.params.productId))
    const product = await updatedProduct.update(req.body)
    res.json(product)
  } catch (err) {
    next(err)
  }
})

module.exports = router
