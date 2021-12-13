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

router.post('/', requireToken, async(req,res,next) => {
  try{
    const { user, ingredient, quantity } = req.body
    const createIngredient = await Fridge.create({
      ingredient: ingredient,
      quantity: quantity,
      userId: user.id
    })
    res.send(createIngredient)
  }
  catch(err){
    console.log("Couldn't create your ingredient")
    next(err)
  }
})
router.put('/:id', requireToken, async (req,res,next) => {
  try {
    const { user } = req.body
    const { contents } = req.body
    const ingredient = await Fridge.findOne({
      where: {
        id: req.params.id,
        userId: user.id
      }
    })
    await ingredient.update(contents)
    // console.log(req.body)
    res.send(ingredient)
  }
  catch(err) {
    console.log("Could not make changes :(")
    next(err)
  }
})

router.delete('/:id', requireToken, async (req,res,next) => {
  try {
    const { user } = req.body
    const ingredient = await Fridge.findOne({
      where: {
        id: req.params.id,
        userId: user.id
      }
    })
    await ingredient.destroy()
    res.send(ingredient)
  }
  catch(err){
    console.log("Could not delete entry :(")
    next(err)
  }
})
