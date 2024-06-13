import React, { useState, useRef } from 'react';
import axios from 'axios';
import './css/UploadFile.css'; // Import file CSS

const UploadFile = () => {
  const [file, setFile] = useState(null);
  const [numImages, setNumImages] = useState(2);
  const [fs, setFs] = useState(10e6);
  const [time, setTime] = useState(10);
  const [message, setMessage] = useState('');
  const [showDetails, setShowDetails] = useState(false);
  const [images, setImages] = useState([]);
  const [signalDataId, setSignalDataId] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [showResults, setShowResults] = useState(false); // State để quản lý hiển thị kết quả

  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleNumImagesChange = (event) => {
    setNumImages(event.target.value);
  };

  const handleFsChange = (event) => {
    setFs(event.target.value);
  };

  const handleTimeChange = (event) => {
    setTime(event.target.value);
  };

  const handleFileUpload = async () => {
    setIsUploading(true);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('numImages', numImages);
    formData.append('fs', fs);
    formData.append('time', time);

    try {
      const response = await axios.post('https://localhost:7162/api/FileUpload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
        timeout: 0,
      });

      if (response.status === 200) {
        setMessage('File uploaded successfully: ' + response.data.message);
        setSignalDataId(response.data.signalDataId);
        setShowResults(true); // Hiển thị kết quả sau khi tải lên thành công
      } else if (response.status === 202) {
        setMessage('File is being processed. Please check back later for the results.');
        setShowResults(true); // Hiển thị kết quả sau khi tải lên thành công
      } else {
        setMessage('Unexpected response from server: ' + response.status);
      }
    } catch (error) {
      if (error.response) {
        setMessage('Error uploading file: ' + error.response.data);
      } else if (error.request) {
        setMessage('Error uploading file: No response received from server');
      } else {
        setMessage('Error uploading file: ' + error.message);
      }
    } finally {
      setIsUploading(false);
    }
  };

  const handleViewDetails = () => {
    axios.get(`https://localhost:7162/api/Spectrograms/${signalDataId}`)
      .then((response) => {
        setImages(response.data);
        setShowDetails(true); // Hiển thị chi tiết khi nhận được dữ liệu
      })
      .catch((error) => {
        setMessage('Error fetching images: ' + error.message);
      });
  };

  const handleToggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const handleReset = () => {
    setFile(null);
    setNumImages(2);
    setFs(10e6);
    setTime(10);
    setMessage('');
    setShowDetails(false);
    setImages([]);
    setSignalDataId(null);
    setIsUploading(false);
    setShowResults(false);

    // Reset input file
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  return (
    <div>
      <h1>GPS Jamming Classifier</h1>
      <div className="results-container">
        <div className="left-panel">
          <div>
            <label>Chọn tệp:</label>
            <input 
              type="file" 
              onChange={handleFileChange} 
              disabled={isUploading || showResults} 
              ref={fileInputRef} 
            />
          </div>
          <div>
            <label>Số lượng ảnh:</label>
            <input 
              type="number" 
              value={numImages} 
              onChange={handleNumImagesChange} 
              placeholder="Number of Images" 
              disabled={isUploading || showResults} 
            />
          </div>
          <div>
            <label>Tần số lấy mẫu (Hz):</label>
            <input 
              type="number" 
              value={fs} 
              onChange={handleFsChange} 
              placeholder="Sampling Frequency (Hz)" 
              disabled={isUploading || showResults} 
            />
          </div>
          <div>
            <label>Thời gian phân tích (s):</label>
            <input 
              type="number" 
              value={time} 
              onChange={handleTimeChange} 
              placeholder="Analysis Time (s)" 
              disabled={isUploading || showResults} 
            />
          </div>
          {!showResults ? (
            <button onClick={handleFileUpload} disabled={isUploading}>Upload File</button>
          ) : (
            <button onClick={handleReset}>Reset</button>
          )}
          {showResults && (
            <>
              <h2>Detection Results</h2>
              <p>{message}</p>
              {showDetails ? (
                <button onClick={handleToggleDetails}>Hide Details</button>
              ) : (
                <button onClick={handleViewDetails}>View Details</button>
              )}
            </>
          )}
        </div>
        {showDetails && (
          <div className="right-panel">
            {images.map((image, index) => (
              <div key={index}>
                <img src={`data:image/png;base64,${image.dataBase64}`} alt={image.class} />
                <p>Jamming class: {image.class}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadFile;
