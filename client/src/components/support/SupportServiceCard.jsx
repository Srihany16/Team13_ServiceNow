import React from 'react';

function formatWait(minutes) {
  if (!minutes) return 'Immediate';
  if (minutes < 60) return `${minutes} min wait`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours} hr wait`;
  const days = Math.round(hours / 24);
  return `~${days} days wait`;
}

export default function SupportServiceCard({ service, onConnect, isConnecting }) {
  if (!service) return null;

  const { supportId, name, availability, waitMinutes, status, description } = service;

  return (
    <div className="rp-service-card">
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: '#17424b' }}>
            {name}
          </h4>
          <span className="rp-wait-badge">{formatWait(waitMinutes)}</span>
        </div>

        <div className="rp-service-meta">
          <span>📅 {availability === 'TODAY' ? 'Available today' : availability.replace('_', ' ')}</span>
          <span>•</span>
          <span style={{ color: status === 'AVAILABLE' ? '#25755f' : '#8a6417', fontWeight: 700 }}>
            {status}
          </span>
        </div>

        {description && (
          <p style={{ margin: '0 0 16px', fontSize: '0.88rem', color: '#55737a', lineHeight: 1.45 }}>
            {description}
          </p>
        )}
      </div>

      <button
        type="button"
        disabled={isConnecting}
        onClick={() => onConnect(supportId, name)}
        className="rp-btn"
        style={{
          width: '100%',
          backgroundColor: '#1f5f6b',
          fontSize: '0.9rem',
          padding: '10px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '6px'
        }}
      >
        {isConnecting ? 'Connecting…' : `Connect with ${name}`}
      </button>
    </div>
  );
}
