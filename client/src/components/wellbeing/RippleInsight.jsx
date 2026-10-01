import React from 'react';

const title = (s) => s.charAt(0) + s.slice(1).toLowerCase();

export default function RippleInsight({ data }) {
  if (!data) return null;
  if (!data.rippleDetected) {
    return (
      <section className="rp-card rp-insight is-calm">
        <h2>Ripple insight</h2>
        <p>No major changes detected in your recent check-ins.</p>
      </section>
    );
  }
  return (
    <section className="rp-card rp-insight">
      <h2>Ripple insight</h2>
      <p className="rp-lead">Your recent weeks show a meaningful change.</p>
      <dl className="rp-facts">
        <div>
          <dt>Areas changing</dt>
          <dd>{(data.changedDomains || []).map((d) => <span key={d} className="rp-tag">{title(d)}</span>)}</dd>
        </div>
        <div><dt>Trend</dt><dd>{data.trend}</dd></div>
        <div><dt>Suggested next step</dt><dd>{data.recommendedAction}</dd></div>
      </dl>
    </section>
  );
}
