import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BackButton from '../components/BackButton';
import '../styles/IncidentFreqReport.css';

const IncidentFreqReport = () => {
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchIncidentFrequency = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/warden-report/incident-frequency');
        setReportData(response.data.data); // Access the 'data' field in the response
        setLoading(false);
      } catch (err) {
        setError('An error occurred while fetching the incident frequency report.');
        setLoading(false);
      }
    };
  
    fetchIncidentFrequency();
  }, []);
  

  if (loading) return <p>Loading incident frequency report...</p>;
  if (error) return <p className="error-text">{error}</p>;

  return (
    <div className="incident-frequency-report-container">
      <BackButton />
      <h2>Incident Frequency Report</h2>
      {reportData.length === 0 ? (
        <p>No incidents found.</p>
      ) : (
        <table className="report-table">
          <thead>
            <tr>
              <th>Prisoner Name</th>
              <th>Incident Count</th>
            </tr>
          </thead>
          <tbody>
            {reportData.map((item) => (
              <tr key={item.prisonerId}>
                <td>{item.prisonerName}</td>
                <td>{item.incidentCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default IncidentFreqReport;