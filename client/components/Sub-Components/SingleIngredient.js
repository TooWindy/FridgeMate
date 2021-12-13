import React, { useState } from 'react'
import Modal from 'react-modal'
import { useDispatch } from 'react-redux'
import { editFridgeContents, deleteIngredient } from '../../store/fridge'
import history from '../../history'


Modal.setAppElement('#app')

const SingleIngredient = (props) => {
  const dispatch = useDispatch()
  const ingredient = props.ingredient
  const [modalIsOpen, setModalIsOpen]= useState(false)
  const [values, setValues] = useState({
    ingredient: ingredient.ingredient,
    quantity: ingredient.quantity
  })

  const openModal= () => {
    setModalIsOpen(true)
  }

  const closeModal = () => {
    // e.stopPropagation()
    setModalIsOpen(false)
  }

  const handleSubmit =(event) => {
    event.preventDefault()
    dispatch(editFridgeContents(values, ingredient.id))
    closeModal()
  }
  return (
    <div>
      {/* {console.log(values)} */}
      <div key ={ingredient.id}>
        <h3>Ingredient: {ingredient.ingredient}</h3>
        <h3>Quantity: {ingredient.quantity}</h3>
        <button onClick={openModal}>Edit Ingredient</button>
        <button onClick={() => dispatch(deleteIngredient(ingredient.id))}>Delete Ingredient</button>
      </div>

      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <form onSubmit={(event) => handleSubmit(event)}>
          <div>
            <h1>Edit Ingredient</h1>
            <label>
              <h4>Ingredient Name: </h4>
            </label>
            <input type='text' name='ingredient' value={values.ingredient} onChange={(event) => setValues({...values, ingredient: event.target.value })}/>
          </div>
          <div>
            <label>
              <h4>Quantity: </h4>
            </label>
            <input type='text' name='quantity' value={values.quantity} onChange={(event) => setValues({...values, quantity: event.target.value})} />
          </div>
          <div>
            <button type='submit'>Submit</button>
          </div>
          </form>
      </Modal>
    </div>
  )
}

export default SingleIngredient
