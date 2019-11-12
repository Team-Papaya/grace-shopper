const express = require('express')
const router = express.Router()
const {Review, User} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    const reviews = await Review.findAll({
      include: [{model: User}]
    })
    res.json(reviews)
  } catch (err) {
    next(err)
  }
})

router.post('/add', async (req, res, next) => {
  try {
    const review = await Review.create(req.body)
    res.json(review)
  } catch (err) {
    next(err)
  }
})

module.exports = router
