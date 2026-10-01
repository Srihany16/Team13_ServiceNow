import React from 'react';

export default function ErrorState({
  message = "We couldn't load your pressure forecast.",
  onRetry
}) {
  return (
    <div
      style={{
        backgroundColor: '#fff',
        borderRadius: '20px',
        padding: '32px 24px',
        textAlign: 'center',
        margin: '16px 0',
        boxShadow: '0 4px 16px rgba(23, 66, 75, 0.05)',
        border: '1px solid #fedbd8'
      }}
      role="alert"
    >
      <div style={{ fontSize: '32px', marginBottom: '12px' }}>⚠️</div>
      <h3 style={{ margin: '0 0 8px', color: '#17424b', fontSize: '1.2rem', fontWeight: 800 }}>
        Something went wrong
      </h3>
      <p style={{ margin: '0 0 20px', color: '#68868c', fontSize: '0.95rem' }}>{message}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          style={{
            backgroundColor: '#1f5f6b',
            color: '#fff',
            border: 'none',
            borderRadius: '999px',
            padding: '10px 24px',
            fontSize: '0.95rem',
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'background 0.15s ease'
          }}
        >
          Try Again
        </button>
      )}
    </div>
  );
}
