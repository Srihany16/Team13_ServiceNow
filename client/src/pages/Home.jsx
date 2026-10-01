import React, { useEffect, useState } from 'react';
import { fetchHealth } from '../services/api';

const Home = () => {
  const [serverStatus, setServerStatus] = useState('Checking server status...');

  useEffect(() => {
    fetchHealth()
      .then((data) => setServerStatus(`Server Connected: ${data.status}`))
      .catch(() => setServerStatus('Backend server not connected. (Start server to connect)'));
  }, []);

  return (
    <section style={{ textAlign: 'center', marginTop: '2rem' }}>
      <h1>Welcome to MERN Full-Stack App</h1>
      <p style={{ marginTop: '1rem', color: '#666' }}>
        A structured boilerplate with MongoDB, Express, React, and Node.js.
      </p>
      <div style={{
        marginTop: '1.5rem',
        padding: '1rem',
        borderRadius: '8px',
        background: '#f4f4f4',
        display: 'inline-block'
      }}>
        <strong>Backend Status:</strong> {serverStatus}
      </div>
    </section>
  );
};

export default Home;
