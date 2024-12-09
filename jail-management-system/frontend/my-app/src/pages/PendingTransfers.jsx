import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BackButton from '../components/BackButton';
import '../styles/PendingTransfers.css';

const PendingTransfers = () => {
  const [transfers, setTransfers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPendingTransfers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/transfer/unapproved-transfers');
        setTransfers(response.data.transfers || []);
        setLoading(false);
      } catch (err) {
        setError('An error occurred while fetching pending transfers');
        setLoading(false);
      }
    };

    fetchPendingTransfers();
  }, []);

  const handleApprove = async (transferId) => {
    const confirmApproval = window.confirm('Are you sure you want to approve this transfer?');
    if (confirmApproval) {
      try {
        await axios.put(`http://localhost:5000/api/transfer/unapproved-transfers/approve/${transferId}`);
        setTransfers(transfers.filter(transfer => transfer._id !== transferId));
      } catch (err) {
        setError('An error occurred while approving the transfer');
      }
    }
  };

  if (loading) return <p>Loading pending transfers...</p>;
  if (error) return <p className="error-text">{error}</p>;

  return (
    <div className="pending-transfers-container">
      <BackButton />
      <h2>Pending Transfers</h2>
      {transfers.length === 0 ? (
        <p>No pending transfers found</p>
      ) : (
        <table className="pending-transfers-table">
          <thead>
            <tr>
              <th>Prisoner Name</th>
              <th>From Facility</th>
              <th>To Facility</th>
              <th>Transfer Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {transfers.map((transfer) => (
              <tr key={transfer._id}>
                <td>{transfer.prisoner.name}</td>
                <td>{transfer.fromFacility}</td>
                <td>{transfer.toFacility}</td>
                <td>{new Date(transfer.transferDate).toLocaleDateString()}</td>
                <td>
                  <button onClick={() => handleApprove(transfer._id)} className="approve-button">Approve</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PendingTransfers;