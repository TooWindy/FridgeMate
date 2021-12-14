import React from 'react'

const RandomRecipe = (props) => {
  if(props.currentState === 'randomRecipes'){
    return <h1>Randommm</h1>
  }
  else {
    return null
  }
}

export default RandomRecipe
