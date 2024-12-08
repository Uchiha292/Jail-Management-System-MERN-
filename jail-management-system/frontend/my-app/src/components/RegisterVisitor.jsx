import React, { useState } from 'react';
import axios from 'axios';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom'; // Importing React Router for navigation
import '../styles/RegisterVisitor.css'; // Create a CSS file for styling
import BackButton from '../components/BackButton';

const RegisterVisitor = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    password: '',
    confirmPassword: '',
    cnic: ''
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const navigate = useNavigate(); // Hook for navigation

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.contact || !formData.password || !formData.confirmPassword || !formData.cnic) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/visitors/register', formData);
      const visitorData = response.data.visitor; // Assuming the response contains the full visitor data
      const token = response.data.token; // Assuming the response contains the token

      setSuccessMessage(response.data.message);
      setErrorMessage('');

      // Store the token and full visitor data in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('visitorData', JSON.stringify(visitorData));

      setFormData({
        name: '',
        email: '',
        contact: '',
        password: '',
        confirmPassword: '',
        cnic: ''
      });

      // Redirect to the homepage after successful registration
      navigate('/home');
    } catch (error) {
      setErrorMessage(error.response ? error.response.data.message : 'An error occurred.');
      setSuccessMessage('');
    }
  };

  return (
    <GoogleOAuthProvider clientId="396729223726-co6nsgbplchnjg8efjf2cam969b4lq2k.apps.googleusercontent.com">
      <div className="register-container">
        <BackButton />
        <h2 className="register-title">Visitor Registration</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}

        <form className="register-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="form-input"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="form-input"
          />
          <input
            type="text"
            name="contact"
            placeholder="Contact"
            value={formData.contact}
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
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="form-input"
          />
          <input
            type="text"
            name="cnic"
            placeholder="CNIC"
            value={formData.cnic}
            onChange={handleChange}
            className="form-input"
          />
          <button type="submit" className="register-btn">Register</button>
        </form>

        <div className="google-register-container">
          <p>Or Register with</p>
          <GoogleLogin
            onSuccess={(response) => {
              console.log('Google login successful:', response);

              // Assuming Google login response contains the visitor data
              const visitorData = response.credential; // This may vary based on your setup
              const token = response.token; // Get the token if available

              // Store the Google login data in localStorage
              localStorage.setItem('token', token);
              localStorage.setItem('visitorData', JSON.stringify(visitorData));

              setSuccessMessage('Google login successful!');
              setErrorMessage('');

              // Redirect to the homepage
              navigate('/home');
            }}
            onError={(error) => {
              console.log('Google login error:', error);
              setErrorMessage('Google login failed. Please try again.');
              setSuccessMessage('');
            }}
            useOneTap
          />
        </div>

        <div className="login-link">
          <p>Already registered? <button onClick={() => navigate('/login')} className="login-btn">Login</button></p>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default RegisterVisitor;