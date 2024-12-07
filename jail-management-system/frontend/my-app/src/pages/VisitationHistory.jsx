import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VisitationHistory = () => {
  const [history, setHistory] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  // Retrieve visitorData from localStorage (or state)
  const visitorData = JSON.parse(localStorage.getItem('visitorData')); 

  useEffect(() => {
    if (visitorData && visitorData.cnic) {
      const fetchHistory = async () => {
        try {
          // Use the actual CNIC value here
          const response = await axios.get(`http://localhost:5000/api/visitation-request/history/${visitorData.cnic}`);
          setHistory(response.data);
        } catch (error) {
          setErrorMessage('Failed to fetch visitation history');
        }
      };
      
      fetchHistory();
    } else {
      setErrorMessage('Visitor data is missing or not logged in');
    }
  }, [visitorData]);

  return (
    <div>
      <h2>Visitation History</h2>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <ul>
        {history.map((visit) => (
          <li key={visit._id}>{visit.visitDate} - {visit.prisonerId.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default VisitationHistory;
