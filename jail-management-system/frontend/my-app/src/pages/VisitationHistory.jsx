import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import axios from 'axios';

const VisitationHistory = ({ visitorId }) => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/visitation-request/history/${visitorId}`
        );
        setHistory(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'An error occurred.');
        setLoading(false);
      }
    };

    fetchHistory();
  }, [visitorId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <BackButton />
      <h2>Visitation History</h2>
      {history.length === 0 ? (
        <p>No visitation history found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Prisoner Name</th>
              <th>Crime</th>
              <th>Visit Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {history.map((record) => (
              <tr key={record._id}>
                <td>{record.prisonerId?.name || 'Unknown'}</td>
                <td>{record.prisonerId?.crime || 'N/A'}</td>
                <td>{new Date(record.visitDate).toLocaleDateString()}</td>
                <td>{record.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default VisitationHistory;
