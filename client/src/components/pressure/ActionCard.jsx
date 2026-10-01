import React, { useState } from 'react';

const ACTION_MAP = {
  PLAN_WEEK: {
    label: 'Plan My Week',
    icon: '🗓️',
    description: 'Break down your assignments into manageable daily blocks.'
  },
  ACADEMIC_SUPPORT: {
    label: 'Get Academic Support',
    icon: '🎓',
    description: 'Connect with a peer tutor or subject specialist.'
  },
  PEER_SUPPORT: {
    label: 'Talk to a Peer',
    icon: '💬',
    description: 'Reach out to a peer listener or classmate in confidence.'
  },
};

export default function ActionCard({ actions = [] }) {
  const [selectedAction, setSelectedAction] = useState(null);

  if (!actions || actions.length === 0) {
    return null;
  }

  return (
    <div className="rp-actions-wrap">
      <h3>Recommended actions to ease the load:</h3>
      <div className="rp-actions-grid">
        {actions.map((actKey) => {
          const info = ACTION_MAP[actKey] || {
            label: actKey.replace(/_/g, ' '),
            icon: '⚡',
            description: 'Actionable option to support your week.'
          };

          return (
            <button
              key={actKey}
              type="button"
              className="rp-action-btn"
              onClick={() => setSelectedAction(actKey)}
            >
              <span aria-hidden="true">{info.icon}</span>
              <span>{info.label}</span>
            </button>
          );
        })}
      </div>

      {selectedAction && (
        <div
          style={{
            marginTop: '14px',
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
            borderRadius: '12px',
            padding: '12px 16px',
            fontSize: '0.9rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backdropFilter: 'blur(6px)',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}
        >
          <div>
            <strong>{(ACTION_MAP[selectedAction] || {}).label}:</strong>{' '}
            {(ACTION_MAP[selectedAction] || {}).description}
          </div>
          <button
            type="button"
            onClick={() => setSelectedAction(null)}
            style={{
              background: 'none',
              border: 'none',
              color: '#fff',
              fontSize: '18px',
              cursor: 'pointer',
              marginLeft: '12px'
            }}
            aria-label="Close action details"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
}
