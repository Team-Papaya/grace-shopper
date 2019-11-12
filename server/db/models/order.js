const db = require('../db')
const Sequelize = require('sequelize')

const Order = db.define(
  'order',
  {
    status: {
      type: Sequelize.ENUM('pending', 'purchased', 'cancelled', 'fulfilled'),
      defaultValue: 'pending'
    },
    sessionId: Sequelize.STRING,
    purchasedAt: Sequelize.DATE,
    cancelledAt: Sequelize.DATE,
    fulfilledAt: Sequelize.DATE,
    totalPriceAtPurchase: Sequelize.INTEGER
  },
  {
    hooks: {
      beforeValidate: async orderInstance => {
        if (orderInstance.purchaseProfileId && orderInstance.userId) {
          await orderInstance.update({userId: null})
          return orderInstance
        }
      },
      afterUpdate: orderInstance => {
        if (
          orderInstance.status === 'purchased' &&
          orderInstance.purchasedAt === null
        )
          return orderInstance.update({purchasedAt: new Date()})
        return orderInstance
      }
    }
  }
)

module.exports = Order
