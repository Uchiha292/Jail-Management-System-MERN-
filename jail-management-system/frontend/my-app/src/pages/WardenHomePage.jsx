import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/WardenHomePage.css'; // Import your CSS styles

const WardenHomePage = () => {
  return (
    <div className="warden-home-page">
      <header className="warden-header">
        <h1>Warden Dashboard</h1>
        <nav className="warden-nav">
          <Link to="/warden/manage-jailers" className="nav-link">Manage Jailers</Link>
          <Link to="/warden/manage-transfers" className="nav-link">Manage Transfers</Link>
          <Link to="/warden/manage-guidelines" className="nav-link">Manage Guidelines</Link>
          <Link to="/warden/reports" className="nav-link">Generate Reports</Link>
        </nav>
      </header>

      <main className="warden-content">
        <h2>Welcome, Warden!</h2>
        <p>Use the navigation links above to manage jailers, transfers, guidelines, and generate reports.</p>
      </main>
    </div>
  );
};

export default WardenHomePage;