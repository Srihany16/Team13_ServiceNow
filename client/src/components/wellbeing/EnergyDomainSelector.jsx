import React from 'react';

const OPTIONS = [
  { value: 'ACADEMIC', label: 'Academic', icon: '📚' },
  { value: 'EMOTIONAL', label: 'Emotional', icon: '💭' },
  { value: 'SOCIAL', label: 'Social', icon: '👥' },
  { value: 'FINANCIAL', label: 'Financial', icon: '💰' },
  { value: 'PERSONAL', label: 'Personal', icon: '🏠' },
  { value: 'NONE', label: 'Nothing major', icon: '😊' },
];

export default function EnergyDomainSelector({ value, onChange, disabled }) {
  return (
    <fieldset className="rp-choice" disabled={disabled}>
      <legend>What’s taking most of your energy this week?</legend>
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
