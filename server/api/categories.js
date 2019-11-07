const router = require('express').Router()
const {Category} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  // REVIEW: if we're golfing:
  // but I'd watch for consistency of then/catch and async/await in the project
  // Category.findAll().then(res.json).catch(next)
  Category.findAll()
    .then(dbRes => res.json(dbRes))
    .catch(err => next(err))
})
