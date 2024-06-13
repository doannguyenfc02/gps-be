import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './components/Home';
import UploadFile from './components/UploadFile';
import ViewResults from './components/ViewResults';
import ManageData from './components/ManageData';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <ul className="menu">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/upload">Upload File</Link></li>
            <li><Link to="/results">View Results</Link></li>
            <li><Link to="/manage">Manage Data</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/upload" element={<UploadFile />} />
          <Route path="/results" element={<ViewResults />} />
          <Route path="/manage" element={<ManageData />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
