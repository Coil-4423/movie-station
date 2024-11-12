import React from "react";
import { Link } from "react-router-dom";
import { FaCheck } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa";
import { CiCirclePlus, CiCircleCheck } from "react-icons/ci";
import { FaInfoCircle } from "react-icons/fa";
import { deleteMovies, addMovies } from "../../features/favMoviesSlice";
import { useDispatch } from "react-redux";
import "./MovieCard.css";

const MovieCard = ({ movie, favMovies }) => {
  const dispatch = useDispatch();
  const handleFavorite = (movie) => {
    if (!favMovies.some((favMovie) => favMovie.id === movie.id)) {
      dispatch(addMovies(movie));
      console.log("Added to favorites:", movie);
      console.log(favMovies);
    } else {
      dispatch(deleteMovies({ id: movie.id }));
      console.log("Removed from favorites:", movie);
    }
  };
  return (
    <div className="movie-card">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="movie-card__poster"
      />
      <h3 className="movie-card__title">{movie.title}</h3>
      <div className="movie-card__actions">
        <div
          onClick={() => handleFavorite(movie)}
          className={`movie-card__favorite ${
            favMovies.some((favMovie) => favMovie.id === movie.id)
              ? "movie-card__favorite--added"
              : ""
          }`}
        >
          {favMovies.some((favMovie) => favMovie.id === movie.id) ? (
            <span title="Favorite Added">
              <FaCheck />
            </span>
          ) : (
            <span title="Favorite">
              <FaPlus />
            </span>
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
