import React from 'react';

const OPTIONS = [
  { value: 'THRIVING', label: 'Thriving', icon: '🚀' },
  { value: 'GOOD', label: 'Good', icon: '🙂' },
  { value: 'MANAGING', label: 'Managing', icon: '😐' },
  { value: 'OVERLOADED', label: 'Overloaded', icon: '😵' },
  { value: 'NEED_SUPPORT', label: 'Need support', icon: '🫠' },
];

export default function MoodSelector({ value, onChange, disabled }) {
  return (
    <fieldset className="rp-choice" disabled={disabled}>
      <legend>How are you feeling about this week?</legend>
      <div className="rp-choice-grid">
        {OPTIONS.map((o) => (
          <button
            key={o.value}
            type="button"
            className={`rp-chip ${value === o.value ? 'is-selected' : ''}`}
            aria-pressed={value === o.value}
            onClick={() => onChange(o.value)}
          >
            <span aria-hidden="true">{o.icon}</span> {o.label}
          </button>
        ))}
      </div>
    </fieldset>
  );
}
