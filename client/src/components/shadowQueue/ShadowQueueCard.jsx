import React from 'react';
import StatusBadge from '../common/StatusBadge';

export default function ShadowQueueCard({ student, onViewProfile }) {
  if (!student) return null;

  const { studentId, status, severity, reason = [], recommendedDomain, recommendedAction } = student;

  return (
    <div className="rp-sq-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '1.25rem', fontWeight: 900, color: '#17424b' }}>
              {studentId}
            </span>
            <span
              style={{
                fontSize: '0.78rem',
                fontWeight: 800,
                padding: '3px 10px',
                borderRadius: '999px',
                backgroundColor: '#fedbd8',
                color: '#a33b39',
                letterSpacing: '0.04em'
              }}
            >
              {status.replace(/_/g, ' ')}
            </span>
            <StatusBadge level={severity}>
              Severity: {severity}
            </StatusBadge>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onViewProfile(studentId)}
          className="rp-btn"
          style={{
            backgroundColor: '#1f5f6b',
            padding: '8px 18px',
            fontSize: '0.85rem'
          }}
        >
          View Profile
        </button>
      </div>

      <div style={{ margin: '14px 0', fontSize: '0.9rem' }}>
        <strong style={{ color: '#17424b', display: 'block', marginBottom: '6px' }}>Why in Shadow Queue:</strong>
        <ul style={{ margin: 0, paddingLeft: '20px', color: '#55737a', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {reason.map((r, i) => (
            <li key={i}>{r}</li>
          ))}
        </ul>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', fontSize: '0.88rem', borderTop: '1px solid #eaf7f8', paddingTop: '10px' }}>
        <div>
          <span style={{ color: '#3a8394', fontWeight: 700 }}>Recommended:</span>{' '}
          <strong style={{ color: '#17424b' }}>{recommendedDomain}</strong>
        </div>
        <div>
          <span style={{ color: '#3a8394', fontWeight: 700 }}>Next action:</span>{' '}
          <strong style={{ color: '#17424b' }}>{recommendedAction.replace(/_/g, ' ')}</strong>
        </div>
      </div>
    </div>
  );
}
