const router = require('express').Router()
const { models: { Fridge }} = require('../db')
const { requireToken } = require('./gatekeeping')
module.exports = router

router.get('/', requireToken, async (req, res, next) => {
  try{
    const {user}= req.body
    const fridge = await Fridge.findAll({
      where: {
        userId: user.id
      }
    })
    res.json(fridge)
  }
  catch(err){
    console.log("Couldn't retrieve your fridge")
    next(err)
  }
})
