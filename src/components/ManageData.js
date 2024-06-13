import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/ManageData.css'; // Đảm bảo rằng đường dẫn đúng

const ManageData = () => {
  const [dataList, setDataList] = useState([]);
  const [message, setMessage] = useState('');
  const [details, setDetails] = useState(null); // State để lưu chi tiết dữ liệu
  const [selectedId, setSelectedId] = useState(null); // State để lưu trữ id của mục đang được chọn

  useEffect(() => {
    axios.get('https://localhost:7162/api/DataManagement')
      .then((response) => {
        setDataList(response.data);
        if (response.data.length > 0) {
          handleViewDetails(response.data[0].id); // Chọn mục đầu tiên để xem chi tiết
        }
      })
      .catch((error) => {
        setMessage('Error fetching data: ' + error.message);
      });
  }, []);

  const handleDelete = (id) => {
    axios.delete(`https://localhost:7162/api/DataManagement/${id}`)
      .then((response) => {
        setMessage('Data deleted successfully.');
        const updatedDataList = dataList.filter(item => item.id !== id);
        setDataList(updatedDataList);
        if (updatedDataList.length > 0) {
          handleViewDetails(updatedDataList[0].id); // Cập nhật chi tiết với mục đầu tiên còn lại
        } else {
          setDetails(null); // Xóa chi tiết khi không còn dữ liệu
        }
      })
      .catch((error) => {
        setMessage('Error deleting data: ' + error.message);
      });
  };

  const handleViewDetails = (id) => {
    setSelectedId(id); // Cập nhật id của mục đang được chọn
    axios.get(`https://localhost:7162/api/Spectrograms/${id}`)
      .then((response) => {
        setDetails(response.data);
      })
      .catch((error) => {
        setMessage('Error fetching details: ' + error.message);
      });
  };

  return (
    <div className="manage-data-container">
      <div className="data-list">
        <h1>Manage Data</h1>
        {message && <p>{message}</p>}
        <div>
          {dataList.map((data) => (
            <div
              key={data.id}
              className={`data-item ${selectedId === data.id ? 'selected' : ''}`}
              onClick={() => handleViewDetails(data.id)} // Thêm sự kiện onClick cho toàn bộ div
            >
              <h3>{data.description}</h3>
              <p>Timestamp: {new Date(data.timestamp).toLocaleString()}</p>
              <button onClick={(e) => {e.stopPropagation(); handleDelete(data.id);}}>Delete</button>
            </div>
          ))}
        </div>
      </div>
      <div className="details-view">
        {details ? (
          <div>
            <h2>Details</h2>
            {details.map((detail, index) => (
              <div key={index} className="detail-item">
                <h3>{detail.class}</h3>
                <img src={`data:image/png;base64,${detail.dataBase64}`} alt={detail.class} />
              </div>
            ))}
          </div>
        ) : (
          <p>Select a signal data to view details</p>
        )}
      </div>
    </div>
  );
};

export default ManageData;
