import { useState } from 'react'
import './App.css'
import { Home } from './pages/Home'
import About from './pages/About'
import { Favorite } from './pages/Favorite'

import {Routes, Route} from 'react-router-dom'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/about' element={<About />}></Route>
        <Route path='/favorite' element={<Favorite />}></Route>
      </Routes>
    </>
  )
}

export default App
