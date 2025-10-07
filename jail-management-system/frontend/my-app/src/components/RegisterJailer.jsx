// components/RegisterJailer.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/RegisterVisitor.css'; // Reuse existing styles if similar
import BackButton from '../components/BackButton';

const RegisterJailer = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    try {
      // Prepare data excluding confirmPassword
      const { confirmPassword, ...jailerData } = formData;

      // Call the backend endpoint for jailer registration
      const response = await axios.post('http://localhost:5000/api/jailer/add', jailerData);

      // Assuming backend returns { message: "...", jailer: {...} }
      const jailerDataResponse = response.data.jailer; // Extract jailer object if returned
      const token = response.data.token; // Extract token if returned by backend for immediate login

      setSuccessMessage(response.data.message);
      setErrorMessage('');
      // Optionally store token and data if backend provides them for immediate login
      if (token) {
          localStorage.setItem('jailerToken', token);
      }
      if (jailerDataResponse) {
          localStorage.setItem('jailerData', JSON.stringify(jailerDataResponse));
      }

      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      });

      // Redirect jailer to their home page after successful registration
      // You might want to navigate to login instead, depending on your flow
      navigate('/jailer/home'); // Or maybe /login/jailer if auto-login isn't provided

    } catch (error) {
      console.error("Jailer registration error:", error);
      // Backend should return { message: "Error message" }
      setErrorMessage(error.response?.data?.message || 'An error occurred during registration.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="register-page">
      <div className="register-box">
        <BackButton />
        <h2 className="register-title">Register as Jailer</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}

        <form className="register-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Jailer Name"
            value={formData.name}
            onChange={handleChange}
            className="form-input"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="form-input"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="form-input"
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="form-input"
            required
          />
          <button type="submit" className="register-btn">Register Jailer</button>
        </form>

        <div className="login-link">
          <p>Already registered? <span className="login-btn" onClick={() => navigate('/login/jailer')}>Login here</span></p>
        </div>
      </div>
    </div>
  );
};

export default RegisterJailer;