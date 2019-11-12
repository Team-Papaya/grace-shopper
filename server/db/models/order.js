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
    fulfilledAt: Sequelize.DATE
  },
  {
    beforeValidate: {
      enforcePathUQ() {
        if (this.purchaseProfileId) {
          this.userId = null
        }
      }
    }
  }
)

module.exports = Order
