import React, { useState, useEffect } from 'react';
import '../styles/VisitationRequest.css'
import BackButton from '../components/BackButton';

function VisitationRequest() {
    const [visitorId, setVisitorId] = useState('');
    const [prisonerId, setPrisonerId] = useState('');
    const [visitDate, setVisitDate] = useState('');
    const [visitors, setVisitors] = useState([]);
    const [prisoners, setPrisoners] = useState([]);
    const [message, setMessage] = useState('');

    // Fetch visitors and prisoners data from the backend
    useEffect(() => {
        const fetchData = async () => {
            const visitorsRes = await fetch('/api/visitors');
            const prisonersRes = await fetch('/api/prisoners');
            const visitorsData = await visitorsRes.json();
            const prisonersData = await prisonersRes.json();
            setVisitors(visitorsData);
            setPrisoners(prisonersData);
        };
        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/visitation-request/request', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ visitorId, prisonerId, visitDate }),
            });
            const data = await response.json();
            if (response.status === 201) {
                setMessage({ text: 'Visitation request submitted successfully!', type: 'success' });
            } else {
                setMessage({ text: 'Error: ' + data.message, type: 'error' });
            }
        } catch (error) {
            setMessage({ text: 'Error: ' + error.message, type: 'error' });
        }
    };

    return (
        <div className="visitation-request">
            <BackButton />
            <h2>Visitation Request</h2>
            <form onSubmit={handleSubmit} className="form">
                <label>
                    Visitor:
                    <select value={visitorId} onChange={(e) => setVisitorId(e.target.value)} required>
                        <option value="">Select Visitor</option>
                        {visitors.map((visitor) => (
                            <option key={visitor._id} value={visitor._id}>
                                {visitor.name}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    Prisoner:
                    <select value={prisonerId} onChange={(e) => setPrisonerId(e.target.value)} required>
                        <option value="">Select Prisoner</option>
                        {prisoners.map((prisoner) => (
                            <option key={prisoner._id} value={prisoner._id}>
                                {prisoner.name}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    Visit Date:
                    <input
                        type="date"
                        value={visitDate}
                        onChange={(e) => setVisitDate(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Submit Request</button>
            </form>
            {message && (
                <p className={message.type === 'success' ? 'success-message' : 'error-message'}>
                    {message.text}
                </p>
            )}
        </div>
    );
}

export default VisitationRequest;
