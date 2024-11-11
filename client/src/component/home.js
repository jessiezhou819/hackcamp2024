import React from 'react';
import './home.css';

const home = () => {
  return (
    <div className="home">
      <div className="home-container">
        <h1 className="home-title">Welcome to the Exam Scheduler</h1>
        <p className="home-message">Organize, book, and track your exams with ease.</p>
        
        <div className="icon-container">
          <span className="icon laptop" role="img" aria-label="laptop">💻</span>
          <span className="icon alarm-clock" role="img" aria-label="alarm clock">⏰</span>
          <span className="icon pen" role="img" aria-label="pen">✏️</span>
          <span className="icon books" role="img" aria-label="books">📚</span>
        </div>
      </div>
    </div>
  );
};


export default home;
