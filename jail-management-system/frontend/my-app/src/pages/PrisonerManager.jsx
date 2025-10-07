// pages/PrisonerManager.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/PrisonerManager.css'; // Create this file

const PrisonerManager = () => {
  const [prisoners, setPrisoners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for Add/Edit form
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentPrisoner, setCurrentPrisoner] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    crime: '',
    sentenceDuration: '',
    cellNumber: ''
  });

  // Fetch prisoners on component mount
  useEffect(() => {
    const fetchPrisoners = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/prisoners'); // Use your backend route
        setPrisoners(response.data);
      } catch (err) {
        setError('Failed to fetch prisoners.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPrisoners();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddClick = () => {
    setCurrentPrisoner(null);
    setFormData({ name: '', age: '', crime: '', sentenceDuration: '', cellNumber: '' });
    setIsFormOpen(true);
  };

  const handleEditClick = (prisoner) => {
    setCurrentPrisoner(prisoner);
    setFormData({
      name: prisoner.name,
      age: prisoner.age,
      crime: prisoner.crime,
      sentenceDuration: prisoner.sentenceDuration,
      cellNumber: prisoner.cellNumber
    });
    setIsFormOpen(true);
  };

  const handleDeleteClick = async (id) => {
    if (window.confirm('Are you sure you want to delete this prisoner?')) {
      try {
        await axios.delete(`http://localhost:5000/api/prisoners/${id}`); // Use your backend route
        setPrisoners(prisoners.filter(p => p._id !== id));
      } catch (err) {
        setError('Failed to delete prisoner.');
        console.error(err);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let response;
      if (currentPrisoner) {
        // Update existing prisoner
        response = await axios.put(`http://localhost:5000/api/prisoners/${currentPrisoner._id}`, formData); // Use your backend route
        setPrisoners(prisoners.map(p => p._id === currentPrisoner._id ? response.data.prisoner : p));
      } else {
        // Add new prisoner
        response = await axios.post('http://localhost:5000/api/prisoners/add', formData); // Use your backend route
        setPrisoners([...prisoners, response.data.prisoner]);
      }
      setIsFormOpen(false);
    } catch (err) {
      setError(currentPrisoner ? 'Failed to update prisoner.' : 'Failed to add prisoner.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsFormOpen(false);
    setCurrentPrisoner(null);
  };

  if (loading) return <div>Loading prisoners...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="prisoner-manager">
      <h1>Prisoner Management</h1>
      <button onClick={handleAddClick} className="btn btn-primary">Add Prisoner</button>

      {isFormOpen && (
        <div className="form-overlay">
          <form onSubmit={handleSubmit} className="prisoner-form">
            <h2>{currentPrisoner ? 'Edit Prisoner' : 'Add New Prisoner'}</h2>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <input
              type="number"
              name="age"
              placeholder="Age"
              value={formData.age}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="crime"
              placeholder="Crime"
              value={formData.crime}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="sentenceDuration"
              placeholder="Sentence Duration"
              value={formData.sentenceDuration}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="cellNumber"
              placeholder="Cell Number"
              value={formData.cellNumber}
              onChange={handleInputChange}
              required
            />
            <div className="form-buttons">
              <button type="submit" className="btn btn-success">{currentPrisoner ? 'Update' : 'Add'}</button>
              <button type="button" onClick={handleCancel} className="btn btn-secondary">Cancel</button>
            </div>
          </form>
        </div>
      )}

      <table className="prisoner-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Crime</th>
            <th>Sentence Duration</th>
            <th>Cell Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {prisoners.map(prisoner => (
            <tr key={prisoner._id}>
              <td>{prisoner.name}</td>
              <td>{prisoner.age}</td>
              <td>{prisoner.crime}</td>
              <td>{prisoner.sentenceDuration}</td>
              <td>{prisoner.cellNumber}</td>
              <td>
                <button onClick={() => handleEditClick(prisoner)} className="btn btn-warning">Edit</button>
                <button onClick={() => handleDeleteClick(prisoner._id)} className="btn btn-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PrisonerManager;