import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';
import Admin from './Admin';
import User from './User';

const App = () => {
  const [token, setToken] = useState('');
  const [role, setRole] = useState('');

  const handleLogin = (newToken, newRole) => {
    setToken(newToken);
    setRole(newRole);
  };

  const handleLogout = () => {
    setToken('');
    setRole('');
  };

  return (
    <div style={styles.container}>
      <h1>Railway Management System</h1>
      {!token ? (
        <div>
          <Login onLogin={handleLogin} />
          <Register />
        </div>
      ) : (
        <div>
          <button onClick={handleLogout} style={styles.button}>Logout</button>
          {role === 'Admin' ? <Admin token={token} /> : <User token={token} />}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto'
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

export default App;
