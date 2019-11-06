const Sequelize = require('sequelize')
const db = require('../db')

//will be related to both User and Product. When someone makes a review we will add it to the product in question. Also we will add the name of the current user
const Review = db.define('review', {
  rating: {
    type: Sequelize.INTEGER,
    allowNull: false,
    //    defaultValue: 0,
    validate: {
      min: 0,
      max: 10
    }
  },
  content: {
    type: Sequelize.TEXT
  }
})

module.exports = Review
