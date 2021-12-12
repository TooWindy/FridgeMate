import React from 'react'

const SingleIngredient = (props) => {
  const ingredient = props.ingredient
  return (
    <div key ={ingredient.id}>
      <h3>Ingredient: {ingredient.ingredient}</h3>
      <h3>Quantity: {ingredient.quantity}</h3>
      <button>Edit Ingredient</button>
      <button>Delete Ingredient</button>
    </div>
  )
}

export default SingleIngredient
