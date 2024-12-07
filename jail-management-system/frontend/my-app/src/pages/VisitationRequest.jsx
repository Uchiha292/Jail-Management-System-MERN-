import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BackButton from '../components/BackButton';

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
    
        // Check if the visitor is logged in
        if (!visitorData) {
            setMessage({ text: 'You must be logged in to make a visitation request.', type: 'error' });
            return;
        }
    
        // Log the visitorData to ensure it contains the email property
        console.log('Visitor Data:', visitorData);  // Make sure this contains `email`
    
        const postData = {
            visitorEmail: visitorData.email,  // Ensure visitorData contains email
            prisonerId,
            visitDate
        };
    
        console.log('Data being posted:', postData);  // Log postData to ensure it's correct
   
        try {
            // Send the visitation request to the backend
            const response = await axios.post('http://localhost:5000/api/visitation-request/request', postData);
    
            if (response.status === 201) {
                setMessage({ text: 'Visitation request submitted successfully!', type: 'success' });
            } else {
                setMessage({ text: 'Error: ' + response.data.message, type: 'error' });
            }
        } catch (error) {
            console.log('Error Response:', error.response?.data);  // Log error response
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
                    <input type="text" value={visitorData?.name} readOnly />
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
