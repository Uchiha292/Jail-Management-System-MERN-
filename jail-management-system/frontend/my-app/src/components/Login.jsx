// components/Login.jsx
import React, { useState } from 'react';
import axios from 'axios';
import BackButton from './BackButton';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/LoginVisitor.css'; // Or a new shared style file

const Login = () => {
  const params = useParams(); // Get all params first
  console.log("Login Component - useParams() result:", params); // Debug log

  const { userType } = params; // Destructure userType
  console.log("Login Component - userType extracted:", userType); // Debug log

  // Check if userType is valid RIGHT at the beginning
  const isValidUserType = userType && ['warden', 'jailer', 'visitor'].includes(userType);
  console.log("Login Component - isValidUserType:", isValidUserType); // Debug log

  if (!isValidUserType) {
    console.error("Invalid or missing userType in route parameters:", userType);
    return (
      <div className="login-container">
        <div className="back-button-wrapper">
          <BackButton />
        </div>
        <h1 className="main-title">Jail Management System</h1>
        <div className="login-box">
          <h2 className="login-title">Login Error</h2>
          <p className="error-message">Invalid login type. Please select your role.</p>
          <p className="error-message">Debug: userType received was '{userType}'</p>
          <button onClick={() => window.location.href = '/login'} className="login-btn">Go to Role Selection</button>
        </div>
      </div>
    );
  }

  // If userType is valid, proceed with the form
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear previous errors

    try {
      let loginEndpoint;
      let tokenKey;
      let redirectPath;

      switch (userType) {
        case 'warden':
          loginEndpoint = 'http://localhost:5000/api/warden/login';
          tokenKey = 'wardenToken';
          redirectPath = '/warden/home';
          break;
        case 'jailer':
          loginEndpoint = 'http://localhost:5000/api/jailer/login';
          tokenKey = 'jailerToken';
          redirectPath = '/jailer/home';
          break;
        case 'visitor':
          loginEndpoint = 'http://localhost:5000/api/visitors/login';
          tokenKey = 'token';
          redirectPath = '/home';
          break;
      }

      const response = await axios.post(loginEndpoint, formData);

      localStorage.setItem(tokenKey, response.data.token);

      // Store user data if returned
      if (response.data.visitor && userType === 'visitor') {
          localStorage.setItem('visitorData', JSON.stringify(response.data.visitor));
      }
      if (response.data.warden && userType === 'warden') {
          localStorage.setItem('wardenData', JSON.stringify(response.data.warden));
      }
      if (response.data.warden && userType === 'jailer') {
          localStorage.setItem('jailerData', JSON.stringify(response.data.warden));
      }

      navigate(redirectPath);

    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage(error.response?.data?.message || 'Invalid credentials or an error occurred during login.');
    }
  };

  const titleMap = {
    warden: 'Warden Login',
    jailer: 'Jailer Login',
    visitor: 'Visitor Login'
  };

  const title = titleMap[userType] || 'Login';

  console.log("Login Component - Rendering form for userType:", userType); // Debug log

  return (
    <div className="login-container">
      <div className="back-button-wrapper">
        <BackButton />
      </div>
      <h1 className="main-title">Jail Management System</h1>
      <div className="login-box">
        <h2 className="login-title" style={{ color: userType === 'warden' || userType === 'jailer' ? 'black' : undefined }}>
          {title}
        </h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
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
          <button type="submit" className="login-btn">Login</button>
        </form>

        {userType === 'visitor' && (
          <div className="register-link">
            <p>New user? <span onClick={() => navigate('/register')} className="register-btn">Register here</span></p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;