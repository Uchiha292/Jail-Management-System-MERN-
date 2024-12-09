import React from 'react';
import { Link } from 'react-router-dom';
import BackButton from '../components/BackButton';
import '../styles/ManageTransfers.css';

const ManageTransfers = () => {
  return (
    <div className="manage-transfers-container">
      <div className="back-button-wrapper">
        <BackButton />
      </div>
      <h1>Manage Transfers</h1>
      <div className="manage-transfers-options">
        <Link to="/warden/manage-transfers/history" className="option-button">View All Transfer History</Link>
        <Link to="/warden/manage-transfers/history/prisoner" className="option-button">View History of Specific Prisoner</Link>
        <Link to="/warden/manage-transfers/pending" className="option-button">View Pending Transfers</Link>
      </div>
    </div>
  );
};

export default ManageTransfers;