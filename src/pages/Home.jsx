import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {  deleteMovies, addMovies } from '../features/favMoviesSlice';

// import { useEffect, useState } from 'react';

const Home = () => {
  const [movieSection, setMovieSection] =useState('Now Playing');//Now Playing, Popular, Top Rated, Upcoming
  const [movies, setMovies] = useState([]);
  const dispatch = useDispatch();
  const favMovies = useSelector((state)=> state.favMovie.movies)

  useEffect(() => {
    const fetchData = async () => {
      const apiKey = 'eccb1c415d1cc10795a4ad9c8b926e65';
      let url = 'https://api.themoviedb.org/3/movie/now_playing';
      if(movieSection=='Now Playing'){
        console.log('Now Playing')
      }else if(movieSection == 'Top Rated'){
        url = 'https://api.themoviedb.org/3/movie/top_rated'
        console.log('Top Rated')
      }else if(movieSection == 'Upcoming'){
        url = 'https://api.themoviedb.org/3/movie/upcoming'
        console.log('Upcoming')
      }else if(movieSection == 'Popular'){
        url = 'https://api.themoviedb.org/3/movie/popular'
        console.log('Poplar')
      }

        try {
        const response = await axios.get(url, {
          params: { language: 'en-US' },
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlY2NiMWM0MTVkMWNjMTA3OTVhNGFkOWM4YjkyNmU2NSIsIm5iZiI6MTcyMTkyOTIxMi4xMDM0NDEsInN1YiI6IjY2ODgzNzQzNWQ1YWI2NGNlYzYxYTlmOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2GCmTIGjgqcqcae8dOb9Js-B87fCTf1RJZXQ_kUQCO0`,
          },
        });

        setMovies(response.data.results);
      } catch (error) {
        console.error('Error fetching data:', error);
      }

      
    };
    console.log(favMovies)

    fetchData();
  }, [movieSection]);

  return (
    <div>
      <button onClick={()=>setMovieSection('Now Playing')}>Now Playing</button>
      <button onClick={()=>setMovieSection('Top Rated')}>Top Rated</button>
      <button onClick={()=>setMovieSection('Upcoming')}>Upcoming</button>
      <button onClick={()=>setMovieSection('Popular')}>Popular</button>
      <h1>Trending Movies</h1>
      <div className="movies-container">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-item">
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
            <h3>{movie.title}</h3>
            <button onClick={() => {
              dispatch(addMovies(movie));
              console.log()
              console.log(movie);
              }}>Add to favorite</button>
          </div>
        ))}
      </div>
      <h2>Now Playing</h2>

      <h2>Popular</h2>
      <h2>Top Rated</h2>

    </div>
  );
};

export default Home;