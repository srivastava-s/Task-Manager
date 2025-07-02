import axios from 'axios';
axios.defaults.withCredentials = true;
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:5000/auth/user')
      .then(res => {
        setAuthenticated(res.data && res.data.user);
        setLoading(false);
      })
      .catch(() => {
        setAuthenticated(false);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  return authenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <nav style={{ padding: 16, background: '#eee' }}>
        <Link to="/login" style={{ marginRight: 16 }}>Login</Link>
        <Link to="/dashboard">Dashboard</Link>
      </nav>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="*" element={<div style={{ padding: 32 }}>Welcome! Go to <Link to="/login">Login</Link> or <Link to="/dashboard">Dashboard</Link>.</div>} />
      </Routes>
    </Router>
  );
}

export default App;
