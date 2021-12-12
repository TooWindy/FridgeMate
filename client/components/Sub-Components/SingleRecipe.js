import React, { useState } from 'react'
import Modal from 'react-modal'

Modal.setAppElement('#app')

const SingleRecipe = (props) => {
  const recipe = props.recipe
  const [modalIsOpen, setModalIsOpen]= useState(false)

  const openModal= () => {
    setModalIsOpen(true)
  }

  const closeModal = (e) => {
    e.stopPropagation()
    setModalIsOpen(false)
  }
  return (
    <div key={recipe.id} onClick={openModal}>
      {/* {console.log(props.recipe.id)} */}
      <div>
        <h1>{recipe.title}</h1>
        <img src={recipe.image} />
      </div>

      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} >
        <h1>{recipe.title}</h1>
        <img src={recipe.image} />
        <h3>Missing Ingredients: {recipe.missedIngredientCount}</h3>
        {recipe.missedIngredients.map((item)=> {
          return (
            <div key= {item.id}>
              <li>
                {item.original}
              </li>
            </div>
            )
        })}
        <h3>Ingredients you have:</h3>
        {recipe.usedIngredients.map((item) => {
          return (
            <div key={item.id}>
              <li>
                {item.original}
              </li>
            </div>
          )
        })}
        <div>
          <button onClick={closeModal}>Close</button>
        </div>
      </Modal>
    </div>
  )
}

// {recipe.missedIngredients.map((item)=> {
//   return (
//     <div key= {item.id}>
//     <li>
//       {item.original}
//     </li>
//     </div>
//   )
// })}
export default SingleRecipe
