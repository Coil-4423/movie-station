import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import "../css/Navbar.css"; // Import your custom CSS for styling
import "../css/searchbar.css";

const Navbar = () => {
  const [sidebar, setSidebar] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchFocused, setSearchFocused] = useState(false);
  const navigate = useNavigate(); // useNavigate replaces useHistory

  const showSidebar = () => setSidebar(!sidebar);

  const handleSearch = async (query) => {
    setSearchQuery(query);

    if (query.length > 1) {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer YOUR_API_KEY',
        },
      };

      try {
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`, options);
        const data = await response.json();
        setSearchResults(data.results || []); // Ensure searchResults is always an array
      } catch (err) {
        console.error(err);
        setSearchResults([]); // Reset results in case of error
      }
    } else {
      setSearchResults([]); // Reset results if query is too short
    }
  };

  const handleSuggestionClick = (id) => {
    navigate(`/movie/${id}`);
    setSearchQuery("");
    setSearchResults([]);
    setSearchFocused(false);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    setSearchFocused(false);
  };

  return (
    <>
      <div className="navbar">
        <div className="navbar-container">
          <button className="menu-bars" onClick={showSidebar}>
            <FaBars />
          </button>
          <div className="navbar-logo">
            <img src="/path-to-logo.png" alt="Logo" />
          </div>
          <div className="search-container">
            <input
              type="text"
              placeholder="Search movies..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              className="search-input"
            />
            {/* X Button */}
            {searchQuery && (
              <button className="clear-search-btn" onClick={clearSearch}>
                &times;
              </button>
            )}
            {searchResults.length > 0 && searchFocused && (
              <div className="search-results">
                {searchResults.map((movie) => (
                  <div
                    key={movie.id}
                    className="search-result-item"
                    onMouseDown={() => handleSuggestionClick(movie.id)}
                  >
                    <i className="fa fa-search"></i>
                    <span>{movie.title}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div
        className={sidebar ? "overlay active" : "overlay"}
        onClick={() => setSidebar(false)}
      ></div>

      <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
        <ul className="nav-menu-items" onClick={showSidebar}>
          <li className="navbar-toggle">
            <button className="menu-bars">
              <AiOutlineClose />
            </button>
          </li>
          <li className="nav-text">
            <Link to="/">Home</Link>
          </li>
          <li className="nav-text">
            <Link to="/about">About</Link>
          </li>
          <li className="nav-text">
            <Link to="/favorite">Favorite</Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
