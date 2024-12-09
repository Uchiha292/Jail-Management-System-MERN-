import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BackButton from '../components/BackButton';
import '../styles/ManageJailers.css';

const ManageJailers = () => {
  // States for Add Jailer form
  const [addName, setAddName] = useState('');
  const [addEmail, setAddEmail] = useState('');
  const [addPassword, setAddPassword] = useState('');
  
  // States for Update Jailer form
  const [updateName, setUpdateName] = useState('');
  const [updateEmail, setUpdateEmail] = useState('');
  const [updatePassword, setUpdatePassword] = useState('');
  const [jailerId, setJailerId] = useState('');

  const [jailers, setJailers] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Fetch all jailers
  const fetchJailers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/jailer');
      setJailers(response.data);
    } catch (err) {
      setError('Error fetching jailers: ' + err.response?.data?.message || err.message);
    }
  };

  useEffect(() => {
    fetchJailers();
  }, []);

  // Function to add new jailer
  const handleAddJailer = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/jailer/add', {
        name: addName,
        email: addEmail,
        password: addPassword,
      });
      setMessage(response.data.message);
      setAddName('');
      setAddEmail('');
      setAddPassword('');
      fetchJailers(); // Re-fetch jailers after adding
    } catch (err) {
      setError('Error adding jailer: ' + err.response?.data?.message || err.message);
    }
  };

  // Function to update jailer
  const handleUpdateJailer = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/api/jailer/${jailerId}`, {
        name: updateName,
        email: updateEmail,
        password: updatePassword,
      });
      setMessage(response.data.message);
      setJailerId('');
      setUpdateName('');
      setUpdateEmail('');
      setUpdatePassword('');
      fetchJailers(); // Re-fetch jailers after update
    } catch (err) {
      setError('Error updating jailer: ' + err.response?.data?.message || err.message);
    }
  };

  // Function to toggle activation
  const handleToggleActive = async (jailer) => {
    let action = jailer.isActive ? 'deactivate' : 'activate';
    const confirmAction = window.confirm(`Are you sure you want to ${action} this jailer?`);
    
    if (confirmAction) {
      try {
        const response = await axios.patch(
          `http://localhost:5000/api/jailer/${jailer._id}/${action}`
        );
        setMessage(response.data.message);
        fetchJailers();
      
    } catch (err) {
        const errorMessage = err.response?.data?.message || err.message || 'Unknown error occurred';
        setError(`Error toggling jailer status: ${errorMessage}`);
      }
    }
  };  
  

  return (
    <div className="manage-jailers-container">
      <BackButton />
      <h2>Manage Jailers</h2>

      {/* Add Jailer Form */}
      <form onSubmit={handleAddJailer} className="jailer-form">
        <h3>Add Jailer</h3>
        <input
          type="text"
          placeholder="Name"
          value={addName}
          onChange={(e) => setAddName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={addEmail}
          onChange={(e) => setAddEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={addPassword}
          onChange={(e) => setAddPassword(e.target.value)}
          required
        />
        <button type="submit">Add Jailer</button>
      </form>

      {/* Update Jailer Form */}
      <form onSubmit={handleUpdateJailer} className="jailer-form">
        <h3>Update Jailer</h3>
        <input
          type="text"
          placeholder="Jailer ID"
          value={jailerId}
          onChange={(e) => setJailerId(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="New Name"
          value={updateName}
          onChange={(e) => setUpdateName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="New Email"
          value={updateEmail}
          onChange={(e) => setUpdateEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="New Password"
          value={updatePassword}
          onChange={(e) => setUpdatePassword(e.target.value)}
          required
        />
        <button type="submit">Update Jailer</button>
      </form>

      {/* List of Jailers */}
      <h3>All Jailers</h3>
      <ul className="jailer-list">
        {jailers.map((jailer) => (
          <li key={jailer._id}>
            <span>{jailer.name} - {jailer.isActive ? 'Active' : 'Inactive'}</span>
            <button onClick={() => handleToggleActive(jailer)}>
              {jailer.isActive ? 'Deactivate' : 'Activate'}
            </button>
          </li>
        ))}
      </ul>

      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default ManageJailers;