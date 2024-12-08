import React, { useState } from 'react';
import axios from 'axios';
import BackButton from '../components/BackButton';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginVisitor.css';

const LoginVisitor = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/visitors/login', formData);
      const visitorData = response.data.visitor;
      const token = response.data.token;

      setSuccessMessage(response.data.message);
      setErrorMessage('');
      localStorage.setItem('token', token);
      localStorage.setItem('visitorData', JSON.stringify(visitorData));

      navigate('/home'); // Redirect to the homepage
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'An error occurred.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="login-container">
      <div className="back-button-wrapper">
        <BackButton /> {/* BackButton placed at the top-left */}
      </div>
      <h1 className="main-title">Jail Management System</h1>
      <div className="login-box">
        <h2 className="login-title">Visitor Login</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="form-input"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="form-input"
          />
          <button type="submit" className="login-btn">Login</button>
        </form>
        <div className="register-link">
          <p>New user? <span onClick={() => navigate('/register')} className="register-btn">Register here</span></p>
        </div>
      </div>
    </div>
  );
};

export default LoginVisitor;
