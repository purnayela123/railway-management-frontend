import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Dropdown} from 'antd'

const User = ({ token }) => {
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [seatCount, setSeatCount] = useState('');
  const [availability, setAvailability] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [message, setMessage] = useState('');

  const checkAvailability = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/seats?source=${source}&destination=${destination}`);
      setAvailability(response.data);
    } catch (error) {
      setMessage('Failed to fetch availability.');
    }
  };

  const bookSeat = async (trainId) => {
    try {
      const response = await axios.post('http://localhost:5000/book', { train_id: trainId, seat_count: seatCount }, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setMessage(response.data.message);
      fetchBookings();  // Refresh bookings after successful booking
    } catch (error) {
      setMessage('Booking failed.');
    }
  };

  const fetchBookings = async () => {
    try {
      const response = await axios.get('http://localhost:5000/bookings', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setBookings(response.data);
    } catch (error) {
      setMessage('Failed to fetch bookings.');
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [token]);

  return (
    <div style={styles.container}>
      <h2>User Operations</h2>
      <h3>Check Seat Availability</h3>
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
      <button onClick={checkAvailability} style={styles.button}>Check Availability</button>
      <h3>Available Trains</h3>
      <ul>
        {availability.map(train => (
          <li key={train.id}>
            {train.train_name} - {train.total_seats} seats available
            <input
              type="number"
              placeholder="Seats to book"
              value={seatCount}
              onChange={(e) => setSeatCount(e.target.value)}
              style={styles.input}
            />
            <button onClick={() => bookSeat(train.id)} style={styles.button}>Book Seat</button>
          </li>
        ))}
      </ul>
      <p>{message}</p>

      <h3>Your Bookings</h3>
      <ul>
        {bookings.map(booking => (
          <li key={booking.id}>
            Booking ID: {booking.id}, Train ID: {booking.train_id}, Seats Booked: {booking.seat_count}
          </li>
        ))}
      </ul>
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

export default User;
