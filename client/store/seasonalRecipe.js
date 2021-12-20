import axios from 'axios'

//Action Types
const GET_SEASONAL_RECIPE = 'GET_SEASONAL_RECIPE'
const CLEAR_SEASONAL_RECIPE = 'CLEAR_SEASONAL_RECIPE'

//Action Creators
const _getSeasonalRecipe = (recipe) => {
  return {
    type: GET_SEASONAL_RECIPE,
    recipe
  }
}

export const clearSeasonalRecipe = () => {
  return {
    type: CLEAR_SEASONAL_RECIPE
  }
}
//Thunks
export const getSeasonalRecipe = (season) => {
  return async(dispatch) => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.post('/api/fridge/getSeasonalRecipe', { season }, {
        headers: { token }
      } )
      const recipeData = response.data
      // console.log(recipeData)
      dispatch(_getSeasonalRecipe(recipeData))
    }
    catch(err){
      console.log("Failed to get seasonal recipe")
    }
  }
}
//Reducer
export default function (state = [], action) {
  switch (action.type) {
    case GET_SEASONAL_RECIPE:
      return action.recipe
    case CLEAR_SEASONAL_RECIPE:
      return []
    default:
      return state;
  }
}
