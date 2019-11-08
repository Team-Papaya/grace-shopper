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

/*
I think we're missing the following:

Session model and relationship
*/

//PurchseProfile.belongsTo(User)
User.hasMany(PurchaseProfile)
//Review.belongsTo(User);
User.hasMany(Review)
Order.belongsTo(PurchaseProfile)
PurchaseProfile.hasMany(Order)
Product.belongsToMany(Order, {through: OrderProduct})
Order.belongsToMany(Product, {through: OrderProduct})
//Review.belongsTo(Product);
Product.hasMany(Review)
//Category.belongsToMany(Product, { through: 'productCategory' });
Product.belongsToMany(Category, {through: 'productCategory'})
//PricingHistory.belongsTo(Product)
Product.hasMany(PricingHistory)
//PurchaseProfile.belongsTo(Session)
//OrderProduct.belongsTo(Product, {foreignKey: 'productId'})
//Session.hasMany(PurchaseProfile)

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
