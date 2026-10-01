import React from 'react';

const Navbar = ({ currentPage, onNavigate }) => {
  return (
    <header style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0.9rem 1.8rem',
      backgroundColor: '#17424b',
      color: '#ffffff',
      boxShadow: '0 2px 10px rgba(23, 66, 75, 0.15)'
    }}>
      <div style={{ fontWeight: '900', fontSize: '1.3rem', display: 'flex', alignItems: 'center', gap: '8px', letterSpacing: '-0.5px' }}>
        <span>🌊 RIPPLE</span>
        <span style={{ fontSize: '0.75rem', fontWeight: 600, background: '#3a8394', padding: '2px 8px', borderRadius: '999px', opacity: 0.9 }}>
          Student Wellbeing
        </span>
      </div>
      <nav style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
        <button
          type="button"
          onClick={() => onNavigate?.('wellbeing')}
          style={{
            background: currentPage === 'wellbeing' ? '#3a8394' : 'transparent',
            color: '#fff',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '999px',
            fontWeight: 700,
            fontSize: '0.9rem',
            cursor: 'pointer',
            transition: 'background 0.15s ease'
          }}
        >
          Weekly Wellbeing (Module 2)
        </button>
        <button
          type="button"
          onClick={() => onNavigate?.('home')}
          style={{
            background: currentPage === 'home' ? '#3a8394' : 'transparent',
            color: '#fff',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '999px',
            fontWeight: 700,
            fontSize: '0.9rem',
            cursor: 'pointer',
            transition: 'background 0.15s ease'
          }}
        >
          Backend Status
        </button>
      </nav>
    </header>
  );
};

export default Navbar;
