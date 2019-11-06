const Sequelize = require('sequelize')
const db = require('../db')

//in order to enforce uniqueness broadly speaking and to ensure consistency, we should do some manipulation i think before things get created or updated (user inputs),
//we should capitalize first letter of each word. split word[0]
const Category = db.define('category', {
  name: {
    type: Sequelize.STRING(20),
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})

module.exports = Category
