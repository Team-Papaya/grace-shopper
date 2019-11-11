const router = require('express').Router()
const {User, PurchaseProfile} = require('../db/models')
module.exports = router

const adminRole = (req, res, next) => {
  try {
    if (req.user && req.user.role === 'Admin') {
      next()
    } else {
      const error = new Error('You are not an admin')
      throw error //res.redirect('/')
    }
  } catch (error) {
    next(error)
  }
}

router.get('/', adminRole, async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      //attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', adminRole, async (req, res, next) => {
  try {
    await User.destroy({
      where: {
        id: req.params.id
      }
    })
    res.status(202).send()
  } catch (err) {
    next(err)
  }
})

router.get('/:id', adminRole, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id)
    if (user) {
      res.status(202).json(user)
    } else {
      const err = new Error("couldn't find product")
      err.status = 404
      throw err
    }
  } catch (err) {
    next(err)
  }
})

router.get('/:userId/purchaseProfiles', adminRole, async (req, res, next) => {
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
