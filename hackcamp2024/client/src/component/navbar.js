// Navbar.js
import React from 'react';
import './navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <ul className="navbar-menu">
        <li><a href="#home">Home</a></li>
        <li><a href="#upload">Upload</a></li>
        <li><a href="#calendar">Calendar</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;