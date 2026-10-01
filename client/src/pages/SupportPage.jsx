import React from 'react';
import SupportOptions from '../components/support/SupportOptions';

export default function SupportPage({ studentId = 'STU001' }) {
  return (
    <div style={{ maxWidth: '1040px', margin: '0 auto', fontFamily: "'Nunito', system-ui, sans-serif" }}>
      <header style={{ marginBottom: '20px' }}>
        <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#1f5f6b', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Connect → Support
        </span>
        <h1 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', fontWeight: 900, color: '#17424b', margin: '4px 0', letterSpacing: '-0.5px' }}>
          Support Pathways
        </h1>
        <p style={{ margin: 0, color: '#3a8394', fontSize: '0.95rem', fontWeight: 600 }}>
          Find support tailored to your current academic and personal rhythm.
        </p>
      </header>

      <SupportOptions studentId={studentId} />
    </div>
  );
}
