import React from "react";
import { useLocation } from "react-router-dom";
import MovieCard from "@/components/MovieCard/MovieCard";
import { useSelector } from "react-redux";
import "./SearchResult.css";

const SearchResult = () => {
  const location = useLocation();
  const { searchQuery, searchResults } = location.state || {
    searchQuery: "",
    searchResults: [],
  };
  const favMovies = useSelector((state) => state.favMovie.movies);
  const watchList = useSelector((state) => state.watchList.movies);

  return (
    <div className="search-result-page">
      <div className="movies">
        <h1>Search Results for "{searchQuery}"</h1>
        {searchResults.length > 0 ? (
          <div className="movies-container">
            {searchResults.map((movie) => (
              <div key={movie.id} className="movie-item">
                <MovieCard
                  movie={movie}
                  favMovies={favMovies}
                  watchList={watchList}
                ></MovieCard>
              </div>
            ))}
          </div>
        ) : (
          <p>No results found for "{searchQuery}".</p>
        )}
      </div>
    </div>
  );
};

export default SearchResult;
