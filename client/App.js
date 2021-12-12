import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import Navbar from './components/Navbar'
import Routes from './Routes'
import { getFridgeContents } from './store/fridge';

const App = () => {
const dispatch = useDispatch()
const isLoggedIn = useSelector((state) => !!state.auth.id);

useEffect(() => {
  dispatch(getFridgeContents(isLoggedIn))
})

  return (
    <div>
      <Navbar />
      <Routes />
    </div>
  )
}

export default App
