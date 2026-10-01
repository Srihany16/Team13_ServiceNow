import React from 'react';

export default function ShadowQueueFlow() {
  return (
    <div className="rp-flow-diagram">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
        <div>
          <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#78d6d5', fontWeight: 800 }}>
            The RIPPLE Safety Net Innovation
          </span>
          <h3 style={{ margin: '4px 0', fontSize: '1.25rem', fontWeight: 800 }}>
            How the Shadow Queue Protects Students
          </h3>
        </div>
        <div style={{ fontSize: '0.85rem', color: '#d3eef1', fontStyle: 'italic' }}>
          “Catching the students who fall through the gaps”
        </div>
      </div>

      <div className="rp-flow-steps">
        <div className="rp-flow-step">
          <div>1. Pressure ↑</div>
          <div style={{ fontSize: '0.75rem', opacity: 0.8, fontWeight: 400 }}>High workload forecast</div>
        </div>
        <span className="rp-flow-arrow" aria-hidden="true">→</span>

        <div className="rp-flow-step">
          <div>2. Wellbeing Change</div>
          <div style={{ fontSize: '0.75rem', opacity: 0.8, fontWeight: 400 }}>Pulse rating dips</div>
        </div>
        <span className="rp-flow-arrow" aria-hidden="true">→</span>

        <div className="rp-flow-step">
          <div>3. Support Offered</div>
          <div style={{ fontSize: '0.75rem', opacity: 0.8, fontWeight: 400 }}>Academic check-in sent</div>
        </div>
        <span className="rp-flow-arrow" aria-hidden="true">→</span>

        <div className="rp-flow-step">
          <div>4. No Connection</div>
          <div style={{ fontSize: '0.75rem', opacity: 0.8, fontWeight: 400 }}>Student didn't book</div>
        </div>
        <span className="rp-flow-arrow" aria-hidden="true">→</span>

        <div className="rp-flow-step highlight">
          <div>5. SHADOW QUEUE</div>
          <div style={{ fontSize: '0.75rem', opacity: 0.9, fontWeight: 600 }}>Signal flagged for staff</div>
        </div>
        <span className="rp-flow-arrow" aria-hidden="true">→</span>

        <div className="rp-flow-step">
          <div>6. Early Outreach</div>
          <div style={{ fontSize: '0.75rem', opacity: 0.8, fontWeight: 400 }}>Peer / gentle nudge</div>
        </div>
      </div>
    </div>
  );
}
