const router = require('express').Router()
const {Review, User} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    const reviews = await Review.findAll({
      where: {
        userId: req.session.userId
      }
    })
    console.log(reviews)
    res.json(reviews)
  } catch (err) {
    next(err)
  }
})
