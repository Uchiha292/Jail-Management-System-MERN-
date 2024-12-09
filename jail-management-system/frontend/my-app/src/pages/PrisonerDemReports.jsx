import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BackButton from '../components/BackButton';
import '../styles/PrisonerDemoReports.css';

const PrisonerDemoReports = () => {
  const [demographics, setDemographics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDemographics = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/warden-report/prisoner-demographics');
        setDemographics(response.data);
        setLoading(false);
      } catch (err) {
        setError('An error occurred while fetching prisoner demographics.');
        setLoading(false);
      }
    };

    fetchDemographics();
  }, []);

  if (loading) return <p className="loading-text">Loading prisoner demographics...</p>;
  if (error) return <p className="error-text">{error}</p>;

  return (
    <div className="prisoner-demographics-container">
      <BackButton />
      <h2 className="demographics-title">Prisoner Demographics</h2>
      {demographics.length === 0 ? (
        <p className="no-data-text">No data found</p>
      ) : (
        <table className="demographics-table">
          <thead>
            <tr>
              <th>Age Group</th>
              <th>Count</th>
            </tr>
          </thead>
          <tbody>
            {demographics.map((item) => (
              <tr key={item._id}>
                <td>{item._id}</td>
                <td>{item.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PrisonerDemoReports;