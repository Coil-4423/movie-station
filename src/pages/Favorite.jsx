import React from 'react';
import { deleteMovies } from '../features/favMoviesSlice';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from "react-router-dom";


export const Favorite = () => {
  const favMovies = useSelector((state) => state.favMovie.movies);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Favorites</h1>
      <div className='movies-container'>
        {favMovies.length > 0 ? (
          favMovies.map((movie) => (
            <div key={movie.id} className='movie-item'>
            <div className="movie-img-wrapper">

              <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} className='movie-poster'/>
              <div className="movie-info">
              <h3>{movie.title}</h3>
              <button onClick={() => {
                dispatch(deleteMovies({ id: movie.id}));
              }}><img src="remove-from-favorites-icon.svg" alt="unfavorite" /></button>
              {/* <button onClick={() => handleFavorite(movie)}>
                {favMovies.some((favMovie) => favMovie.id === movie.id) ? (
                  <img src="remove-from-favorites-icon.svg" alt="unfavorite" />
                ) : (
                  <img src="add-to-favorites-icon.svg" alt="favorite" />
                )}
              </button> */}
              <Link to={`/movie/${movie.id}`} className="more-info-link">
                More Info
              </Link>
              </div>
            </div>
            </div>
          ))
        ) : (
          <p>Sorry, you have no favourited movies. Return to the home page to add a
favourite movie</p>
        )}
      </div>
    </div>
  );
};
