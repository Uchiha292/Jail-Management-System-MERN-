import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BackButton from '../components/BackButton';
import '../styles/AllTransfers.css';

const AllTransferHistory = () => {
  const [transfers, setTransfers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTransfers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/transfer/history/');
        setTransfers(response.data.transfers);
        setLoading(false);
      } catch (err) {
        setError('An error occurred while fetching transfer history.');
        setLoading(false);
      }
    };

    fetchTransfers();
  }, []);

  if (loading) return <p>Loading transfer history...</p>;
  if (error) return <p className="error-text">{error}</p>;

  return (
    <div className="transfer-history-container">
      <BackButton />
      <h2>All Transfer History</h2>
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

export default AllTransferHistory;