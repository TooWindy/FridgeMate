import axios from 'axios'

//Action Types:
const GET_FRIDGE_CONTENTS = 'GET_FRIDGE_CONTENTS'
const EDIT_FRIDGE_CONTENTS = 'EDIT_FRIDGE_CONTENTS'
const DELETE_INGREDIENT = 'DELETE_INGREDIENT'
const ADD_INGREDIENT = 'ADD_INGREDIENT'
const CLEAR_FRIDGE = 'CLEAR_FRIDGE'
//Action Creators:
const _getFridgeContents = (contents) => {
  return {
    type: GET_FRIDGE_CONTENTS,
    contents
  }
}

const _editFridgeContents = (contents) => {
  return {
    type: EDIT_FRIDGE_CONTENTS,
    contents
  }
}

const _deleteIngredient = (ingredient) => {
  return {
    type: DELETE_INGREDIENT,
    ingredient
  }
}

const _addIngredient = (ingredient) => {
  return {
    type: ADD_INGREDIENT,
    ingredient
  }
}

export const clearFridge = () => {
  return{
    type: CLEAR_FRIDGE
  }
}
//Thunks
export const getFridgeContents = (isLoggedIn) => {
  return async (dispatch) => {
    try{
      if(isLoggedIn){
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/fridge', {
        headers: { token }
      })
      const fridgeContents = response.data
      dispatch(_getFridgeContents(fridgeContents))
      }
    }
    catch(err){
      console.log("Failed to get contents")
    }
  }
}

export const addIngredient = (ingredient) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('/api/fridge', ingredient, {
        headers: { token }
      })
      const createdIngredient = response.data
      dispatch(_addIngredient(createdIngredient))
    }
    catch(err){
      console.log("Failed to add ingredient")
    }
  }
}

export const editFridgeContents = (contents, id) => {
  return async (dispatch) => {
    try{
        const token = localStorage.getItem('token');
        const response = await axios.put(`/api/fridge/${id}`, {contents}, {
          headers: { token }
        })
        const editedContents = response.data
        console.log(response)
        dispatch(_editFridgeContents(editedContents))
      }
    catch(err){
      console.log("Failed to update contents")
    }
  }
}

export const deleteIngredient = (id) => {
  return async (dispatch) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.delete(`/api/fridge/${id}`, {
          headers: { token }
        })
        console.log(response)
        dispatch(_deleteIngredient(response.data))
    }
    catch(err){
      console.log("Failed to delete ingredient")
    }
  }
}
//Reducer
export default function (state = [], action) {
  switch (action.type) {
    case GET_FRIDGE_CONTENTS:
      return action.contents;
    case ADD_INGREDIENT:
      return [...state, action.ingredient]
    case EDIT_FRIDGE_CONTENTS:
      return state.map((item) => {
        if(item.id === action.contents.id){
          return action.contents
        }
        else{
          return item
        }
      })
    case DELETE_INGREDIENT:
      return state.filter((ingredient) => {
        if(ingredient.id !== action.ingredient.id) {
          return ingredient
        }
      })
      case CLEAR_FRIDGE:
        return []
    default:
      return state;
  }
}

// if(item.id === action.content.id){
        //   return action.content
        // }
        // else{
        //   return item
        // }
