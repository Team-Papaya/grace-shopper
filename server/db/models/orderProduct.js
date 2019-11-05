const Sequelize = require('sequelize')
const db = require('../db')

const OrderProduct = db.define('OrderProduct', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0
    }
  }
})

module.exports = OrderProduct
