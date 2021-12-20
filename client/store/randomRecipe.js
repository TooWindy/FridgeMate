import axios from 'axios'

//Action Types
const GET_RANDOM_RECIPE = 'GET_RANDOM_RECIPE'
const CLEAR_RANDOM_RECIPES = 'CLEAR__RANDOM_RECIPES'

//Action Creators
const _getRandomRecipe = (recipe) => {
  return {
    type: GET_RANDOM_RECIPE,
    recipe
  }
}

export const clearRandomRecipe = () => {
  return {
    type: CLEAR_RANDOM_RECIPES
  }
}

//Thunks
export const getRandomRecipe =() => {
  return async(dispatch) => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get(`/api/fridge/randomRecipe`, { headers : { token }})
      const recipeData = response.data
      // console.log(response.data.recipes[0])
      dispatch(_getRandomRecipe(recipeData))
    }
    catch(err){
      console.log("Failed to get a random recipe")
    }
  }
}

//Reducer
export default function (state = [], action) {
  switch (action.type) {
    case GET_RANDOM_RECIPE:
      return [action.recipe]
    case CLEAR_RANDOM_RECIPES:
      return []
    default:
      return state;
  }
}
