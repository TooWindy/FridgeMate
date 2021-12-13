import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {connect} from 'react-redux'
import SingleIngredient from './Sub-Components/SingleIngredient'
import Modal from 'react-modal'
import { addIngredient } from '../store/fridge'
import './MyFridge.css'
import RecipeList from './Recipe'

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
    <div className={'fridge-container'}>
      <div className={'ingredients-container'}>
        <button style={{position: 'absolute', top: '40px', left: '250px'}} onClick={() => setModalIsOpen(true)}>Add an ingredient</button>
        <h2>Fridge Contents:</h2>
      <div style={{ overflow: 'auto', maxHeight: '85%' }}>
      {contents.map((item) => {
        return(
          <SingleIngredient key={item.id} ingredient={item} />
        )
      }
    )}
    </div>
        {/* <button style={{position: 'absolute', inset: '750px 250px 50px'}}onClick={() => setModalIsOpen(true)}>Add an ingredient</button> */}

      </div>
        <div className={'right-container'}>
          <RecipeList />
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
