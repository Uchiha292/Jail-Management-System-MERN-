import React, { useState } from 'react';
import axios from 'axios';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import '../styles/RegisterVisitor.css';
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
  const navigate = useNavigate();

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
      const visitorData = response.data.visitor;
      const token = response.data.token;

      setSuccessMessage(response.data.message);
      setErrorMessage('');
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

      navigate('/home');
    } catch (error) {
      setErrorMessage(error.response ? error.response.data.message : 'An error occurred.');
      setSuccessMessage('');
    }
  };

  return (
    <GoogleOAuthProvider clientId="396729223726-co6nsgbplchnjg8efjf2cam969b4lq2k.apps.googleusercontent.com">
      <div className="register-page">
        <div className="register-box">
        <BackButton />
          <h2 className="register-title">Register as Visitor</h2>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          {successMessage && <p className="success-message">{successMessage}</p>}

          <form className="register-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="form-input"
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="form-input"
            />
            <input
              type="text"
              name="contact"
              placeholder="Contact Number"
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
              placeholder="CNIC (Without Dashes)"
              value={formData.cnic}
              onChange={handleChange}
              className="form-input"
            />
            <button type="submit" className="register-btn">Register</button>
          </form>

          <div className="google-register">
            <p>Or Register with</p>
            <GoogleLogin
              onSuccess={(response) => {
                const visitorData = response.credential;
                const token = response.token;

                localStorage.setItem('token', token);
                localStorage.setItem('visitorData', JSON.stringify(visitorData));

                setSuccessMessage('Google registration successful!');
                setErrorMessage('');
                navigate('/home');
              }}
              onError={() => {
                setErrorMessage('Google registration failed. Please try again.');
                setSuccessMessage('');
              }}
              useOneTap
            />
          </div>

          <div className="login-link">
            <p>Already registered? <span className="login-btn" onClick={() => navigate('/login')}>Login here</span></p>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default RegisterVisitor;
