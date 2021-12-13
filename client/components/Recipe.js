import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getRecipes } from '../store/recipes'
import tenRecipes from '../../script/tenRecipes'
import SingleRecipe from './Sub-Components/SingleRecipe'

import './MyFridge.css'

const RecipeList = () => {
  const dispatch = useDispatch()
  const ingredients = useSelector((state) => state.fridge)
  const recipes = useSelector((state) => state.recipes || [])

//Gets our list of ingredients
  const ingredientList = ingredients.map((item) => {
    return item.ingredient
  })
//Formats our list of ingredients to make sure it is accepted in the params of the axios request (See the recipes store)
  let ingredientString = ''
  for(let i=0;i<ingredientList.length;i++){
    let element= ingredientList[i]
    ingredientString += element+","+"+"
  }
  //Cuts off the last comma and +.
const formattedIngredientString= ingredientString.slice(0,ingredientString.length-2)

// const test=`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${formattedIngredientString}&number=20&apiKey=${process.env.API_KEY}`

  return (
    <div className={'recipe-container'}>
      {/* {console.log(tenRecipes)} */}
      <div style={{alignItems: 'stretch'}}>
        <button onClick={() => dispatch(getRecipes(formattedIngredientString))}>Get Recipes</button>
        <button>Get Random Recipe</button>
        <button>Get Seasonal Recipe</button>
      </div>
      <h2>Your Recipes:</h2>
      <div style={{ overflow: 'auto' }}>
        {tenRecipes.map((item) => {
          return <SingleRecipe key={item.id} recipe={item} />
        })}
      </div>
    </div>
  )
}

export default RecipeList
