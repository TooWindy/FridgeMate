import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import tenRecipes from '../../../script/tenRecipes'
import { getRecipes } from '../../store/recipes'
import SingleRecipe from './SingleRecipe'

const StandardRecipe = (props) => {
  const ingredients = useSelector((state) => state.fridge)
  const recipes = useSelector((state) => state.recipes || [])
  const dispatch = useDispatch()

  // const test=`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${formattedIngredientString}&number=20&apiKey=${process.env.API_KEY}`

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

  if(props.currentState === 'standardRecipes') {
    return (
      <div>
      <button onClick={() =>dispatch(getRecipes(formattedIngredientString)) }>Get Recipes</button>
      {/* switch tenRecipes with props.recipes when done testing*/}
      {recipes.length > 0 ? (
        <div style={{ overflow: 'auto', maxHeight:'650px' }}>
          {/* switch tenRecipes with props.recipes when done testing*/}
          {recipes.map((item) => {
          return <SingleRecipe key={item.id} recipe={item} />
          })}
        </div>
        ) : <img src='https://i.imgflip.com/5xuk3u.jpg' />
      }
    </div>
    )
  }
  else{
    return null
  }
}

export default StandardRecipe
