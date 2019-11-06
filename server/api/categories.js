const router = require('express').Router()
const {Category} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Category.findAll()
    .then(dbRes => res.json(dbRes))
    .catch(err => next(err))
})
