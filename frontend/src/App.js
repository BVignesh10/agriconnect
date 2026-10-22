import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login.js';
import Register from './pages/Register.js';
import Dashboard from './pages/Dashboard.js';
import Farms from './pages/Farms.js';
import Marketplace from './pages/Marketplace.js';
import Advisory from './pages/Advisory.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/farms" element={<Farms />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/advisory" element={<Advisory />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;