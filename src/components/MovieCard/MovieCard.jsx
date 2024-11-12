import React from "react";
import { Link } from "react-router-dom";
import { FaCheck } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa";
import { FaInfoCircle } from "react-icons/fa";
import { deleteMovies, addMovies } from "../../features/favMoviesSlice";
import { useDispatch } from "react-redux";
import "./MovieCard.css";
import StarRating from "../StarRating/StarRating";

const MovieCard = ({ movie, favMovies }) => {
  const dispatch = useDispatch();

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
    <div className="movie-card">
      {/* Poster and Details Overlay */}
      <div className="movie-card__poster-wrapper">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="movie-card__poster"
        />
        <Link to={`/movie/${movie.id}`}>
          <div className="movie-card__detail">
            <h3 className="movie-card__title">{movie.title}</h3>
            <p>{movie.release_date}</p>
                  <StarRating rating={movie.vote_average} />
            {movie.overview && (
              <p className="movie-card__overview">{movie.overview}</p>
            )}
          </div>
        </Link>
      </div>
      <Link to={`/movie/${movie.id}`} className="movie-card__title-link">
        <h3 className="movie-card__title">{movie.title}</h3>
      </Link>
      {/* Actions Section */}
      <div className="movie-card__actions">
        <div
          onClick={() => handleFavorite(movie)}
          className={`movie-card__favorite ${
            favMovies.some((favMovie) => favMovie.id === movie.id)
              ? "movie-card__favorite--added"
              : ""
          }`}
        >
          <span className="tooltip">
            {favMovies.some((favMovie) => favMovie.id === movie.id)
              ? "Remove from Favorites"
              : "Add to Favorites"}
          </span>
          {favMovies.some((favMovie) => favMovie.id === movie.id) ? (
            <FaCheck />
          ) : (
            <FaPlus />
          )}
        </div>

        <Link to={`/movie/${movie.id}`} className="movie-card__info-link">
          <span title="More Information">
            <FaInfoCircle />
          </span>
        </Link>
      </div>
    </div>
  );
};

export default MovieCard;
