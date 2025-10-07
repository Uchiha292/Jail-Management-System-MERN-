// components/RegisterWarden.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/RegisterVisitor.css'; // Reuse existing styles if similar
import BackButton from '../components/BackButton';

const RegisterWarden = () => {
  const [formData, setFormData] = useState({
    name: '', // Assuming name is unique for wardens based on your model
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
      const { confirmPassword, ...wardenData } = formData;

      const response = await axios.post('http://localhost:5000/api/warden/add', wardenData); // Backend endpoint
      const wardenDataResponse = response.data.warden; // Extract warden object
      const token = response.data.token; // Extract token

      setSuccessMessage(response.data.message);
      setErrorMessage('');
      localStorage.setItem('wardenToken', token); // Store warden token
      localStorage.setItem('wardenData', JSON.stringify(wardenDataResponse)); // Store warden data

      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      });

      // Redirect warden to their home page after successful registration
      navigate('/warden/home'); // This is the warden's panel home
    } catch (error) {
      console.error("Warden registration error:", error);
      setErrorMessage(error.response?.data?.message || 'An error occurred during registration.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="register-page">
      <div className="register-box">
        <BackButton />
        <h2 className="register-title">Register as Warden</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}

        <form className="register-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Warden Name (Unique)"
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
          <button type="submit" className="register-btn">Register Warden</button>
        </form>

        <div className="login-link">
          <p>Already registered? <span className="login-btn" onClick={() => navigate('/login/warden')}>Login here</span></p>
        </div>
      </div>
    </div>
  );
};

export default RegisterWarden;