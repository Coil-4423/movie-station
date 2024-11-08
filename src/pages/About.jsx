import React from 'react';
import '../css/About.css';
import TMDbLogo from '../assets/tmdb-logo.svg'; // Replace with the correct path to your TMDb logo

const About = () => {
  return (
    <div className="about">
      <h1>About</h1>
      <p>
        Welcome to Movie Station, your go-to source for discovering movies and keeping track of your favorites. Our application provides users with access to detailed information on the latest films, including cast details, reviews, and more, all powered by the TMDb API.
      </p>
      <div className="tmdb-attribution">
        <img src={TMDbLogo} alt="TMDb Logo" className="tmdb-logo" />
        <p>
          “This product uses the TMDb API but is not endorsed or certified by TMDb.”
        </p>
      </div>
    </div>
  );
}

export default About;
