import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/GenerateReports.css';

const GenerateReports = () => {
  return (
    <div className="generate-reports-container">
      <h1>Generate Reports</h1>
      <div className="report-buttons">
        <Link to="/warden/reports/incident-frequency" className="report-button">Incident Frequency Report</Link>
        <Link to="/warden/reports/prisoner-demographics" className="report-button">Prisoner Demographics</Link>
      </div>
    </div>
  );
};

export default GenerateReports;