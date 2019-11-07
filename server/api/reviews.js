const express = require('express')
const router = express.Router()
const {Review} = require('../db/models')

router.post('/', async (req, res, next) => {
  try {
    const review = await Review.create(req.body)
    res.json(review)
  } catch (err) {
    next(err)
  }
})

module.exports = router
