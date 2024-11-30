// src/components/VisitorRegistration.jsx
import React, { useState } from "react";
import { TextField, Button, MenuItem, Select, FormControl, InputLabel, Container, Typography } from "@mui/material";

const VisitorRegistration = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    visitorType: "",
    visitDate: "",
    visitTime: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Visitor Registration
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Full Name"
          variant="outlined"
          fullWidth
          margin="normal"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
        />
        <TextField
          label="Phone"
          variant="outlined"
          fullWidth
          margin="normal"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Visitor Type</InputLabel>
          <Select
            label="Visitor Type"
            name="visitorType"
            value={formData.visitorType}
            onChange={handleChange}
          >
            <MenuItem value="Regular">Regular</MenuItem>
            <MenuItem value="Legal">Legal</MenuItem>
            <MenuItem value="Family">Family</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Visit Date"
          variant="outlined"
          fullWidth
          margin="normal"
          name="visitDate"
          type="date"
          value={formData.visitDate}
          onChange={handleChange}
        />
        <TextField
          label="Preferred Time"
          variant="outlined"
          fullWidth
          margin="normal"
          name="visitTime"
          type="time"
          value={formData.visitTime}
          onChange={handleChange}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: "20px" }}>
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default VisitorRegistration;
