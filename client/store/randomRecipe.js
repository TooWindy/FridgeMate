import axios from 'axios'
const apiKey = '98fd2f256fb14dbb9285a5abc6bddcce' //process.env.API_KEY

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
      const response = await axios.get(`https://api.spoonacular.com/recipes/random?number=1&tags=dinner&apiKey=${apiKey}`)
      const recipeData = response.data.recipes[0]
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
