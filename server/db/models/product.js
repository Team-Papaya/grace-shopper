const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: Sequelize.TEXT
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0
    }
  },
  imageUrl: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    defaultValue: [],
    validate: {
      /* isUrl: true*/
    }
  },
  isAvailable: {
    type: Sequelize.BOOLEAN
  }
})

module.exports = Product
