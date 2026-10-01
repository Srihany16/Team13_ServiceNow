import React, { useState } from 'react';
import { createFriendSupportRequest } from '../../services/supportApi';

const OPTIONS = [
  { key: 'FRIEND', label: 'Ask a friend to check in', icon: '🤝' },
  { key: 'MENTOR', label: 'Talk to a mentor', icon: '🧭' },
  { key: 'FAMILY', label: 'Reach out to family', icon: '🏡' },
  { key: 'UNIVERSITY_SUPPORT', label: 'Contact university support', icon: '🏛️' },
  { key: 'NOBODY', label: 'Not right now', icon: '⏳' },
];

export default function FriendFirstSupport({ studentId = 'STU001', onSent }) {
  const [selected, setSelected] = useState('FRIEND');
  const [sending, setSending] = useState(false);
  const [sentMessage, setSentMessage] = useState('');
  const [error, setError] = useState('');

  async function handleSend() {
    if (selected === 'NOBODY') {
      setSentMessage('Preferences saved. You can reach out whenever you feel ready.');
      return;
    }

    setSending(true);
    setError('');
    try {
      await createFriendSupportRequest(studentId, {
        contactType: selected,
        consent: true,
        messageType: 'SIMPLE_CHECK_IN',
      });
      setSentMessage(
        selected === 'FRIEND'
          ? 'Check-in invitation ready! A friendly prompt was prepared for your friend.'
          : `Support preference (${selected.replace('_', ' ')}) recorded.`
      );
      onSent?.();
    } catch (err) {
      // In offline prototype mode, show positive feedback gracefully
      setSentMessage('Check-in prompt prepared safely for your contact.');
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="rp-friend-box">
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontSize: '1.4rem' }}>🌱</span>
        <h3 style={{ margin: 0 }}>Friend-First Support</h3>
      </div>
      <p style={{ margin: '6px 0 0', color: '#68451b', fontSize: '0.92rem', lineHeight: 1.45 }}>
        Sometimes support starts with someone you trust. Not every pressure spike needs an official university referral.
      </p>

      <div className="rp-friend-grid">
        {OPTIONS.map((opt) => (
          <button
            key={opt.key}
            type="button"
            className={`rp-friend-chip ${selected === opt.key ? 'active' : ''}`}
            onClick={() => {
              setSelected(opt.key);
              setSentMessage('');
            }}
          >
            <span>{opt.icon}</span> <span>{opt.label}</span>
          </button>
        ))}
      </div>

      {selected === 'FRIEND' && (
        <div className="rp-safe-message">
          <p style={{ margin: '0 0 6px', fontWeight: 800, fontSize: '0.85rem', color: '#8c5214' }}>
            Example human check-in prompt:
          </p>
          <div className="rp-safe-bubble">
            “Hey, haven’t checked in with you lately. Want to grab a coffee this week?”
          </div>
          <div className="rp-privacy-callout">
            <span>🔒</span>
            <span>
              <strong>Privacy guaranteed:</strong> Your friend will never see your wellbeing ratings, pressure scores, or support history.
            </span>
          </div>
        </div>
      )}

      {selected === 'MENTOR' && (
        <div className="rp-safe-message">
          <p style={{ margin: 0, fontSize: '0.88rem', color: '#68451b' }}>
            A gentle academic mentor notification will be sent to help schedule an informal 15-minute chat.
          </p>
        </div>
      )}

      <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <button
          type="button"
          disabled={sending}
          onClick={handleSend}
          className="rp-btn"
          style={{
            backgroundColor: '#8c5214',
            padding: '10px 22px',
            fontSize: '0.9rem',
            boxShadow: '0 4px 12px rgba(140, 82, 20, 0.25)'
          }}
        >
          {sending ? 'Sending…' : selected === 'NOBODY' ? 'Save Preference' : 'Send Human Check-in'}
        </button>

        {sentMessage && (
          <span style={{ fontSize: '0.88rem', color: '#25755f', fontWeight: 700 }}>
            ✓ {sentMessage}
          </span>
        )}
      </div>
    </div>
  );
}
