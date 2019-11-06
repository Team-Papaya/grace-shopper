const router = require('express').Router()
const {Product, Category} = require('../db/models')
const Sequelize = require('sequelize')
const db = require('../db')
module.exports = router

router.get('/', async (req, res, next) => {
  const whereClause = {}
  const throughWhereClause = {}
  if (req.query.name && req.query.name.length) whereClause.name = req.query.name
  if (req.query.cat && req.query.cat[0] && req.query.cat[0].length) {
    const queryString = `SELECT "productId", "categoryId" from "ProductCategory" where "categoryId" in (${req.query.cat.join()})`
    //console.log("QS is: ", queryString);
    const productIds = await db.query(queryString).then(([res, metadata]) => {
      let merged = res.reduce((acc, curr) => {
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
  //console.log('where clause is: ', whereClause);
  Product.findAll({
    include: {model: Category},
    where: whereClause,
    through: {where: throughWhereClause}
  }).then(dbRes => res.json(dbRes))
  console.log(req.query)
  //res.sendStatus(200)
})
