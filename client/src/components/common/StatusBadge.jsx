import React from 'react';

// Shared LOW / MEDIUM / HIGH visual mapping. Reuse everywhere in RIPPLE.
export const LEVEL_META = {
  LOW: { cls: 'lvl-low', emoji: '🟢' },
  MEDIUM: { cls: 'lvl-medium', emoji: '🟡' },
  HIGH: { cls: 'lvl-high', emoji: '🔴' },
};

export default function StatusBadge({ level, children }) {
  const meta = LEVEL_META[level];
  return (
    <span className={`rp-badge ${meta ? meta.cls : 'lvl-none'}`}>
      <span aria-hidden="true">{meta ? meta.emoji : '•'}</span>
      {children}
    </span>
  );
}
