// VisitationRequestForm.jsx
import React, { useState } from 'react';
import axios from 'axios';

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
      setErrorMessage('Please fill in all fields.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/visitation-request/request', formData);
      setSuccessMessage(response.data.message);
      setErrorMessage('');

      setFormData({
        visitorId: '',
        prisonerId: '',
        visitDate: '',
      });
    } catch (error) {
      setErrorMessage(error.response ? error.response.data.message : 'An error occurred.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="visitation-request-form">
      <h2>Request Visitation</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="visitorId"
          placeholder="Visitor ID"
          value={formData.visitorId}
          onChange={handleChange}
        />
        <input
          type="text"
          name="prisonerId"
          placeholder="Prisoner ID"
          value={formData.prisonerId}
          onChange={handleChange}
        />
        <input
          type="date"
          name="visitDate"
          placeholder="Visit Date"
          value={formData.visitDate}
          onChange={handleChange}
        />
        <button type="submit">Submit Request</button>
      </form>
    </div>
  );
};

export default VisitationRequestForm;
