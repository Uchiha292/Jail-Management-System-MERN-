import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BackButton from '../components/BackButton'; 
import '../styles/PrisonerTransfers.css'; 

const PrisonerTransfers = () => {
  const [transfers, setTransfers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [prisonerId, setPrisonerId] = useState('');
  const [searching, setSearching] = useState(false);

  const fetchTransfers = async (id) => {
    try {
      setLoading(true);
      let url = 'http://localhost:5000/api/transfer/history/';
      if (id) {
        url = `http://localhost:5000/api/transfer/history/${id}`;
      }

      const response = await axios.get(url);
      setTransfers(response.data.transfers);
      setLoading(false);
    } catch (err) {
      setError('An error occurred while fetching transfer history.');
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (prisonerId.trim() === '') {
      setError('Please enter a valid prisoner ID');
      return;
    }
    setSearching(true);
    fetchTransfers(prisonerId);
  };

  const handleChange = (e) => {
    setPrisonerId(e.target.value);
    setError('');
  };

  
  if (loading) return <p>Loading transfer history...</p>;
  if (error) return <p className="error-text">{error}</p>;

  return (
    <div className="transfer-history-container">
      <BackButton />
      <h2>{searching ? `Transfer History for Prisoner ${prisonerId}` : 'All Transfer History'}</h2>
      
      {/* Search Bar */}
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Enter Prisoner ID"
          value={prisonerId}
          onChange={handleChange}
          className="search-bar"
        />
        <button onClick={handleSearch} className="search-btn">Search</button>
      </div>
      
      {transfers.length === 0 ? (
        <p>No transfer history found.</p>
      ) : (
        <table className="transfer-history-table">
          <thead>
            <tr>
              <th>Prisoner Name</th>
              <th>From Facility</th>
              <th>To Facility</th>
              <th>Transfer Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {transfers.map((transfer) => (
              <tr key={transfer._id}>
                <td>{transfer.prisoner.name}</td>
                <td>{transfer.fromFacility}</td>
                <td>{transfer.toFacility}</td>
                <td>{new Date(transfer.transferDate).toLocaleDateString()}</td>
                <td>{transfer.approved ? 'Approved' : 'Pending'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PrisonerTransfers;