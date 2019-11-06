const router = require('express').Router()

module.exports = router

router.get('/', (req, res, next) => {
  console.log(req.query)
  res.sendStatus(200)
})
