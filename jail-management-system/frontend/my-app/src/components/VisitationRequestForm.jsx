import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Added for navigation if needed
import '../styles/VisitationRequestForm.css';

const VisitationRequestForm = () => {
  const [formData, setFormData] = useState({
    visitorId: '',
    prisonerId: '',
    visitDate: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.visitorId || !formData.prisonerId || !formData.visitDate) {
      setErrorMessage('All fields are required.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/visitation-request/request', formData);

      setSuccessMessage(response.data.message || 'Visitation request submitted successfully.');
      setErrorMessage('');
      setFormData({
        visitorId: '',
        prisonerId: '',
        visitDate: '',
      });
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'An error occurred while submitting the request.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="visitation-request-wrapper">
      <div className="visitation-request-container">
        {/* Back button */}
        <div className="back-button">
          <Link to="/" className="back-link">← Back</Link>
        </div>

        {/* Title */}
        <h2 className="visitation-title">Request a Visitation</h2>

        {/* Success and Error Messages */}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}

        {/* Form */}
        <form className="visitation-form" onSubmit={handleSubmit}>
          <div className="form-fields">
            <label htmlFor="visitorId" className="form-label">Visitor ID</label>
            <input
              type="text"
              id="visitorId"
              name="visitorId"
              placeholder="Enter Visitor ID"
              value={formData.visitorId}
              onChange={handleChange}
              className="form-input"
            />

            <label htmlFor="prisonerId" className="form-label">Prisoner ID</label>
            <input
              type="text"
              id="prisonerId"
              name="prisonerId"
              placeholder="Enter Prisoner ID"
              value={formData.prisonerId}
              onChange={handleChange}
              className="form-input"
            />

            <label htmlFor="visitDate" className="form-label">Visit Date</label>
            <input
              type="date"
              id="visitDate"
              name="visitDate"
              value={formData.visitDate}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="form-submit-btn">Submit Request</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VisitationRequestForm;
