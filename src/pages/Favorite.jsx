import React from 'react'
import { useSelector } from 'react-redux'

export const Favorite = () => {
  const favMovies = useSelector((state)=> state.favMovie.movies)
  console.log(favMovies)
  return (
    <div>
      <h1>favorite</h1>
      <div>{favMovies}</div>
    </div>
  )
}
