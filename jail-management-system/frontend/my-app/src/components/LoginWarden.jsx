import React, { useState } from 'react';
import axios from 'axios';
import BackButton from '../components/BackButton';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginVisitor.css';

const LoginWarden = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/warden/login', { email, password });
      localStorage.setItem('wardenToken', response.data.token);
      navigate('/warden/home');
    } catch (error) {
      setErrorMessage('Invalid credentials');
    }
  };

  return (
    <div className="login-container">
      <div className="back-button-wrapper">
        <BackButton />
      </div>

      <h1 className="main-title">Jail Management System</h1>
      <div className="login-box">
        <h2 className="login-title">Warden Login</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-input"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-input"
          />
          <button type="submit" className="login-btn">Login</button>
        </form>
      </div>
    </div>
  );
};


export default LoginWarden;