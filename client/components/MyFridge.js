import React from 'react'
import { useSelector } from 'react-redux'
import {connect} from 'react-redux'
import SingleIngredient from './Sub-Components/SingleIngredient'

/**
 * COMPONENT
 */
const MyFridge= () => {
  const username = useSelector((state) => state.auth.username)
  const contents = useSelector((state) => state.fridge || [])


  return (
    <div>
      <h1>Welcome, {username}</h1>
      <h2>Fridge Contents:</h2>
      {contents.map((item) => {
        return(
          <SingleIngredient key={item.id} ingredient={item} />
        )
      }
    )}
      <div>
        <h3>Add an ingredient</h3>
      </div>
    </div>
  )
}

// /**
//  * CONTAINER
//  */
// const mapState = state => {
//   return {
//     username: state.auth.username
//   }
// }

export default MyFridge
