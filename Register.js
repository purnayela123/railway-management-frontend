import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('User');
  const [message, setMessage] = useState('');

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:5000/register', { username, password, role });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Registration failed.');
    }
  };

  return (
    <div style={styles.container}>
      <h2>Register</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={styles.input}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={styles.input}
      />
      <select value={role} onChange={(e) => setRole(e.target.value)} style={styles.input}>
        <option value="User">User</option>
        <option value="Admin">Admin</option>
      </select>
      <button onClick={handleRegister} style={styles.button}>Register</button>
      <p>{message}</p>
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

export default Register;
