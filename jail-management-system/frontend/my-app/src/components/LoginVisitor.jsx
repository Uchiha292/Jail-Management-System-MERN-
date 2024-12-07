import React, { useState } from 'react';
import axios from 'axios';
import BackButton from '../components/BackButton';
import { useNavigate } from 'react-router-dom';

const LoginVisitor = () => {
  const [formData, setFormData] = useState({
    email: '',  // Change cnic to email
    password: ''
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate(); // Initialize the navigate hook

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send email and password instead of cnic
      const response = await axios.post('http://localhost:5000/api/visitors/login', formData);
      const visitorData = response.data.visitor; // Assuming the response contains the full visitor data
      const token = response.data.token; // Assuming the response contains the token

      setSuccessMessage(response.data.message);
      setErrorMessage('');
      localStorage.setItem('token', token); // Store the token in localStorage
      localStorage.setItem('visitorData', JSON.stringify(visitorData)); // Store the full visitor data

      // Redirect to the homepage after successful login
      navigate('/home');
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'An error occurred');
      setSuccessMessage('');
    }
  };

  return (
    <div className="container">
      <BackButton />
      <h2>Visitor Login</h2>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        {/* Change CNIC field to Email */}
        <input
          type="email"
          name="email"  // Changed to email
          placeholder="Email"
          value={formData.email}  // Bound to email field
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginVisitor;
