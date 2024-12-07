import React, { useState } from 'react';
import axios from 'axios';
import BackButton from '../components/BackButton';

const LoginVisitor = () => {
  const [formData, setFormData] = useState({
    cnic: '',
    password: ''
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/visitors/login', formData);
      setSuccessMessage(response.data.message);
      setErrorMessage('');
      localStorage.setItem('token', response.data.token); // Store the token in localStorage
    } catch (error) {
      setErrorMessage(error.response.data.message);
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
        <input
          type="text"
          name="cnic"
          placeholder="CNIC"
          value={formData.cnic}
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
