import React from "react";
import { Link } from "react-router-dom";
import { FaCheck } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa";
import { CiCirclePlus, CiCircleCheck } from "react-icons/ci";
import { FaInfoCircle } from "react-icons/fa";
import { deleteMovies, addMovies } from "../../features/favMoviesSlice";
import { useDispatch } from "react-redux";


const MovieCard = ({ movie, favMovies}) => {
    const dispatch = useDispatch();
    const handleFavorite = (movie) => {
        if (!favMovies.some((favMovie) => favMovie.id === movie.id)) {
          dispatch(addMovies(movie));
          console.log("Added to favorites:", movie);
          console.log(favMovies)
        } else {
          dispatch(deleteMovies({ id: movie.id }));
          console.log("Removed from favorites:", movie);
        }
      };
  return (
    <div className="movie-info">
      <h3>{movie.title}</h3>
      <div className="fav-link">
        <div onClick={() => handleFavorite(movie)} className="fav">
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
        <Link to={`/movie/${movie.id}`} className="more-info-link">
          <span title="More Infomation">
            <FaInfoCircle />
          </span>
        </Link>
      </div>
    </div>
  );
};

export default MovieCard;
