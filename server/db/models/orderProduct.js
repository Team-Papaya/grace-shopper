const Sequelize = require('sequelize')
const db = require('../db')

const OrderProduct = db.define('orderProduct', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0
    }
  },
  unitPriceAtPurchase: Sequelize.INTEGER,
  totalPriceAtPurchase: Sequelize.INTEGER
})

module.exports = OrderProduct
