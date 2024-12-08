import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BackButton from '../components/BackButton';
import '../styles/VisitationRequest.css';

function VisitationRequest() {
    const [prisonerId, setPrisonerId] = useState('');
    const [visitDate, setVisitDate] = useState('');
    const [prisoners, setPrisoners] = useState([]);
    const [message, setMessage] = useState('');

    // Get visitor data from localStorage (assuming the visitor is logged in)
    const visitorData = JSON.parse(localStorage.getItem('visitorData'));

    useEffect(() => {
        const fetchPrisoners = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/prisoners');
                setPrisoners(response.data);
            } catch (error) {
                console.error('Error fetching prisoners:', error);
            }
        };

        fetchPrisoners();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!visitorData) {
            setMessage({ text: 'You must be logged in to make a visitation request.', type: 'error' });
            return;
        }

        const postData = {
            visitorEmail: visitorData.email,
            prisonerId,
            visitDate,
        };

        try {
            const response = await axios.post('http://localhost:5000/api/visitation-request/request', postData);

            if (response.status === 201) {
                setMessage({ text: 'Visitation request submitted successfully!', type: 'success' });
                setPrisonerId('');
                setVisitDate('');
            } else {
                setMessage({ text: 'Error: ' + response.data.message, type: 'error' });
            }
        } catch (error) {
            setMessage({ text: 'Error: ' + error.message, type: 'error' });
        }
    };

    return (
        <div className="visitation-request-container">
            <BackButton />
            <h2 className="visitation-title">Request a Visitation</h2>
            <form onSubmit={handleSubmit} className="form">
                <div className="form-group">
                    <label htmlFor="visitorName" className="form-label">
                        Visitor
                    </label>
                    <input
                        type="text"
                        id="visitorName"
                        value={visitorData?.name || 'Guest'}
                        readOnly
                        className="form-input form-input-readonly"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="prisonerId" className="form-label">
                        Prisoner
                    </label>
                    <select
                        id="prisonerId"
                        value={prisonerId}
                        onChange={(e) => setPrisonerId(e.target.value)}
                        className="form-input"
                        required
                    >
                        <option value="" disabled>
                            Select Prisoner
                        </option>
                        {prisoners.map((prisoner) => (
                            <option key={prisoner._id} value={prisoner._id}>
                                {prisoner.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="visitDate" className="form-label">
                        Visit Date
                    </label>
                    <input
                        type="date"
                        id="visitDate"
                        value={visitDate}
                        onChange={(e) => setVisitDate(e.target.value)}
                        className="form-input"
                        required
                    />
                </div>
                <button type="submit" className="form-submit-btn">
                    Submit Request
                </button>
            </form>
            {message && (
                <p
                    className={`message ${
                        message.type === 'success' ? 'success-message' : 'error-message'
                    }`}
                >
                    {message.text}
                </p>
            )}
        </div>
    );
}

export default VisitationRequest;
