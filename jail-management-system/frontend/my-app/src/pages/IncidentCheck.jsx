import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BackButton from '../components/BackButton';
import '../styles/IncidentFreqReport.css';

const IncidentCheck = () => {
  const [incidents, setIncidents] = useState([]);
  const [newIncident, setNewIncident] = useState({ prisoner: '', description: '', severity: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/incidents');
        setIncidents(response.data);
        setLoading(false);
      } catch (err) {
        setError('An error occurred while fetching the incidents.');
        setLoading(false);
      }
    };

    fetchIncidents();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewIncident((prev) => ({ ...prev, [name]: value }));
  };

  const addIncident = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/incidents/add', newIncident);
      setIncidents((prev) => [...prev, response.data]);
      setSuccessMessage('Incident added successfully.');
      setNewIncident({ prisoner: '', description: '', severity: '' }); // Reset the form
    } catch (err) {
      setError('An error occurred while adding the incident.');
    }
  };

  if (loading) return <p>Loading incidents...</p>;
  if (error) return <p className="error-text">{error}</p>;

  return (
    <div className="incident-frequency-report-container">
      <BackButton />
      <h2>Incident Frequency Report</h2>

      <form onSubmit={addIncident} className="add-incident-form">
        <h3>Add New Incident</h3>
        {successMessage && <p className="success-text">{successMessage}</p>}
        <label>
          Prisoner ID:
          <input
            type="text"
            name="prisoner"
            value={newIncident.prisoner}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Description:
          <input
            type="text"
            name="description"
            value={newIncident.description}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Severity:
          <input
            type="text"
            name="severity"
            value={newIncident.severity}
            onChange={handleInputChange}
            required
          />
        </label>
        <button type="submit">Add Incident</button>
      </form>

      {incidents.length === 0 ? (
        <p>No incidents found.</p>
      ) : (
        <table className="report-table">
          <thead>
            <tr>
              <th>Prisoner Name</th>
              <th>Description</th>
              <th>Severity</th>
            </tr>
          </thead>
          <tbody>
            {incidents.map((incident) => (
              <tr key={incident._id}>
                <td>{incident.prisoner.name}</td>
                <td>{incident.description}</td>
                <td>{incident.severity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default IncidentCheck;
