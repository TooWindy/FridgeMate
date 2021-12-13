import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {connect} from 'react-redux'
import SingleIngredient from './Sub-Components/SingleIngredient'
import Modal from 'react-modal'
import { addIngredient } from '../store/fridge'

Modal.setAppElement('#app')
/**
 * COMPONENT
 */
const MyFridge= () => {
  const dispatch= useDispatch()
  const username = useSelector((state) => state.auth.username)
  const contents = useSelector((state) => state.fridge || [])
  const [modalIsOpen, setModalIsOpen]= useState(false)
  const [values, setValues] = useState({
    ingredient: '',
    quantity: 1
  })

  const handleSubmit= (event) => {
    event.preventDefault()
    dispatch(addIngredient(values))
    setModalIsOpen(false)
  }

  return (
    <div>
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
        <button onClick={() => setModalIsOpen(true)}>Add an ingredient</button>
      </div>
      </div>

      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
        <form onSubmit={(event) => handleSubmit(event)}>
          <div>
            <h1>Add an Ingredient</h1>
            <label>
              <h4>Ingredient Name: </h4>
            </label>
            <input type='text' name='ingredient' value={values.ingredient} onChange={(event) => setValues({...values, ingredient: event.target.value})}/>
          </div>
          <div>
            <label>
              <h4>Quantity: </h4>
            </label>
            <input type='text' name='quantity' value ={values.quantity} onChange={(event) => setValues({...values, quantity: event.target.value})} />
          </div>
          <div>
            <button type='submit'>Create</button>
          </div>
        </form>
      </Modal>
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
