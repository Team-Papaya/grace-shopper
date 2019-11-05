const User = require('./user')
const Order = require('./order')
const PurchaseProfile = require('./purchaseProfile')
const Category = require('./category')
const OrderProduct = require('./orderProduct')
const PricingHistory = require('./pricingHistory')
const Product = require('./product')
const Review = require('./review')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */

//-------Associations--------//
User.hasMany(PurchaseProfile)
User.hasMany(Review)
PurchaseProfile.hasMany(Order)
Order.belongsToMany(Product, {through: OrderProduct})
Product.hasMany(Review)
Product.belongsToMany(Category, {through: 'ProductCategory'})
Product.hasMany(PricingHistory)

module.exports = {
  User,
  Order,
  PurchaseProfile,
  Category,
  OrderProduct,
  PricingHistory,
  Product,
  Review
}
