import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./component/home";
import Upload from "./component/Upload";
import RandomQuote from "./component/RandomQuote";
import Navbar from "./component/navbar";
import Schedule from "./component/schedule";
import UploadCalendar from "./component/calendar";

function App() {
  return (
    <div>
      <Navbar />
      <Router>
        {/* Define Routes */}
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/calendar" element={<UploadCalendar />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
