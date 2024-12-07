import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BackButton from '../components/BackButton';
import '../styles/GuidelinesPage.css';

const GuidelinesPage = () => {
  const [guidelines, setGuidelines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGuidelines = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/guidelines');
        setGuidelines(response.data);
      } catch (err) {
        setError('Failed to load guidelines. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchGuidelines();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="guidelines-page">
      <BackButton />
      <h1>Visitor Guidelines</h1>
      {guidelines.length === 0 ? (
        <p>No guidelines available at the moment.</p>
      ) : (
        <ul>
          {guidelines.map((guideline) => (
            <li key={guideline._id}>
              <h3>{guideline.title}</h3>
              <p>{guideline.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GuidelinesPage;
