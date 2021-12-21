import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSeasonalRecipe } from '../../store/seasonalRecipe'
import SingleRecipe from './SingleRecipe'

const SeasonalRecipe = (props) => {
  const dispatch= useDispatch()
  const seasonalRecipes = useSelector((state) => state.seasonalRecipe || [])

  const seasonChart={
    1:"Winter",
    2:"Valentines",
    3:"Irish",
    4:"Spring",
    5:"Spring",
    6:"Summer",
    7:"Barbecue",
    8:"Barbecue",
    9:"Summer",
    10:"Pumpkin",
    11:"Thanksgiving",
    12:"Christmas"
  }
  const currentMonth= new Date().getMonth()+1

  if(props.currentState === 'seasonalRecipes') {
    return (
      <div>
        {/* {console.log(seasonalRecipes[0])} */}
        <div className={'recipeButtonDiv'}>
          <button className={'getRecipeButton'} onClick={() => dispatch(getSeasonalRecipe(seasonChart[currentMonth]))}>Get Seasonal Recipes</button>
        </div>
      {seasonalRecipes.length > 0 ? (
        <div style={{ overflow: 'auto', maxHeight:'650px' }}>
          {seasonalRecipes.map((item) => {
          return <SingleRecipe key={item.id} recipe={item} />
          })}
        </div>
        ) : <img className={'image'} src='https://i.imgflip.com/5xuk3u.jpg' />
      }
      </div>
    )
  }
  else{
    return null
  }
}

export default SeasonalRecipe
