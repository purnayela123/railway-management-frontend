import React from 'react';

const Logout = ({ setToken, setRole }) => {
  const handleLogout = () => {
    setToken(null);
    setRole(null);
  };

  return (
    <button onClick={handleLogout} style={styles.button}>Logout</button>
  );
};

const styles = {
  button: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  }
};

export default Logout;
