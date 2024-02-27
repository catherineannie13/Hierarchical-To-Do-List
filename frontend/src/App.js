import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from './ApiClient';

const ProtectedRoute = ({ children }) => {
  const [authStatus, setAuthStatus] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const isAuthenticatedUser = await isAuthenticated();
      if (!isAuthenticatedUser) {
        navigate('/login');
      } else {
        setAuthStatus(true);
      }
    };
    checkAuth();
  }, [navigate]);

  return authStatus ? children : null; // Render children if authenticated, else null (or a loading indicator)
};

function App() {
  return (
    <Container>
      <Router>
        <Routes>
          <Route path="*" element={<Navigate to="/dashboard" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
        </Routes>
      </Router>
    </Container>
  );
}

export default App;