import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Landing from './components/LandingPage/Landing'
import Auth from './components/Auth/Auth'
import SignUp from './components/Auth/SignUp'
import Dash from './components/Dashboard/Dash'



function App() {


  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' Component={Landing}/>
 
      <Route path='/auth/proceed' Component={SignUp}/>
      <Route path='/dashboard' Component={Dash}/>
      <Route path='*' Component={Landing}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
