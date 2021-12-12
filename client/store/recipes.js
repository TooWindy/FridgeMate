import axios from 'axios'
const apiKey = process.env.API_KEY

const sample = 'https://api.spoonacular.com/recipes/findByIngredients?ingredients=apples,+flour,+sugar&number=2&apiKey=98fd2f256fb14dbb9285a5abc6bddcce'

//Action Types:
const GET_RECIPES = 'GET_RECIPES'
//Action Creators
const _getRecipes = (recipe) => {
  return {
    type: GET_RECIPES,
    recipe
  }
}
//Thunks

export const getRecipes = (ingredients) =>{
  return async (dispatch) => {
    try {
        const response = await axios.get(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&number=5&apiKey=${apiKey}`)
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
    default:
      return state;
  }
}

