import React from 'react';

export default function SocialSignalCard({ data }) {
  if (!data) return null;
  const changed = data.signal === 'SIGNIFICANT_CHANGE';
  const pct = data.changePercentage;
  return (
    <section className="rp-card">
      <h2>{changed ? 'Social connection has changed' : 'Social connection looks steady'}</h2>
      <p className="rp-big">{data.currentConnections} <small>current connections</small></p>
      <dl className="rp-facts">
        <div><dt>Previous average</dt><dd>{data.previousAverageConnections}</dd></div>
        <div><dt>Change</dt><dd>{pct > 0 ? `+${pct}` : pct}%</dd></div>
        <div><dt>Trend</dt><dd>{data.trend}</dd></div>
      </dl>
      <p className="rp-privacy">
        🔒 RIPPLE only uses consented or aggregated interaction signals. It does not read private messages,
        track private social media, or track your location.
      </p>
    </section>
  );
}
