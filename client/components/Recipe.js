import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import tenRecipes from '../../script/tenRecipes'
import StandardRecipe from './Sub-Components/StandardRecipe'
import SeasonalRecipe from './Sub-Components/SeasonalRecipe'
import RandomRecipe from './Sub-Components/RandomRecipe'

import './MyFridge.css'

const RecipeList = () => {
  const [view, setView] = useState('standardRecipes')

  const recipeClick = () => {
    setView('standardRecipes')
  }

  const seasonalRecipeClick = () => {
    setView('seasonalRecipes')
  }

  const randomRecipeClick = () => {
    setView('randomRecipes')
  }

  return (
    <div className={'recipe-container'}>
      {console.log(view)}
      <div style={{alignItems: 'stretch'}}>
        <button onClick={recipeClick}>Your Recipes</button>
        <button onClick={randomRecipeClick}>Random Recipe</button>
        <button onClick={seasonalRecipeClick}>Seasonal Recipes</button>
      </div>
      <h2>Your Recipes:</h2>
      <StandardRecipe currentState={view}/>
      <SeasonalRecipe currentState={view}/>
      <RandomRecipe currentState={view} />
    </div>
  )
}

export default RecipeList
