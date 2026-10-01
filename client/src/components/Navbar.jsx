import React from 'react';

const Navbar = () => {
  return (
    <header style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem 2rem',
      backgroundColor: '#1a1a1a',
      color: '#ffffff'
    }}>
      <div style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>MERN App</div>
      <nav style={{ display: 'flex', gap: '1rem' }}>
        <a href="/" style={{ color: '#fff', textDecoration: 'none' }}>Home</a>
      </nav>
    </header>
  );
};

export default Navbar;
