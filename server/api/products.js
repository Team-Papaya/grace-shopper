const router = require('express').Router()
const {Product, Category, PricingHistory, Review} = require('../db/models')
const Sequelize = require('sequelize')
const db = require('../db')

// function adminRole (req, res, next) {
//   if (req.user.role === 'Admin') {
//     next()
//   } else {
//     console.log('You are not an admin')
//     res.redirect('/')
//   }
// }

router.get('/', async (req, res, next) => {
  const PRODUCTS_PER_PAGE = 2
  const whereClause = {}

  if (req.query.name && req.query.name.length) whereClause.name = req.query.name
  if (req.query.cat && req.query.cat[0] && req.query.cat[0].length) {
    const queryString = `SELECT "productId", "categoryId" from "productCategory" where "categoryId" in (${req.query.cat
      .map(catId => Number(catId))
      .join()})`
    const productIds = await db.query(queryString).then(([dbRes]) => {
      let merged = dbRes.reduce((acc, curr) => {
        if (acc[curr.productId]) {
          return {...acc, [curr.productId]: acc[curr.productId] + 1}
        }
        return {...acc, [curr.productId]: 1}
      }, {})
      return Object.keys(merged).filter(
        key => merged[key] === req.query.cat.length
      )
    })
    whereClause.id = {
      [Sequelize.Op.in]: productIds
    }
  }

  Product.findAll({
    include: [
      {model: Category},
      {
        model: PricingHistory,
        order: [['effectiveDate', 'DESC']],
        where: {effectiveDate: {[Sequelize.Op.lte]: new Date()}},
        limit: 1,
        required: false
      },
      {model: Review}
    ],
    where: whereClause,
    limit: PRODUCTS_PER_PAGE,
    offset: req.query.page ? Number(req.query.page - 1) * PRODUCTS_PER_PAGE : 0,
    order: [['id', 'ASC']]
  })
    .then(dbRes => res.json(dbRes))
    .catch(err => next(err))
})

router.get('/:productId', async (req, res, next) => {
  try {
    const product = await Product.findByPk(Number(req.params.productId), {
      include: [
        {model: Review},
        {
          model: PricingHistory,
          order: [['effectiveDate', 'DESC']],
          where: {effectiveDate: {[Sequelize.Op.lte]: new Date()}},
          limit: 1,
          required: false
        },
        {
          model: Category,
          through: {attributes: []}
        }
      ]
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

router.post(
  '/add',
  //  adminRole,
  async (req, res, next) => {
    try {
      const product = await Product.create(req.body)
      res.json(product)
    } catch (err) {
      next(err)
    }
  }
)

router.put(
  '/:productId',
  //  adminRole,
  async (req, res, next) => {
    try {
      const updatedProduct = await Product.findByPk(
        Number(req.params.productId)
      )
      const product = await updatedProduct.update(req.body)
      res.json(product)
    } catch (err) {
      next(err)
    }
  }
)

module.exports = router
