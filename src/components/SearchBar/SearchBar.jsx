import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import "./SearchBar.css";

const SearchBar = ({ onSearchToggle,offMenu }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchFocused, setSearchFocused] = useState(false);
  const searchInputRef = useRef(null);
  const navigate = useNavigate();
  const API_KEY = import.meta.env.VITE_API_KEY;

  // Handle the input focus and blur events
  const handleInputFocus = () => setSearchFocused(true);
  const handleInputBlur = () => setTimeout(() => setSearchFocused(false), 200);

  // Handle the search query change
  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (query.length > 1) {
      setSearchFocused(true);
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
      };
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`,
          options
        );
        const data = await response.json();
        setSearchResults(data.results || []); // Handle cases where data.results is undefined
      } catch (err) {
        console.error("Error fetching search results:", err);
      }
    } else {
      setSearchResults([]);
      setSearchFocused(false);
    }
  };

  // Navigate to Search Results page
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload
    if (searchQuery.length > 0) {
      offMenu();
      navigate(`/search-result/${searchQuery}`, { state: { searchQuery, searchResults } });
      clearSearch();
    }
  };

  const handleSuggestionClick = (id) => {
    navigate(`/movie/${id}`);
    clearSearch();
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    setSearchFocused(false);
  };

  // Focus the search input when active
  useEffect(() => {
    if (searchInputRef.current) searchInputRef.current.focus();
  }, []);

  return (
    <form className={`search-container ${onSearchToggle ? "active" : ""}`} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search movies..."
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        className="search-input"
        ref={searchInputRef}
      />
      <button type="submit" className="search-icon">
        <FaSearch />
      </button>
      {searchQuery && (
        <button type="button" className="clear-search-btn" onClick={clearSearch}>
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
              <span>{movie.title}</span>
            </div>
          ))}
        </div>
      )}

    </form>
  );
};

export default SearchBar;
