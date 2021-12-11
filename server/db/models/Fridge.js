const Sequelize = require('sequelize')
const db = require('../db')

const Fridge = db.define('fridges', {
  ingredient: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  quantity: {
    type: Sequelize.INTEGER,
    validate: {
      min:0
    }
  }
})

module.exports = Fridge
