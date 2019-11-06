const Sequelize = require('sequelize')
const db = require('../db')

const PricingHistory = db.define(
  'pricingHistory',
  {
    price: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        min: 0
      }
    },
    effectiveDate: {
      type: Sequelize.DATE
    }
  },
  {
    validate() {
      if (this.effectiveDate < this.createdAt) throw new Error()
    }
  }
)

module.exports = PricingHistory
