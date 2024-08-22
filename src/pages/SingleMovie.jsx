import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { addMovies, deleteMovies } from '../features/favMoviesSlice';
import StarRating from '../components/StarRating'; // Import the StarRating component

const SingleMovie = () => {
  const { id } = useParams(); // Get the movie ID from the URL
  const [movie, setMovie] = useState(null);
  const [casts, setCasts] = useState(null);
  const dispatch = useDispatch();
  const favMovies = useSelector((state) => state.favMovie.movies);

  const handleFavorite = () => {
    if (!favMovies.some((favMovie) => favMovie.id === movie.id)) {
      dispatch(addMovies(movie));
      console.log('Added to favorites:', movie);
    } else {
      dispatch(deleteMovies({ id: movie.id }));
      console.log('Removed from favorites:', movie);
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
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    const fetchCasts = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits`, {
          params: { language: 'en-US' },
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlY2NiMWM0MTVkMWNjMTA3OTVhNGFkOWM4YjkyNmU2NSIsIm5iZiI6MTcyMTkyOTIxMi4xMDM0NDEsInN1YiI6IjY2ODgzNzQzNWQ1YWI2NGNlYzYxYTlmOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2GCmTIGjgqcqcae8dOb9Js-B87fCTf1RJZXQ_kUQCO0`,
          },
        });
        setCasts(response.data.cast.slice(0, 4)); // Get only the first 4 cast members
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching cast details:', error);
      }
    };

    fetchMovie();
    fetchCasts();
  }, [id]);

  if (!movie) return <div>Loading...</div>;

  return (
    <section>
      <div className="single-movie">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          style={{ maxWidth: '200px', borderRadius: '10px' }}
        />
        <div className="movie-detail" style={{ maxWidth: '600px' }}>
          <div className='title-overview'>
            <h2 className='title-overview'>{movie.title}</h2>
          </div>
          <div className='infos'>
            <div className='info'>
                <b>Tagline:</b>
                <p>{movie.tagline} </p>
            </div> 
            <div className='info'>
                <b>Release:</b>
                <p>{movie.release_date}</p>
            </div>
            <div className='info'>
              <b>Rating:</b>
              <StarRating rating={movie.vote_average} /> {/* Add star rating here */}
            </div>
            <div className='info'>
              <b>Runtime:</b>
              <p>{movie.runtime} min</p>
            </div>     
            <div className='info'>
              <b>Country:</b>
              <p>{movie.origin_country}</p>
            </div> 
            <div className='info'>
              <b>Genres:</b>
              {movie.genres.map((genre) => (
                <p key={genre.id}>{genre.name}</p>
              ))}
            </div>
            <div className='overview'>
              <b>Overview:</b>
              <p className='overview'>{movie.overview}</p> 
            </div>
            <div className='info'>
              <h4>Casts:</h4>
              {casts && casts.map((cast) => (
                <p key={cast.cast_id}>{cast.name}</p>
              ))}
            </div>
          </div>
        </div>
        <button onClick={() => handleFavorite(movie)} style={{ marginTop: '20px' }} className='favbutton'>
          {favMovies.some((favMovie) => favMovie.id === movie.id) ? (
            <img src="../public/remove-from-favorites-icon.svg" alt="unfavorite" />
          ) : (
            <img src="../public/add-to-favorites-icon.svg" alt="favorite" />
          )}
        </button>
      </div>
    </section>
  );
};

export default SingleMovie;
