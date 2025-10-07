// components/RoleSelectionLogin.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/RoleSelection.css'; // Create this for styling

const RoleSelectionLogin = () => {
  return (
    <div className="role-selection-page">
      <div className="role-selection-container">
        <h1>Login as...</h1>
        <div className="role-buttons">
          <Link to="/login/visitor" className="role-btn visitor-btn">
            <h2>Visitor</h2>
            <p>Access visitation features</p>
          </Link>
          <Link to="/login/warden" className="role-btn warden-btn">
            <h2>Warden</h2>
            <p>Access warden panel</p>
          </Link>
          <Link to="/login/jailer" className="role-btn jailer-btn">
            <h2>Jailer</h2>
            <p>Access jailer panel</p>
          </Link>
        </div>
        <div className="back-link">
          <Link to="/">Back to Home</Link>
        </div>
      </div>
    </div>
  );
};

export default RoleSelectionLogin;