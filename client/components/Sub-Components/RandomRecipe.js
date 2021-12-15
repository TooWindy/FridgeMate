import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getRandomRecipe } from '../../store/randomRecipe'
import Modal from 'react-modal'
import { Link } from 'react-router-dom'


Modal.setAppElement('#app')

const RandomRecipe = (props) => {
  const dispatch=useDispatch()
  const randomRecipe = useSelector((state) => state.randomRecipe || [])
  const recipe = randomRecipe[0]
  const [modalIsOpen, setModalIsOpen]= useState(false)

  const openModal= () => {
    setModalIsOpen(true)
  }

  const closeModal = (e) => {
    e.stopPropagation()
    setModalIsOpen(false)
  }

  const randomRecipeClick= () => {
    dispatch(getRandomRecipe())
  }
  if(props.currentState === 'randomRecipes'){
    return (
      <div>
        <button onClick={randomRecipeClick} >Get Random Recipe</button>
        {randomRecipe.length > 0 ? (
        <div onClick={openModal}>
          <h1>{recipe.title}</h1>
          <img src={recipe.image}></img>
        </div>
        ) : <img src='https://i.imgflip.com/5xuk3u.jpg' />
      }

      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} >
        {recipe ? (
        <div>
          <h1>{recipe.title}</h1>
          <img src={recipe.image}></img>
          <h3>IngredientList</h3>
          {recipe.extendedIngredients.map((item)=> {
            return (
              <div key= {item.id}>
                <li>
                  {item.original}
                </li>
              </div>
              )
            })}
          <div>
            <Link to={`/recipeDetails/${recipe.id}`}>View Recipe Details</Link>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
        ): <h1>Loading....</h1>
        }
      </Modal>
    </div>
    )
  }
  else {
    return null
  }
}

export default RandomRecipe
