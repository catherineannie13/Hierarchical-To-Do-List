import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RegistrationForm from '../components/RegistrationForm';
import { register } from '../ApiClient';

const RegisterPage = () => { 
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegistration = async (userData) => {
    try {
      await register(userData);
      
      // Redirect to login page on successful registration
      navigate('/login');
    } catch (error) {
      setErrorMessage('Username is already in use. Please choose a different username and try again.');
    }
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div>
      {errorMessage && <div className="error">{errorMessage}</div>}
      <RegistrationForm onSubmit={handleRegistration} />
      <button onClick={handleLoginClick}>Login</button>
    </div>
  );
};

export default RegisterPage;