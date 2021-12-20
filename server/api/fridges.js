require('dotenv').config()
const router = require('express').Router()
const { default: axios } = require('axios')
const { models: { Fridge }} = require('../db')
const { requireToken } = require('./gatekeeping')

const apiKey = process.env.API_KEY

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

//Replaces the thunk on the front end that gets a random recipe
router.get('/randomRecipe', requireToken, async(req, res, next) => {
  try {
    const response = await axios.get(`https://api.spoonacular.com/recipes/random?number=1&tags=dinner&apiKey=${apiKey}`)
    const recipeData = response.data.recipes[0]
    // console.log(recipeData)
    res.send(recipeData)
  }
  catch(err){
    console.log("Failed to get a random recipe")
    next(err)
  }
})

// Replaces the thunk on the front end that gets your recipes
router.post('/getRecipe', requireToken, async(req,res,next) => {
  try {
    const { ingredients } = req.body
    const response = await axios.get(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&number=10&apiKey=${apiKey}`)
    const recipeData = response.data
    // console.log(recipeData)
    res.send(recipeData)
  }
  catch(err){
    console.log("Failed to get Recipes")
    next(err)
  }
})

//Replaces the thunk on the front end that gets seasonal recipes
router.post('/getSeasonalRecipe', requireToken, async(req,res,next) => {
  try {
    const { season } = req.body
    const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=${season}&number=10&fillIngredients=true&apiKey=${apiKey}`)
    const recipeData = response.data.results
    res.send(recipeData)
  }
  catch(err){
    console.log("Failed to get seasonal recipe")
    next(err)
  }
})

//Replaces the thunk on the front end that gets recipe details
router.get('/recipeDetails/:id', requireToken, async(req,res,next) => {
  try {
    const { id } = req.params
    const response = await axios.get(`https://api.spoonacular.com/recipes/${id}/analyzedInstructions?apiKey=${apiKey}`)
    const recipeDetails = response.data[0]
    res.send(recipeDetails)
  }
  catch(err){
    console.log("Couldn't retrieve recipe details")
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
