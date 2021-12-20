import axios from 'axios'

//Action Type
const GET_RECIPE_DETAILS = 'GET_RECIPE_DETAILS'
const CLEAR_RECIPE_DETAILS = 'CLEAR_RECIPE_DETAILS'

//Action Creators
const _getRecipeDetails = (details) => {
  return {
    type: GET_RECIPE_DETAILS,
    details
  }
}

export const clearRecipeDetails = () => {
  return {
    type: CLEAR_RECIPE_DETAILS
  }
}
//Thunks

export const getRecipeDetails = (id) => {
  return async(dispatch) => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get(`/api/fridge/recipeDetails/${id}`, {
        headers: { token }
      })
      const recipeDetails = response.data
      dispatch(_getRecipeDetails(recipeDetails))
    }
    catch(err){
      console.log("Couldn't retrieve recipe details")
    }
  }
}
//Reducer
export default function (state = [], action) {
  switch (action.type) {
    case GET_RECIPE_DETAILS:
      return action.details
    case CLEAR_RECIPE_DETAILS:
      return []
    default:
      return state;
  }
}
