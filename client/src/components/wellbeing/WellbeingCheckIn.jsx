import React, { useState } from 'react';
import EnergyDomainSelector from './EnergyDomainSelector';
import MoodSelector from './MoodSelector';
import { submitCheckIn, currentIsoWeek } from '../../services/wellbeingApi';

export default function WellbeingCheckIn({ studentId = 'STU001', onSubmitted }) {
  const [energyDomain, setEnergyDomain] = useState(null);
  const [mood, setMood] = useState(null);
  const [status, setStatus] = useState('idle'); // idle | submitting | done | error

  const ready = energyDomain && mood && status !== 'submitting';

  async function handleSubmit() {
    setStatus('submitting');
    try {
      await submitCheckIn(studentId, { week: currentIsoWeek(), mood, energyDomain });
      setStatus('done');
      onSubmitted?.();
    } catch (e) {
      setStatus('error');
    }
  }

  if (status === 'done') {
    return (
      <section className="rp-card rp-confirm" aria-live="polite">
        <div className="rp-ripple-dot" aria-hidden="true" />
        <h2>Thanks for checking in.</h2>
        <p>Your weekly ripple has been updated.</p>
        <button
          className="rp-btn rp-btn-ghost"
          onClick={() => { setStatus('idle'); setMood(null); setEnergyDomain(null); }}
        >
          Change my answers
        </button>
      </section>
    );
  }

  return (
    <section className="rp-card">
      <h2>Weekly check-in</h2>
      <p className="rp-sub">Two quick taps. About 10 seconds.</p>
      <EnergyDomainSelector value={energyDomain} onChange={setEnergyDomain} disabled={status === 'submitting'} />
      <MoodSelector value={mood} onChange={setMood} disabled={status === 'submitting'} />
      {status === 'error' && (
        <p className="rp-error" role="alert">We couldn’t save your check-in. Check your connection and try again.</p>
      )}
      <button className="rp-btn" disabled={!ready} onClick={handleSubmit}>
        {status === 'submitting' ? 'Saving…' : 'Update my ripple'}
      </button>
    </section>
  );
}
