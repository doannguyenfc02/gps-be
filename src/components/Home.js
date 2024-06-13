import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Welcome to GPS Jamming Classifier</h1>
      <p>This system allows you to upload and analyze GPS data for jamming detection.</p>
      <nav>
        <ul>
          <li><Link to="/upload">Upload File</Link></li>
          <li><Link to="/results">View Results</Link></li>
          <li><Link to="/manage">Manage Data</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default Home;
