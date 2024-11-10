import React, { useState } from "react";

const RandomQuote = () => {
  const quotes = [
    "The only limit to our realization of tomorrow is our doubts of today.",
    "The purpose of our lives is to be happy.",
    "Life is what happens when you're busy making other plans.",
    "Get busy living or get busy dying.",
    "You have within you right now, everything you need to deal with whatever the world can throw at you."
  ];

  const [quote, setQuote] = useState(quotes[0]);

  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomIndex]);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Random Quote</h2>
      <p>"{quote}"</p>
      <button onClick={getRandomQuote}>Get New Quote</button>
    </div>
  );
};

export default RandomQuote;
