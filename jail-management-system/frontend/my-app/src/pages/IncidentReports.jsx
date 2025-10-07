// pages/IncidentReports.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/IncidentReports.css'; // Create this file

const IncidentReports = () => {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for Add/Edit form
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentIncident, setCurrentIncident] = useState(null);
  const [formData, setFormData] = useState({
    prisoner: '', // ID
    description: '',
    severity: ''
  });

  // Fetch incidents on component mount
  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/incidents'); // Use your backend route
        setIncidents(response.data);
      } catch (err) {
        setError('Failed to fetch incidents.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchIncidents();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddClick = () => {
    setCurrentIncident(null);
    setFormData({ prisoner: '', description: '', severity: '' });
    setIsFormOpen(true);
  };

  const handleEditClick = (incident) => {
    setCurrentIncident(incident);
    setFormData({
      prisoner: incident.prisoner._id, // Assuming prisoner is populated
      description: incident.description,
      severity: incident.severity
    });
    setIsFormOpen(true);
  };

  const handleDeleteClick = async (id) => {
    if (window.confirm('Are you sure you want to delete this incident?')) {
      try {
        await axios.delete(`http://localhost:5000/api/incidents/${id}`); // Use your backend route
        setIncidents(incidents.filter(i => i._id !== id));
      } catch (err) {
        setError('Failed to delete incident.');
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
      if (currentIncident) {
        // Update existing incident
        response = await axios.put(`http://localhost:5000/api/incidents/${currentIncident._id}`, formData); // Use your backend route
        setIncidents(incidents.map(i => i._id === currentIncident._id ? response.data : i));
      } else {
        // Add new incident
        response = await axios.post('http://localhost:5000/api/incidents/add', formData); // Use your backend route
        setIncidents([...incidents, response.data]);
      }
      setIsFormOpen(false);
    } catch (err) {
      setError(currentIncident ? 'Failed to update incident.' : 'Failed to add incident.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsFormOpen(false);
    setCurrentIncident(null);
  };

  if (loading) return <div>Loading incidents...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="incident-reports">
      <h1>Incident Reports</h1>
      <button onClick={handleAddClick} className="btn btn-primary">Add Incident</button>

      {isFormOpen && (
        <div className="form-overlay">
          <form onSubmit={handleSubmit} className="incident-form">
            <h2>{currentIncident ? 'Edit Incident' : 'Add New Incident'}</h2>
            <input
              type="text"
              name="prisoner"
              placeholder="Prisoner ID"
              value={formData.prisoner}
              onChange={handleInputChange}
              required
            />
            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleInputChange}
              required
            />
            <select
              name="severity"
              value={formData.severity}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Severity</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
            <div className="form-buttons">
              <button type="submit" className="btn btn-success">{currentIncident ? 'Update' : 'Add'}</button>
              <button type="button" onClick={handleCancel} className="btn btn-secondary">Cancel</button>
            </div>
          </form>
        </div>
      )}

      <table className="incident-table">
        <thead>
          <tr>
            <th>Prisoner Name</th>
            <th>Description</th>
            <th>Severity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {incidents.map(incident => (
            <tr key={incident._id}>
              <td>{incident.prisoner?.name || 'N/A'}</td> {/* Assuming prisoner is populated */}
              <td>{incident.description}</td>
              <td>{incident.severity}</td>
              <td>
                <button onClick={() => handleEditClick(incident)} className="btn btn-warning">Edit</button>
                <button onClick={() => handleDeleteClick(incident._id)} className="btn btn-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IncidentReports;