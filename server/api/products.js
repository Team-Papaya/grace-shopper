const router = require('express').Router()
const {
  Product,
  Category,
  PricingHistory,
  Review,
  User
} = require('../db/models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const db = require('../db')

// function adminRole (req, res, next) {
//   if (req.user.role === 'Admin') {
//     next()
//   } else {
//     console.log('You are not an admin')
//     res.redirect('/')
//   }
// }
/*eslint-disable complexity*/
const adminRole = (req, res, next) => {
  try {
    if (req.user && req.user.role === 'Admin') {
      next()
    } else {
      const error = new Error('You are not an admin')
      throw error
      //res.redirect('/')
    }
  } catch (error) {
    next(error)
  }
}

router.get('/', async (req, res, next) => {
  //console.log('GET ALL PRODUCTS ATTEMPT')
  const PRODUCTS_PER_PAGE = 6
  const whereClause = {}

  if (req.query.name && req.query.name.length)
    whereClause.name = {[Op.iLike]: '%' + req.query.name + '%'}
  if (req.query.cat && req.query.cat[0] && req.query.cat[0].length) {
    /*const queryString = `SELECT "productId", "categoryId" from "productCategory" where "categoryId" in (${req.query.cat
      .map(catId => Number(catId))
      .join()})`*/
    const queryString = `SELECT count("categoryId") as matches, "productId"
          FROM "productCategory"
          WHERE "categoryId" IN (${req.query.cat
            .map(catId => Number(catId))
            .join()})
          GROUP BY "productId"`
    // console.log(queryString)
    const matchedProducts = await db.query(queryString)
    //  console.log(matchedProducts);
    whereClause.id = {
      [Sequelize.Op.in]: matchedProducts[0].map(prod => prod.productId)
    }
  }
  if (!req.user || req.user.role != 'Admin') whereClause.isAvailable = true
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
      {
        model: Review
      }
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
        {model: Review, include: [{model: User}]},
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

router.post('/add', adminRole, async (req, res, next) => {
  try {
    const product = await Product.create(req.body)
    if (req.body.price) {
      product.createPricingHistory({
        price: req.body.price,
        effectiveDate: req.body.effectiveDate || Date.now() + 100
      })
    }
    res.json(product)
  } catch (err) {
    next(err)
  }
})

router.put('/:productId', adminRole, async (req, res, next) => {
  try {
    const updatedProduct = await Product.findByPk(
      Number(req.params.productId),
      {
        include: [
          {
            model: PricingHistory,
            order: [['effectiveDate', 'DESC']],
            where: {effectiveDate: {[Sequelize.Op.lte]: new Date()}},
            limit: 1,
            required: false
          }
        ]
      }
    )
    const product = await updatedProduct.update(req.body)
    if (
      req.body.price &&
      (!updatedProduct.pricingHistories.length ||
        updatedProduct.pricingHistories[0] != req.body.price)
    ) {
      updatedProduct.createPricingHistory({
        price: req.body.price,
        effectiveDate: req.body.effectiveDate || Date.now() + 100
      })
    }
    res.json(product)
  } catch (err) {
    next(err)
  }
})

module.exports = router
