import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import { clearFridge } from '../store/fridge'
import { clearRandomRecipe } from '../store/randomRecipe'
import { clearRecipeDetails } from '../store/recipeDetails'
import { clearRecipes } from '../store/recipes'
import { clearSeasonalRecipe } from '../store/seasonalRecipe'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div className={'header'}>
    <img className={'navImage'} src={'https://cdn-icons-png.flaticon.com/512/189/189925.png'}/>
    <h1 className={'logo'}>FridgeMate</h1>
    <nav className={'nav'}>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/home">My Fridge</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      )}
    </nav>
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.auth.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
      dispatch(clearFridge())
      dispatch(clearRecipes())
      dispatch(clearRandomRecipe())
      dispatch(clearSeasonalRecipe())
      dispatch(clearRecipeDetails())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)
