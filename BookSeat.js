import React, { useState } from 'react';
import axios from 'axios';

const BookSeat = ({ token }) => {
  const [trainId, setTrainId] = useState('');
  const [seatCount, setSeatCount] = useState('');

  const handleBookSeat = async () => {
    try {
      await axios.post('http://localhost:3000/book', { train_id: trainId, seat_count: seatCount }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Booking successful');
    } catch (error) {
      console.error(error);
      alert('Failed to book seat');
    }
  };

  return (
    <div>
      <h2>Book a Seat</h2>
      <input type="text" placeholder="Train ID" onChange={e => setTrainId(e.target.value)} />
      <input type="number" placeholder="Seat Count" onChange={e => setSeatCount(e.target.value)} />
      <button onClick={handleBookSeat}>Book Seat</button>
    </div>
  );
};

export default BookSeat;
