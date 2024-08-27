import React, { useState } from "react";
import { deleteMovies } from "../features/favMoviesSlice";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FaCheck } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa";
import { FaInfoCircle } from "react-icons/fa";

import { IoIosRemoveCircleOutline } from "react-icons/io";

export const Favorite = () => {
  const favMovies = useSelector((state) => state.favMovie.movies);
  const dispatch = useDispatch();

  // State for sorting criteria and pagination
  const [sortCriteria, setSortCriteria] = useState("original");
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 20;

  // Sorting functions
  const sortMovies = (movies) => {
    switch (sortCriteria) {
      case "title":
        return [...movies].sort((a, b) => a.title.localeCompare(b.title));
      case "rating":
        return [...movies].sort((a, b) => b.vote_average - a.vote_average);
      case "popularity":
        return [...movies].sort((a, b) => b.popularity - a.popularity);
      case "releaseDate":
        return [...movies].sort(
          (a, b) => new Date(b.release_date) - new Date(a.release_date)
        );
      case "addedAsc":
        return [...movies]; // original order (assumed as ascending)
      case "addedDesc":
        return [...movies].reverse(); // reverse the original order (descending)
      case "original":
      default:
        return movies;
    }
  };

  const sortedMovies = sortMovies(favMovies);

  // Pagination logic
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = sortedMovies.slice(indexOfFirstMovie, indexOfLastMovie);
  const totalPages = Math.ceil(sortedMovies.length / moviesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0); // Scroll to the top of the page
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    const maxButtonsToShow = 3;
    let startPage = Math.max(2, currentPage - 1); // Start from 2 to ensure the first button is shown
    let endPage = Math.min(totalPages - 1, currentPage + 1); // End at totalPages - 1 to ensure the last button is shown

    // Always show the first page button
    buttons.push(
      <button
        key={1}
        onClick={() => handlePageChange(1)}
        className={currentPage === 1 ? "active" : ""}
      >
        1
      </button>
    );

    // Show ellipsis if there are pages between the first and the startPage
    if (startPage > 2) {
      buttons.push(<span key="start-ellipsis">...</span>);
    }

    // Render the range of page buttons
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={currentPage === i ? "active" : ""}
        >
          {i}
        </button>
      );
    }

    // Show ellipsis if there are pages between the endPage and the last page
    if (endPage < totalPages - 1) {
      buttons.push(<span key="end-ellipsis">...</span>);
    }

    // Always show the last page button
    if (totalPages > 1) {
      buttons.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className={currentPage === totalPages ? "active" : ""}
        >
          {totalPages}
        </button>
      );
    }

    return buttons;
  };

  return (
    <div className="movies">
      <h1>Favorites</h1>
      {/* Sort dropdown */}
      <div className="sort-dropdown">
        <label htmlFor="sortCriteria">Sort by: </label>
        <select
          id="sortCriteria"
          value={sortCriteria}
          onChange={(e) => {
            setSortCriteria(e.target.value);
            setCurrentPage(1);
          }}
          className="select-order"
        >
          <option value="addedAsc">Added Date (Ascended)</option>
          <option value="addedDesc">Added Date (Descended)</option>
          <option value="title">Title (A-Z)</option>
          <option value="rating">Rating</option>
          <option value="popularity">Popularity</option>
          <option value="releaseDate">Release Date</option>
        </select>
      </div>
      <div className="movies-container">
        {currentMovies.length > 0 ? (
          currentMovies.map((movie) => (
            <div key={movie.id} className="movie-item">
              <div className="movie-img-wrapper">
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title}
                  className="movie-poster"
                />
                <div className="movie-info">
                  <h3>{movie.title}</h3>
                  <div className="fav-link">
                    <div
                      onClick={() => {
                        dispatch(deleteMovies({ id: movie.id }));
                      }}
                      className="fav"
                    >
                      {/* <img src="remove-from-favorites-icon.svg" alt="unfavorite" /> */}
                      {/* <FaCheck/> */}
                      <span title="Remove from favorites">
                        <IoIosRemoveCircleOutline />
                      </span>
                    </div>
                    <Link to={`/movie/${movie.id}`} className="more-info-link">
                      <span title="More Infomation">
                        <FaInfoCircle />
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>
            Sorry, you have no favorited movies. Return to the home page to add
            a favorite movie.
          </p>
        )}
      </div>
      {/* Pagination controls */}
      {sortedMovies.length > moviesPerPage && (
        <div className="pagination">{renderPaginationButtons()}</div>
      )}
    </div>
  );
};
