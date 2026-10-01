import React from 'react';
import ShadowQueue from '../components/shadowQueue/ShadowQueue';

export default function StaffDashboard() {
  return (
    <div style={{ maxWidth: '1040px', margin: '0 auto', fontFamily: "'Nunito', system-ui, sans-serif" }}>
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          marginBottom: '20px'
        }}
      >
        <div>
          <span
            style={{
              fontSize: '0.8rem',
              fontWeight: 800,
              color: '#d8605e',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              display: 'inline-block',
              marginBottom: '2px'
            }}
          >
            Staff Triage Console
          </span>
          <h1 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', fontWeight: 900, color: '#17424b', margin: '0 0 4px', letterSpacing: '-0.5px' }}>
            Campus Support & Triage Operations
          </h1>
          <p style={{ margin: 0, color: '#3a8394', fontSize: '0.95rem', fontWeight: 600 }}>
            “Don't just track who entered support. Track who needed a bridge — and never found one.”
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span
            style={{
              fontSize: '0.8rem',
              fontWeight: 700,
              padding: '6px 14px',
              borderRadius: '999px',
              backgroundColor: '#17424b',
              color: '#ffffff'
            }}
          >
            Role: Authorized Support Staff
          </span>
        </div>
      </header>

      <ShadowQueue />
    </div>
  );
}
