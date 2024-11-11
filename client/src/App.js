import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './component/home';
import Upload  from './component/Upload';
import RandomQuote from "./component/RandomQuote";
import Navbar from "./component/navbar";

function App() {
  return (
    <div>
    <Navbar />
    <Router>
     
      
          {/* Define Routes */}
         <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/upload" element={<Upload />} />
        </Routes>
  
     </Router> 
     </div>
    
  );
}

export default App;