// components/RoleSelectionRegister.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/RoleSelection.css';

const RoleSelectionRegister = () => {
  return (
    <div className="role-selection-page">
      <div className="role-selection-container">
        <h1>Register as...</h1>
        <div className="role-buttons">
          <Link to="/register/visitor" className="role-btn visitor-btn">
            <h2>Visitor</h2>
            <p>Request visits to prisoners</p>
          </Link>
          <Link to="/register/warden" className="role-btn warden-btn">
            <h2>Warden</h2>
            <p>Manage the jail system (Super Admin)</p>
          </Link>
          {/* Add the Jailer registration option */}
          <Link to="/register/jailer" className="role-btn jailer-btn">
            <h2>Jailer</h2>
            <p>Manage daily jail operations (Admin)</p>
          </Link>
        </div>
        <div className="back-link">
          <Link to="/">Back to Home</Link>
        </div>
      </div>
    </div>
  );
};

export default RoleSelectionRegister;