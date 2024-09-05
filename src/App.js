// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import VideoListing from './components/VideosListing'; // Ensure this import path is correct

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} /> {/* Profile route */}
        <Route path="/videos" element={<VideoListing />} />
        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;
