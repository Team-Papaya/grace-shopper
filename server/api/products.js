const express = require('express')
const router = express.Router()
const {Product} = require('../db/models/product')

router.get('/:productId', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId, {
      //consider eager loading reviews
    })
    if (product) {
      res.json(product)
    } else {
      res.sendStatus(404)
    }
  } catch (err) {
    next(err)
  }
})

//router.post

//router.put('/:productId', )

module.exports = router
