const db = require('../db')
const Sequelize = require('sequelize')

const PurchaseProfile = db.define(
  'purchaseprofile',
  {
    email: {
      type: Sequelize.STRING,
      validate: {isEmail: true}
    },
    shipToName: {
      type: Sequelize.STRING
    },
    shipToAddress1: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    shipToAddress2: {
      type: Sequelize.STRING
    },
    shipToCity: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    shipToState: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    postalCode: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  },
  {
    validate: () => {
      /*Should check whether an address resolves to a valid location
    Very likely there's an existing package for this.
    */
    }
  }
)

module.exports = PurchaseProfile
