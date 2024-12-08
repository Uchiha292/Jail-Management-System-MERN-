import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css'; // Link to an updated CSS file

const HomePage = () => {
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
            <h2>Request a Visit</h2>
            <p>Submit your request to visit a prisoner seamlessly.</p>
            <Link className="btn" to="/visitation-request">Get Started</Link>
          </div>

          <div className="card">
            <h2>Visitation History</h2>
            <p>View all your past and upcoming visitation records.</p>
            <Link className="btn" to="/visitation-history">View History</Link>
          </div>

          <div className="card">
            <h2>Visitor Guidelines</h2>
            <p>Learn all the rules and regulations for a smooth visit.</p>
            <Link className="btn" to="/guidelines">Read Guidelines</Link>
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

export default HomePage;
