import { useState } from 'react'
import './App.css'
import Home  from './pages/Home'
import About from './pages/About'
import { Favorite } from './pages/Favorite'
import SingleMovie from './pages/SingleMovie'
import {Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar'

function App() {

  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/about' element={<About />}></Route>
        <Route path='/favorite' element={<Favorite />}></Route>
        <Route path="/movie/:id" element={<SingleMovie />} />      
        </Routes>
    </>
  )
}

export default App
