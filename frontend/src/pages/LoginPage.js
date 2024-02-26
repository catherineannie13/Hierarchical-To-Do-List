import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import { login } from '../ApiClient';

const LoginPage = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (userData) => {
    try {
      await login(userData);
      
      // Redirect to dashboard on successful login
      navigate('/dashboard');
    } catch (error) {
      setErrorMessage('Invalid username or password. Please try again.');
    }
  };

  return (
    <div>
      {errorMessage && <div className="error">{errorMessage}</div>}
      <LoginForm onSubmit={handleLogin} />
    </div>
  );
};

export default LoginPage;
