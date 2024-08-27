// src/components/Footer.js
import React from 'react';
import '../css/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} Movie Station. All rights reserved.</p>
        <p>Data provided by <a href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer">TMDb</a>. This application is not endorsed by TMDb.</p>
      </div>
    </footer>
  );
};

export default Footer;
