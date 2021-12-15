import React, { useState } from 'react'
import Modal from 'react-modal'
import { Link } from 'react-router-dom'

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
        <h4>Used Ingredients:</h4>
        {recipe.usedIngredients.map((item) => {
            return (
              <div key={item.id}>
                <li>
                  {item.original}
                </li>
              </div>
            )
        })}
      </div>

      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} >
        <h1>{recipe.title}</h1>
        <img src={recipe.image} />
        <h3>Missing Ingredients: {recipe.missedIngredientCount}</h3>
        {recipe.missedIngredientCount > 0 ? (
        <div>
          {recipe.missedIngredients.map((item)=> {
            return (
              <div key= {item.id}>
                <li>
                  {item.original}
                </li>
              </div>
              )
          })}
        </div>
        ): <h1>None</h1>
        }

        <h3>Ingredients you have:</h3>
        {recipe.usedIngredientCount > 0 ? (
        <div>
          {recipe.usedIngredients.map((item) => {
            return (
              <div key={item.id}>
                <li>
                  {item.original}
                </li>
              </div>
            )
        })}
        </div>
          ): <h1>None</h1>}
        <div>
          <Link to={`/recipeDetails/${recipe.id}`}>View Recipe Details</Link>
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
