import React, { useState } from 'react';
import axios from 'axios';
import BackButton from '../components/BackButton';
import '../styles/ManageGuidlines.css';

const ManageGuidelines = () => {
  // States for Add Guideline form
  const [addTitle, setAddTitle] = useState('');
  const [addDescription, setAddDescription] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // States for Update Guideline form
  const [guidelineId, setGuidelineId] = useState('');
  const [updateTitle, setUpdateTitle] = useState('');
  const [updateDescription, setUpdateDescription] = useState('');

  const handleAddGuideline = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/guidelines', {
        title: addTitle,
        description: addDescription,
      });
      setMessage(response.data.message);
      setAddTitle('');
      setAddDescription('');
    } catch (err) {
      setError('Error adding guideline: ' + err.response?.data?.message || err.message);
    }
  };

  const handleUpdateGuideline = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/api/guidelines/${guidelineId}`, {
        title: updateTitle,
        description: updateDescription,
      });
      setMessage(response.data.message);
      setGuidelineId('');
      setUpdateTitle('');
      setUpdateDescription('');
    } catch (err) {
      setError('Error updating guideline: ' + err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="manage-guidelines-container">
      <BackButton />
      <h2>Manage Guidelines</h2>

      {/* Add Guideline Form */}
      <form onSubmit={handleAddGuideline} className="guideline-form">
        <h3>Add Guideline</h3>
        <input
          type="text"
          placeholder="Title"
          value={addTitle}
          onChange={(e) => setAddTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={addDescription}
          onChange={(e) => setAddDescription(e.target.value)}
          required
        />
        <button type="submit">Add Guideline</button>
      </form>

      {/* Update Guideline Form */}
      <form onSubmit={handleUpdateGuideline} className="guideline-form">
        <h3>Update Guideline by ID</h3>
        <input
          type="text"
          placeholder="Guideline ID"
          value={guidelineId}
          onChange={(e) => setGuidelineId(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="New Title"
          value={updateTitle}
          onChange={(e) => setUpdateTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="New Description"
          value={updateDescription}
          onChange={(e) => setUpdateDescription(e.target.value)}
          required
        />
        <button type="submit">Update Guideline</button>
      </form>

      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default ManageGuidelines;