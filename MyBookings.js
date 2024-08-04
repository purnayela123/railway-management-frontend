import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MyBookings = ({ token }) => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/bookings', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setBookings(response.data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, [token]);

  return (
    <div>
      <h2>My Bookings</h2>
      <ul>
        {bookings.map((booking) => (
          <li key={booking.id}>
            Train ID: {booking.train_id} - Seats: {booking.seat_count}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyBookings;
