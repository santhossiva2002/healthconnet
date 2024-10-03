import React, { useState } from 'react';
import axios from 'axios';
import './HealthInfo.css';
import NavBar from '../NavBar/NavBar';

const HealthInfo = () => {
    const [condition, setCondition] = useState('');
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Function to convert condition string to API-friendly format
    const formatCondition = (condition) => {
        return condition
            .toLowerCase()                           // Convert to lowercase
            .normalize('NFD')                       // Normalize Unicode characters
            .replace(/[\u0300-\u036f]/g, '')        // Remove accents
            .replace(/[^a-z0-9-]/g, '-')            // Replace non-alphanumeric characters (excluding hyphens) with hyphens
            .replace(/-+/g, '-')                    // Replace multiple hyphens with a single hyphen
            .replace(/^-+|-+$/g, '');               // Remove leading and trailing hyphens
    };
    

    const handleSearch = () => {
        if (!condition.trim()) {
            alert('Please enter a condition');
            return;
        }

        setLoading(true);
        setError(null);

        const formattedCondition = formatCondition(condition);

        axios.get(`http://localhost:4000/api/conditions/${formattedCondition}`)
            .then(response => {
                setData(response.data);
                setLoading(false);
            })
            .catch(err => {
                setError(err);
                setLoading(false);
            });
    };

    return (
        <><NavBar /><div className="container">
            <header>
                <h1>Health Information Search</h1>
            </header>
            <div className="search-section">
                <input
                    type="text"
                    value={condition}
                    onChange={(e) => setCondition(e.target.value)}
                    placeholder="Enter condition" />
                <button onClick={handleSearch}>Search</button>
            </div>
            <div className="results">
                {loading && <p className="loading">Loading...</p>}
                {error && <p className="error">Error fetching data: {error.message}</p>}
                {data && (
                    <div>
                        <h2>{data.name}</h2>
                        <p>{data.description}</p>
                        <a href={data.url} target="_blank" rel="noopener noreferrer">More Information</a>
                        <div className="details">
                            <h2>Details</h2>
                            {data.hasPart && data.hasPart.map((part, index) => (
                                <div key={index}>
                                    <h3>{part.headline}</h3>
                                    <p dangerouslySetInnerHTML={{ __html: part.hasPart[0].text }}></p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div></>
    );
};

export default HealthInfo;
