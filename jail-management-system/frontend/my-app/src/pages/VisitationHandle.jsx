// pages/VisitationHandle.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/VisitationHandle.css'; // Create this file

const VisitationHandle = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch visitation requests on component mount
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        // Use your backend route for fetching all requests
        const response = await axios.get('http://localhost:5000/api/visitation-requests/requests');
        setRequests(response.data);
      } catch (err) {
        setError('Failed to fetch visitation requests.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const handleApprove = async (id) => {
    try {
      // Use your backend route for approving
      await axios.put(`http://localhost:5000/api/visitation-requests/requests/${id}`, { status: 'Approved' });
      setRequests(requests.map(req => req._id === id ? { ...req, status: 'Approved' } : req));
    } catch (err) {
      setError('Failed to approve request.');
      console.error(err);
    }
  };

  const handleDeny = async (id) => {
    try {
      // Use your backend route for denying
      await axios.put(`http://localhost:5000/api/visitation-requests/requests/${id}`, { status: 'Denied' });
      setRequests(requests.map(req => req._id === id ? { ...req, status: 'Denied' } : req));
    } catch (err) {
      setError('Failed to deny request.');
      console.error(err);
    }
  };

  if (loading) return <div>Loading visitation requests...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="visitation-handle">
      <h1>Visitation Management</h1>
      <table className="visitation-table">
        <thead>
          <tr>
            <th>Visitor Name</th>
            <th>Prisoner Name</th>
            <th>Visit Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map(request => (
            <tr key={request._id}>
              <td>{request.visitorId?.name || 'N/A'}</td> {/* Assuming visitorId populates name */}
              <td>{request.prisonerId?.name || 'N/A'}</td> {/* Assuming prisonerId populates name */}
              <td>{new Date(request.visitDate).toLocaleDateString()}</td>
              <td>{request.status}</td>
              <td>
                {request.status === 'Pending' && (
                  <>
                    <button onClick={() => handleApprove(request._id)} className="btn btn-success">Approve</button>
                    <button onClick={() => handleDeny(request._id)} className="btn btn-danger">Deny</button>
                  </>
                )}
                {request.status !== 'Pending' && <span>-</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VisitationHandle;