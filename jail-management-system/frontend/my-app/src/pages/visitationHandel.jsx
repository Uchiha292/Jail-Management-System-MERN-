import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/VisitationHistory.css";

const visitationHandel = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/visitation-requests");
        setRequests(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || "An error occurred while fetching requests.");
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const handleApproval = async (id) => {
    try {
      const response = await axios.put("http://localhost:5000/api/visitation-requests/approve", {
        VisitationRequestID: id,
      });
      setMessage(response.data.message);
      setRequests((prev) =>
        prev.map((req) =>
          req._id === id ? { ...req, status: "Approved" } : req
        )
      );
    } catch (err) {
      setError(err.response?.data?.message || "Error approving request.");
    }
  };

  const handleDenial = async (id) => {
    try {
      const response = await axios.put("http://localhost:5000/api/visitation-requests/deny", {
        VisitationRequestID: id,
      });
      setMessage(response.data.message);
      setRequests((prev) =>
        prev.map((req) =>
          req._id === id ? { ...req, status: "Denied" } : req
        )
      );
    } catch (err) {
      setError(err.response?.data?.message || "Error denying request.");
    }
  };

  if (loading) return <p>Loading requests...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="visitation-requests-container">
      <h2>Visitation Requests</h2>
      {message && <p className="message">{message}</p>}
      {requests.length === 0 ? (
        <p>No visitation requests found.</p>
      ) : (
        <table className="requests-table">
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
            {requests.map((request) => (
              <tr key={request._id}>
                <td>{request.visitorId?.name || "Unknown"}</td>
                <td>{request.prisonerId?.name || "Unknown"}</td>
                <td>{new Date(request.visitDate).toLocaleDateString()}</td>
                <td className={`status-${request.status.toLowerCase()}`}>
                  {request.status}
                </td>
                <td>
                  <button
                    className="approve-button"
                    onClick={() => handleApproval(request._id)}
                    disabled={request.status === "Approved"}
                  >
                    Approve
                  </button>
                  <button
                    className="deny-button"
                    onClick={() => handleDenial(request._id)}
                    disabled={request.status === "Denied"}
                  >
                    Deny
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default visitationHandel;
