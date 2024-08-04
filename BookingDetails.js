import React, { useState } from 'react';
import axios from 'axios';

const BookingDetails = ({ token }) => {
  const [bookingId, setBookingId] = useState('');
  const [bookingDetails, setBookingDetails] = useState(null);

  const handleGetDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/bookings/${bookingId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBookingDetails(response.data);
    } catch (error) {
      console.error(error);
      alert('Failed to fetch booking details');
    }
  };

  return (
    <div>
      <h2>Booking Details</h2>
      <input type="text" placeholder="Booking ID" onChange={e => setBookingId(e.target.value)} />
      <button onClick={handleGetDetails}>Get Details</button>
      {bookingDetails && (
        <div>
          <p>Train ID: {bookingDetails.train_id}</p>
          <p>Seat Count: {bookingDetails.seat_count}</p>
        </div>
      )}
    </div>
  );
};

export default BookingDetails;
