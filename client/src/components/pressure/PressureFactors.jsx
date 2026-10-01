import React from 'react';

export default function PressureFactors({ factors = [] }) {
  if (!factors || factors.length === 0) {
    return null;
  }

  return (
    <div className="rp-factors-card">
      <h3>Why this week is busy</h3>
      <ul className="rp-factors-list">
        {factors.map((factor, index) => (
          <li key={index}>
            <span className="rp-factors-dot" aria-hidden="true" />
            <span>{factor}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
