import React from 'react'
import {connect} from 'react-redux'
import {authenticate} from '../store'
import './AuthForm.css'

/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div className={'login-component'}>
      <div className={'login-component-container'}>
      <div className={'login-wrapper'}>
      {displayName === 'Login' ? (
        <h2 className={'login-header'}>Sign In Here!</h2>
      ): <h2 className={'login-header'}>Sign Up Here!</h2>
      }
      <form className={'login-component-form'} onSubmit={handleSubmit} name={name}>
          <div className={'login-input-wrapper'}>
            <label htmlFor="username"></label>
            <input name="username" type="text" placeholder='Username' />
          </div>
          <div className={'login-input-wrapper'}>
            <label htmlFor="password"></label>
            <input name="password" type="password" placeholder='Password' />
          </div>

            <button id='submitButton'type="submit">{displayName}</button>

          {error && error.response && <div> {error.response.data} </div>}
        </form>
        </div>
      </div>
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.auth.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.auth.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const username = evt.target.username.value
      const password = evt.target.password.value
      dispatch(authenticate(username, password, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)
