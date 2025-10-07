// pages/CellManager.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/CellManager.css'; // Create this file

const CellManager = () => {
  const [cells, setCells] = useState([]);
  const [prisoners, setPrisoners] = useState([]); // For assigning prisoners
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for Add/Edit form
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentCell, setCurrentCell] = useState(null);
  const [formData, setFormData] = useState({
    cellNo: '',
    capacity: '',
    prisoner: '' // ID for adding prisoner to cell
  });

  // Fetch cells and prisoners on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cellsRes, prisonersRes] = await Promise.all([
          axios.get('http://localhost:5000/api/cells'), // Use your backend route
          axios.get('http://localhost:5000/api/prisoners')  // Use your backend route
        ]);
        setCells(cellsRes.data);
        setPrisoners(prisonersRes.data);
      } catch (err) {
        setError('Failed to fetch data.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddCellClick = () => {
    setCurrentCell(null);
    setFormData({ cellNo: '', capacity: '', prisoner: '' });
    setIsFormOpen(true);
  };

  const handleDeleteCellClick = async (id) => {
    if (window.confirm('Are you sure you want to delete this cell?')) {
      try {
        await axios.delete(`http://localhost:5000/api/cells/${id}`); // Use your backend route
        setCells(cells.filter(c => c._id !== id));
      } catch (err) {
        setError('Failed to delete cell.');
        console.error(err);
      }
    }
  };

  const handleAddPrisonerToCell = async (cellId) => {
    if (!formData.prisoner) {
      alert('Please select a prisoner.');
      return;
    }
    try {
      // Use your backend route for adding prisoner to cell
      const response = await axios.put('http://localhost:5000/api/cells/add-prisoner', {
        cellID: cellId,
        PrisonerID: formData.prisoner
      });
      // Update the local state to reflect the change (optional, depends on backend response)
      setCells(cells.map(c => c._id === cellId ? response.data.GivenCell : c));
    } catch (err) {
      setError('Failed to add prisoner to cell.');
      console.error(err);
    }
  };

  const handleRemovePrisonerFromCell = async (cellId, prisonerId) => {
    if (window.confirm('Are you sure you want to remove this prisoner from the cell?')) {
      try {
        // Use your backend route for removing prisoner from cell
        const response = await axios.put('http://localhost:5000/api/cells/remove-prisoner', {
          cellID: cellId,
          PrisonerID: prisonerId
        });
        // Update the local state to reflect the change (optional, depends on backend response)
        setCells(cells.map(c => c._id === cellId ? response.data.GivenCell : c));
      } catch (err) {
        setError('Failed to remove prisoner from cell.');
        console.error(err);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Add new cell
      const response = await axios.post('http://localhost:5000/api/cells/add', formData); // Use your backend route
      setCells([...cells, response.data]);
      setIsFormOpen(false);
    } catch (err) {
      setError('Failed to add cell.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsFormOpen(false);
    setCurrentCell(null);
  };

  if (loading) return <div>Loading cells...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="cell-manager">
      <h1>Cell Management</h1>
      <button onClick={handleAddCellClick} className="btn btn-primary">Add Cell</button>

      {isFormOpen && (
        <div className="form-overlay">
          <form onSubmit={handleSubmit} className="cell-form">
            <h2>Add New Cell</h2>
            <input
              type="text"
              name="cellNo"
              placeholder="Cell Number"
              value={formData.cellNo}
              onChange={handleInputChange}
              required
            />
            <input
              type="number"
              name="capacity"
              placeholder="Capacity"
              value={formData.capacity}
              onChange={handleInputChange}
              required
            />
            {/* Note: Adding prisoner directly during cell creation might not be intended */}
            <div className="form-buttons">
              <button type="submit" className="btn btn-success">Add Cell</button>
              <button type="button" onClick={handleCancel} className="btn btn-secondary">Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div className="cell-list">
        {cells.map(cell => (
          <div key={cell._id} className="cell-card">
            <h3>Cell {cell.cellNo}</h3>
            <p>Capacity: {cell.capacity}</p>
            <p>Occupants: {cell.prisoners?.length || 0} / {cell.capacity}</p>
            <div className="cell-prisoners">
              <h4>Occupants:</h4>
              <ul>
                {cell.prisoners?.map(p => (
                  <li key={p._id}>
                    {p.name} ({p.crime})
                    <button onClick={() => handleRemovePrisonerFromCell(cell._id, p._id)} className="btn btn-danger btn-sm">Remove</button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="cell-actions">
              <select
                name="prisoner"
                value={formData.prisoner}
                onChange={handleInputChange}
              >
                <option value="">Select Prisoner to Add</option>
                {prisoners.filter(p => !cell.prisoners?.some(cp => cp._id === p._id)).map(p => ( // Filter out prisoners already in this cell
                  <option key={p._id} value={p._id}>{p.name}</option>
                ))}
              </select>
              <button onClick={() => handleAddPrisonerToCell(cell._id)} className="btn btn-success btn-sm">Add to Cell</button>
              <button onClick={() => handleDeleteCellClick(cell._id)} className="btn btn-danger btn-sm">Delete Cell</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CellManager;