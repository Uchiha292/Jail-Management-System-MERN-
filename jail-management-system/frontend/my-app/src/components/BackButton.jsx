// src/components/BackButton.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button 
      onClick={() => navigate(-1)} 
      style={{
        padding: "10px 20px",
        margin: "10px 0",
        backgroundColor: "#007bff",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer"
      }}
    >
      Back
    </button>
  );
};

export default BackButton;
