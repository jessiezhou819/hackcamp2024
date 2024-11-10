import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HomePage from './Homepage';
import Upload  from './Upload';

function App() {
  return (
    <Router>
      <div>
        {/* Navigation Links */}
        
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/Upload">Upload</Link>
            </li>
          </ul>
         

        {/* Define Routes */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Upload" element={<Upload />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;