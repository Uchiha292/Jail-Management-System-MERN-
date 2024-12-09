import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css'; // Link to an updated CSS file

const JailerHomePage = () => {
  return (
    <div className="home-page">
      <header className="hero">
        <div className="overlay"></div>
        <div className="hero-content">
          <h1>Welcome to the Jail Management System</h1>
          <p>Manage prison visits and access guidelines effortlessly.</p>
        </div>
      </header>

      <main className="features">
        <div className="card-container">
          <div className="card">
            <h2>Inamate Management</h2>
            <p>view all prisoner and manage them accordingly.</p>
            <Link className="btn" to="/prisoner-manager">Get Started</Link>
          </div>

          <div className="card">
            <h2>Visitation Management</h2>
            <p>View and approve all the visitation requests</p>
            <Link className="btn" to="/visitation-manager">Get Started</Link>
          </div>

          <div className="card">
            <h2>Incident Reaports</h2>
            <p>Check up on all the issues in the prison</p>
            <Link className="btn" to="/incident-reports">View Reports</Link>
          </div>

          <div className="card">
            <h2>Cell Management</h2>
            <p>Assign the prisoners their respective cells</p>
            <Link className="btn" to="/cell-mamanger">Get Started</Link>
          </div>


          <div className="card logout-card">
            <h2>Logout</h2>
            <p>Securely log out of the system when you're done.</p>
            <Link className="btn" to="/">Logout</Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default JailerHomePage;
