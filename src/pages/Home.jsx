import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { deleteMovies, addMovies } from "../features/favMoviesSlice";
import { Link } from "react-router-dom";

const Home = () => {
  const [movieSection, setMovieSection] = useState("Now Playing"); // Now Playing, Popular, Top Rated, Upcoming
  const [movies, setMovies] = useState([]);
  const dispatch = useDispatch();
  const favMovies = useSelector((state) => state.favMovie.movies);

  useEffect(() => {
    const fetchData = async () => {
      let url = "https://api.themoviedb.org/3/movie/now_playing";

      if (movieSection === "Top Rated") {
        url = "https://api.themoviedb.org/3/movie/top_rated";
      } else if (movieSection === "Upcoming") {
        url = "https://api.themoviedb.org/3/movie/upcoming";
      } else if (movieSection === "Popular") {
        url = "https://api.themoviedb.org/3/movie/popular";
      }

      try {
        const response = await axios.get(url, {
          params: { language: "en-US" },
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlY2NiMWM0MTVkMWNjMTA3OTVhNGFkOWM4YjkyNmU2NSIsIm5iZiI6MTcyMTkyOTIxMi4xMDM0NDEsInN1YiI6IjY2ODgzNzQzNWQ1YWI2NGNlYzYxYTlmOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2GCmTIGjgqcqcae8dOb9Js-B87fCTf1RJZXQ_kUQCO0`,
          },
        });

        setMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [movieSection]);

  useEffect(() => {
    localStorage.setItem("movies", JSON.stringify(favMovies));
  }, [favMovies]);

  const handleFavorite = (movie) => {
    if (!favMovies.some((favMovie) => favMovie.id === movie.id)) {
      dispatch(addMovies(movie));
      console.log("Added to favorites:", movie);
    } else {
      dispatch(deleteMovies({ id: movie.id }));
      console.log("Removed from favorites:", movie);
    }
  };

  return (
    <div className="movies">
      <div className="movies-section">
        <button
          onClick={() => setMovieSection("Now Playing")}
          className={movieSection === "Now Playing" ? "active" : ""}
        >
          Now Playing
        </button>
        <button
          onClick={() => setMovieSection("Top Rated")}
          className={movieSection === "Top Rated" ? "active" : ""}
        >
          Top Rated
        </button>
        <button
          onClick={() => setMovieSection("Upcoming")}
          className={movieSection === "Upcoming" ? "active" : ""}
        >
          Upcoming
        </button>
        <button
          onClick={() => setMovieSection("Popular")}
          className={movieSection === "Popular" ? "active" : ""}
        >
          Popular
        </button>
        {/* <h2>{movieSection}</h2> */}
      </div>
      <div className="movies-container">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-item">
            <div className="movie-img-wrapper">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="movie-poster"
              />
              <div className="movie-info">
                <h3>{movie.title}</h3>
                <button onClick={() => handleFavorite(movie)}>
                  {favMovies.some((favMovie) => favMovie.id === movie.id) ? (
                    <img
                      src="remove-from-favorites-icon.svg"
                      alt="unfavorite"
                    />
                  ) : (
                    <img src="add-to-favorites-icon.svg" alt="favorite" />
                  )}
                </button>
                <Link to={`/movie/${movie.id}`} className="more-info-link">
                  More Info
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
