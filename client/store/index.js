import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import auth from './auth'
import fridge from './fridge'
import recipes from './recipes'
import randomRecipe from './randomRecipe'
import seasonalRecipe from './seasonalRecipe'
import recipeDetails from './recipeDetails'


const reducer = combineReducers({ auth, fridge, recipes, randomRecipe, seasonalRecipe, recipeDetails })
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './auth'
