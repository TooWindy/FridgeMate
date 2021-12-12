import axios from 'axios'

//Action Types:
const GET_FRIDGE_CONTENTS = 'GET_FRIDGE_CONTENTS'

//Action Creators:
const _getFridgeContents = (contents) => {
  return {
    type: GET_FRIDGE_CONTENTS,
    contents
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
//Reducer
export default function (state = [], action) {
  switch (action.type) {
    case GET_FRIDGE_CONTENTS:
      return action.contents;
    default:
      return state;
  }
}
