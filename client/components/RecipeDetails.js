import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getRecipeDetails } from '../store/recipeDetails'

const RecipeDetails = (props) => {
  const dispatch =useDispatch()
  const recipeDetails = useSelector((state) => state.recipeDetails.steps || [])

  useEffect(() => {
    dispatch(getRecipeDetails(props.match.params.id))
  }, [])

  return (
    <div>
      {/* {console.log(props)} */}
      <h1>Recipe Directions:</h1>
      {
        recipeDetails.map((item) => {
          return (
            <div key={item.number}>
            <h2>Step: {item.number}</h2>
            <h3>Equipment Needed:</h3>

        {item.equipment.length > 0 ? (
        <div>
          {item.equipment.map((equipment) => {
            return (
              <div key={equipment.id}>
                <li>
                  {equipment.name}
                </li>
              </div>
            )
          })}
        </div>
          ): <li>None</li>}

          <h3>Ingredients Needed:</h3>
          {item.ingredients.map((ingredient) => {
            return (
              <div key={ingredient.id}>
                <li>
                  {ingredient.name}
                </li>
              </div>
            )
          })}

          <h3>Directions:</h3>
          <p>{item.step}</p>
            </div>
          )
        })
      }
    </div>
  )
}

export default RecipeDetails
