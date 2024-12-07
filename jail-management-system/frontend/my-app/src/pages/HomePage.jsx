import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css'; // Make sure to create the CSS file for styling

const HomePage = () => {
  return (
    <div className="home-page">
      <div className="content">
        <h1>Welcome to the Jail Management System</h1>
        <p>Your one-stop solution for managing prison visits and guidelines.</p>

        <div className="navigation">
          <Link className="btn" to="/register">Register as Visitor</Link>
          <Link className="btn" to="/login">Login</Link>
          <Link className="btn" to="/visitation-request">Request a Visit</Link>
          <Link className="btn" to="/visitation-history">Visitation History</Link>
          <Link className="btn" to="/guidelines">Visitor Guidelines</Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
