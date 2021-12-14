import React from 'react'

const SeasonalRecipe = (props) => {
  if(props.currentState === 'seasonalRecipes') {
    return <h1>YASSSSS</h1>
  }
  else{
    return null
  }
}

export default SeasonalRecipe
