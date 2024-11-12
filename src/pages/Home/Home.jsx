import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "@/components/MovieCard/MovieCard";
import "./Home.css";

const Home = ({ movieSection, setMovieSection }) => {
  const [movies, setMovies] = useState([]);
  const favMovies = useSelector((state) => state.favMovie.movies);
  const watchList = useSelector((state) => state.watchList.movies);


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
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlY2NiMWM0MTVkMWNjMTA3OTVhNGFkOWM4YjkyNmU2NSIsIm5iZiI6MTcyMTkyOTIxMi4xMDM0NDEsInN1YiI6IjY2ODgzNzQzNWQ1YWI2NGNlYzYxYTlmOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2GCmTIGjgqcqcae8dOb9Js-B87fCTf1RJZXQ_kUQCO0`, // Replace with your token
          },
        });
        setMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [movieSection]);

  return (
    <div className="movies">
      <div className="movies-section-wrapper">
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
          <div className="right-fade"></div>
        </div>
      </div>

      <div className="movies-container">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-item">
              <MovieCard movie={movie} favMovies={favMovies} watchList={watchList}></MovieCard>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
