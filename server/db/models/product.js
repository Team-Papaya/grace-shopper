const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define(
  'product',
  {
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
      defaultValue: [
        'http://static.cmsi-id.com/product/01032016/pt-cahayatiara-mustika-scientific-indonesia_5tqwe_244.png'
      ]
      /*
    validate: {
       isUrl: true
    },
    */
    },
    isAvailable: {
      type: Sequelize.BOOLEAN
    }
  },
  {
    validate: {
      async customValidation() {
        const ph = await this.getPricingHistories()
        console.log(ph)
        if (
          this.isAvailable &&
          (!ph.length ||
            ph.findIndex(hist => hist.effectiveDate < Date.now() + 500) == -1)
        ) {
          throw new Error('All available products must have a price')
        }
      }
    }
  }
)

module.exports = Product
