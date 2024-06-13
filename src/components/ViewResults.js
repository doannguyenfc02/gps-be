import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewResults = () => {
  const [results, setResults] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('https://localhost:7162/api/Spectrograms/1') // Thay đổi '1' thành signalDataId thực tế
      .then((response) => {
        setResults(response.data);
      })
      .catch((error) => {
        setMessage('Error fetching results: ' + error.message);
      });
  }, []);

  return (
    <div>
      <h1>Detection Results</h1>
      {message && <p>{message}</p>}
      <div>
        {results.map((result, index) => (
          <div key={index}>
            <h3>{result.class}</h3>
            <img src={`data:image/png;base64,${result.dataBase64}`} alt={result.class} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewResults;
