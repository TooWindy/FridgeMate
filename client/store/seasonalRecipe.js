import axios from 'axios'
const apiKey = '98fd2f256fb14dbb9285a5abc6bddcce' //process.env.API_KEY

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
      const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=${season}&number=5&fillIngredients=true&apiKey=${apiKey}`)
      const recipeData = response.data.results
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
