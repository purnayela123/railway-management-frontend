import React, { useState } from 'react';
import axios from 'axios';

const AddTrain = ({ token }) => {
  const [trainName, setTrainName] = useState('');
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [totalSeats, setTotalSeats] = useState('');

  const handleAddTrain = async () => {
    try {
      await axios.post('http://localhost:3000/trains', { train_name: trainName, source, destination, total_seats: totalSeats }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Train added successfully');
    } catch (error) {
      console.error(error);
      alert('Failed to add train');
    }
  };

  return (
    <div>
      <h2>Add New Train</h2>
      <input type="text" placeholder="Train Name" onChange={e => setTrainName(e.target.value)} />
      <input type="text" placeholder="Source" onChange={e => setSource(e.target.value)} />
      <input type="text" placeholder="Destination" onChange={e => setDestination(e.target.value)} />
      <input type="number" placeholder="Total Seats" onChange={e => setTotalSeats(e.target.value)} />
      <button onClick={handleAddTrain}>Add Train</button>
    </div>
  );
};

export default AddTrain;
