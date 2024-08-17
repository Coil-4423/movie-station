import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { addMovies, deleteMovies } from '../features/favMoviesSlice';


const SingleMovie = () => {
  const { id } = useParams(); // Get the movie ID from the URL
  const [movie, setMovie] = useState(null);
  const dispatch = useDispatch();
  const favMovies = useSelector((state) => state.favMovie.movies);

  const handleFavorite = () => {
    if (!favMovies.some((favMovie) => favMovie.id === movie.id)) {
      dispatch(addMovies(movie));
      console.log('Added to favorites:', movie);
    } else {
      dispatch(deleteMovies({ id: movie.id}));
      console.log('Remove from favorites:', movie);
    }
  };

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
          params: { language: 'en-US' },
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlY2NiMWM0MTVkMWNjMTA3OTVhNGFkOWM4YjkyNmU2NSIsIm5iZiI6MTcyMTkyOTIxMi4xMDM0NDEsInN1YiI6IjY2ODgzNzQzNWQ1YWI2NGNlYzYxYTlmOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2GCmTIGjgqcqcae8dOb9Js-B87fCTf1RJZXQ_kUQCO0`,
          },
        });
        setMovie(response.data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovie();
  }, [id]);

  if (!movie) return <div>Loading...</div>;

  return (
    <section>

    <div className='single-movie'>
      <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
      <div className='movie-detail'>
        <h2>{movie.title}</h2>
      <p>{movie.overview}</p>
      <p>Release Date: {movie.release_date}</p>
      <p>Rating: {movie.vote_average}</p>
      <button onClick={() => handleFavorite(movie)}>
                {favMovies.some((favMovie) => favMovie.id === movie.id) ? (
                  <img src={"../public/remove-from-favorites-icon.svg"} alt="unfavorite" />
                ) : (
                  <img src={"../public/add-to-favorites-icon.svg"} alt="favorite" />
                )}
      </button>
      </div>
      
    </div>
    </section>
  );
};

export default SingleMovie;
