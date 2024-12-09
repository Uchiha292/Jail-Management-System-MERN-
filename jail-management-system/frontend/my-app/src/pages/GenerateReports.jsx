import React from 'react';
import { Link } from 'react-router-dom';
import BackButton from '../components/BackButton';
import '../styles/GenerateReports.css';

const GenerateReports = () => {
  return (
    <div className="generate-reports-container">
      <div className="back-button-wrapper">
        <BackButton />
      </div>
      <h1>Generate Reports</h1>
      <div className="report-buttons">
        <Link to="#" className="report-button">Incident Frequency Report</Link>
        <Link to="#" className="report-button">Prisoner Demographics</Link>
      </div>
    </div>
  );
};

export default GenerateReports;