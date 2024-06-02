import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import BrowserRouter, Route, and Routes
import Login from './pages/Login';
import Register from './pages/Registration';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleRegisterSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          {!isLoggedIn && <Route path="/register" element={<Register onRegisterSuccess={handleRegisterSuccess} />} />}
          {!isLoggedIn && <Route path="/" element={<Login />} />}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
