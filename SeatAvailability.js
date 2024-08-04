import React, { useState } from 'react';
import axios from 'axios';

const SeatAvailability = ({ token }) => {
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [availability, setAvailability] = useState([]);

  const checkAvailability = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/trains', {
        params: { source, destination },
        headers: { Authorization: `Bearer ${token}` }
      });
      setAvailability(response.data);
    } catch (error) {
      console.error('Error checking seat availability:', error);
    }
  };

  return (
    <div>
      <h2>Check Seat Availability</h2>
      <input type="text" value={source} onChange={(e) => setSource(e.target.value)} placeholder="Source" />
      <input type="text" value={destination} onChange={(e) => setDestination(e.target.value)} placeholder="Destination" />
      <button onClick={checkAvailability}>Check Availability</button>

      <h3>Available Seats</h3>
      <ul>
        {availability.map((train) => (
          <li key={train.id}>
            {train.train_name} - {train.source} to {train.destination} - Seats: {train.total_seats}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SeatAvailability;
