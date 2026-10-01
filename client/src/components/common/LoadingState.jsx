import React from 'react';

export default function LoadingState({ message = 'Checking your week…' }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '48px 24px',
        textAlign: 'center',
        color: '#3a8394'
      }}
      role="status"
    >
      <div
        style={{
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          border: '3px solid #d3eef1',
          borderTopColor: '#1f5f6b',
          animation: 'spin 0.8s linear infinite',
          marginBottom: '16px'
        }}
      />
      <p style={{ fontWeight: 700, fontSize: '1.05rem', margin: 0 }}>{message}</p>
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
