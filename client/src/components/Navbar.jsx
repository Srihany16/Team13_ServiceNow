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
      <div
        onClick={() => onNavigate?.('dashboard')}
        style={{
          fontWeight: '900',
          fontSize: '1.3rem',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          letterSpacing: '-0.5px',
          cursor: 'pointer'
        }}
      >
        <span>🌊 RIPPLE</span>
        <span style={{ fontSize: '0.75rem', fontWeight: 600, background: '#3a8394', padding: '2px 8px', borderRadius: '999px', opacity: 0.9 }}>
          Student Console
        </span>
      </div>
      <nav style={{ display: 'flex', gap: '0.6rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <button
          type="button"
          onClick={() => onNavigate?.('dashboard')}
          style={{
            background: currentPage === 'dashboard' ? '#3a8394' : 'transparent',
            color: '#fff',
            border: 'none',
            padding: '8px 14px',
            borderRadius: '999px',
            fontWeight: 700,
            fontSize: '0.85rem',
            cursor: 'pointer',
            transition: 'background 0.15s ease'
          }}
        >
          👨‍🎓 Student Dashboard
        </button>
        <button
          type="button"
          onClick={() => onNavigate?.('support')}
          style={{
            background: currentPage === 'support' ? '#3a8394' : 'transparent',
            color: '#fff',
            border: 'none',
            padding: '8px 14px',
            borderRadius: '999px',
            fontWeight: 700,
            fontSize: '0.85rem',
            cursor: 'pointer',
            transition: 'background 0.15s ease'
          }}
        >
          🤝 Support Options (Module 3)
        </button>
        <button
          type="button"
          onClick={() => onNavigate?.('wellbeing')}
          style={{
            background: currentPage === 'wellbeing' ? '#3a8394' : 'transparent',
            color: '#fff',
            border: 'none',
            padding: '8px 14px',
            borderRadius: '999px',
            fontWeight: 700,
            fontSize: '0.85rem',
            cursor: 'pointer',
            transition: 'background 0.15s ease'
          }}
        >
          🌊 Wellbeing (Module 2)
        </button>
        <button
          type="button"
          onClick={() => onNavigate?.('staff')}
          style={{
            background: currentPage === 'staff' ? '#d8605e' : 'rgba(255, 255, 255, 0.12)',
            color: '#fff',
            border: currentPage === 'staff' ? 'none' : '1px solid rgba(255,255,255,0.25)',
            padding: '8px 14px',
            borderRadius: '999px',
            fontWeight: 800,
            fontSize: '0.85rem',
            cursor: 'pointer',
            transition: 'all 0.15s ease'
          }}
        >
          🛡️ Staff View: Shadow Queue
        </button>
      </nav>
    </header>
  );
};

export default Navbar;
