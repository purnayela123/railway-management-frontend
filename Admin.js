import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Admin = ({ token }) => {
  const [trainName, setTrainName] = useState('');
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [totalSeats, setTotalSeats] = useState('');
  const [trains, setTrains] = useState([]);
  const [message, setMessage] = useState('');

  const fetchTrains = async () => {
    try {
      const response = await axios.get('http://localhost:5000/trains', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setTrains(response.data);
    } catch (error) {
      setMessage('Failed to fetch trains.');
    }
  };

  const handleAddTrain = async () => {
    try {
      const response = await axios.post('http://localhost:5000/trains', { train_name: trainName, source, destination, total_seats: totalSeats }, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setMessage(response.data.message);
      fetchTrains(); // Refresh train list after adding a train
    } catch (error) {
      setMessage('Failed to add train.');
    }
  };

  const handleUpdateSeats = async (trainId) => {
    try {
      const response = await axios.put('http://localhost:5000/trains', { train_id: trainId, total_seats: totalSeats }, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setMessage(response.data.message);
      fetchTrains(); // Refresh train list after updating seats
    } catch (error) {
      setMessage('Failed to update seats.');
    }
  };

  useEffect(() => {
    fetchTrains();
  }, [token]);

  return (
    <div style={styles.container}>
      <h2>Admin Operations</h2>
      <h3>Add Train</h3>
      <input
        type="text"
        placeholder="Train Name"
        value={trainName}
        onChange={(e) => setTrainName(e.target.value)}
        style={styles.input}
      />
      <input
        type="text"
        placeholder="Source"
        value={source}
        onChange={(e) => setSource(e.target.value)}
        style={styles.input}
      />
      <input
        type="text"
        placeholder="Destination"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
        style={styles.input}
      />
      <input
        type="number"
        placeholder="Total Seats"
        value={totalSeats}
        onChange={(e) => setTotalSeats(e.target.value)}
        style={styles.input}
      />
      <button onClick={handleAddTrain} style={styles.button}>Add Train</button>
      <p>{message}</p>

      <h3>Update Seats</h3>
      <select onChange={(e) => handleUpdateSeats(e.target.value)} style={styles.input}>
        <option value="">Select Train</option>
        {trains.map(train => (
          <option key={train.id} value={train.id}>{train.train_name}</option>
        ))}
      </select>
      <input
        type="number"
        placeholder="Total Seats"
        value={totalSeats}
        onChange={(e) => setTotalSeats(e.target.value)}
        style={styles.input}
      />
      <button onClick={() => handleUpdateSeats(document.querySelector('select').value)} style={styles.button}>Update Seats</button>
    </div>
  );
};

const styles = {
  container: {
    marginBottom: '20px'
  },
  input: {
    display: 'block',
    marginBottom: '10px',
    padding: '10px',
    width: '100%'
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  }
};

export default Admin;
