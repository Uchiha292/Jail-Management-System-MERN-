import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/LandingPage.css'; // Add styles here

const LandingPage = () => {
    return (
        <div className="landing-page">
            {/* Header with Login/Register */}
            <header className="landing-header">
                <div className="auth-links">
                    <Link to="/login" className="auth-link">Login</Link>
                    <Link to="/register" className="auth-link">Register</Link>
                </div>
            </header>

            {/* Main Content */}
            <main className="landing-content">
                <div className="logo-container">
                    <img src="/assets/logo.jpeg" alt="Website Logo" className="logo" />
                </div>
                <h1 className="welcome-message">Welcome to the Jail Management System</h1>
            </main>
        </div>
    );
};

export default LandingPage;
