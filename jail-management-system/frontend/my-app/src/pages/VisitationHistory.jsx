import React, { useState, useEffect } from "react";
import BackButton from "../components/BackButton";
import axios from "axios";
import "../styles/VisitationHistory.css";

const VisitationHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const visitorData = JSON.parse(localStorage.getItem("visitorData"));

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/visitation-request/history/${visitorData?.email}`
        );
        setHistory(response.data);
        setLoading(false);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "An error occurred while fetching history."
        );
        setLoading(false);
      }
    };

    fetchHistory();
  }, [visitorData?.cnic]);

  if (loading)
    return <p className="loading-text">Loading visitation history...</p>;
  if (error) return <p className="error-text">{error}</p>;

  return (
    <div className="visitation-history-container">
      <BackButton />
      <h2 className="history-title">Visitation History</h2>
      {history.length === 0 ? (
        <p className="no-history-text">No visitation history found.</p>
      ) : (
        <div className="table-container">
          <table className="history-table">
            <thead>
              <tr>
                <th>Prisoner Name</th>
                <th>Crime</th>
                <th>Visit Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {history.map((record) => (
                <tr key={record._id}>
                  <td>{record.prisonerId?.name || "Unknown"}</td>
                  <td>{record.prisonerId?.crime || "N/A"}</td>
                  <td>{new Date(record.visitDate).toLocaleDateString()}</td>
                  <td className={`status-${record.status.toLowerCase()}`}>
                    {record.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default VisitationHistory;
