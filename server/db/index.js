//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const Fridge = require('./models/Fridge')

//associations could go here!

User.hasOne(Fridge)
Fridge.belongsTo(User)

module.exports = {
  db,
  models: {
    User,
    Fridge
  },
}
