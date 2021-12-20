import axios from 'axios'

//Action Types:
const GET_RECIPES = 'GET_RECIPES'
const CLEAR_RECIPES = 'CLEAR_RECIPES'

//Action Creators
const _getRecipes = (recipe) => {
  return {
    type: GET_RECIPES,
    recipe
  }
}

export const clearRecipes = () => {
  return {
    type: CLEAR_RECIPES
  }
}
//Thunks

export const getRecipes = (ingredients) =>{
  return async (dispatch) => {
    try {
        const token = localStorage.getItem('token')
        const response = await axios.post('/api/fridge/getRecipe', {ingredients}, {
          headers : { token }
        })
        const recipeData = response.data
        // console.log(response.data)
        dispatch(_getRecipes(recipeData))
    }
    catch(err){
      console.log("Failed to get Recipes")
    }
  }
}

//Reducer
export default function (state = [], action) {
  switch (action.type) {
    case GET_RECIPES:
      return [...action.recipe]
    case CLEAR_RECIPES:
      return []
    default:
      return state;
  }
}

