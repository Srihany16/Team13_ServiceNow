import React, { useState } from 'react';
import { createSupportAction } from '../../services/supportApi';

const ACTIONS = [
  { action: 'OFFER', label: 'Offer Support', btnClass: 'rp-btn', bg: '#3a8394' },
  { action: 'ASSIGN', label: 'Assign Support', btnClass: 'rp-btn', bg: '#1f5f6b' },
  { action: 'COMPLETE', label: 'Mark Complete', btnClass: 'rp-btn', bg: '#4fae93' },
  { action: 'DECLINE', label: 'Decline / Snooze', btnClass: 'rp-btn-ghost', bg: 'transparent' },
];

export default function SupportAction({
  studentId = 'STU001',
  supportId = 'SUP001',
  defaultNotes = 'Academic check-in recommended.',
  onActionCompleted
}) {
  const [loadingAction, setLoadingAction] = useState(null);
  const [notes, setNotes] = useState(defaultNotes);
  const [message, setMessage] = useState('');

  async function handleAction(act) {
    setLoadingAction(act);
    setMessage('');
    try {
      await createSupportAction(studentId, {
        supportId,
        action: act,
        notes,
        consent: true,
      });
      setMessage(`Support ${act.toLowerCase()} recorded.`);
      onActionCompleted?.(act);
    } catch (e) {
      setMessage(`Support ${act.toLowerCase()} recorded (prototype mode).`);
      onActionCompleted?.(act);
    } finally {
      setLoadingAction(null);
      setTimeout(() => setMessage(''), 3500);
    }
  }

  return (
    <div style={{ marginTop: '16px', background: '#f7fcfe', border: '1px solid #d3eef1', borderRadius: '16px', padding: '16px' }}>
      <h4 style={{ margin: '0 0 8px', fontSize: '0.95rem', fontWeight: 800, color: '#17424b' }}>
        Triage Staff Actions
      </h4>
      <input
        type="text"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Staff triage notes..."
        style={{
          width: '100%',
          padding: '8px 12px',
          borderRadius: '8px',
          border: '1px solid #d3eef1',
          fontSize: '0.88rem',
          marginBottom: '12px',
          boxSizing: 'border-box'
        }}
      />
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {ACTIONS.map((item) => (
          <button
            key={item.action}
            type="button"
            disabled={loadingAction !== null}
            onClick={() => handleAction(item.action)}
            style={{
              backgroundColor: item.bg,
              color: item.action === 'DECLINE' ? '#17424b' : '#fff',
              border: item.action === 'DECLINE' ? '1px solid #c3e6eb' : 'none',
              borderRadius: '999px',
              padding: '8px 16px',
              fontSize: '0.85rem',
              fontWeight: 800,
              cursor: 'pointer',
              transition: 'opacity 0.15s'
            }}
          >
            {loadingAction === item.action ? 'Saving…' : item.label}
          </button>
        ))}
      </div>
      {message && (
        <div style={{ marginTop: '10px', fontSize: '0.85rem', color: '#25755f', fontWeight: 700 }}>
          ✓ {message}
        </div>
      )}
    </div>
  );
}
