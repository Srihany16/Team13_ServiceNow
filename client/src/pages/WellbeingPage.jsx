import React, { useCallback, useEffect, useState } from 'react';
import WellbeingCheckIn from '../components/wellbeing/WellbeingCheckIn';
import RippleMatrix from '../components/wellbeing/RippleMatrix';
import RippleInsight from '../components/wellbeing/RippleInsight';
import SocialSignalCard from '../components/wellbeing/SocialSignalCard';
import { getWellbeing, getRipple, getSocialSignal, FALLBACK } from '../services/wellbeingApi';
import '../components/wellbeing/wellbeing.css';

// Drop <WellbeingSection /> into the shared student dashboard; WellbeingPage wraps it as a page.
export function WellbeingSection({ studentId = 'STU001' }) {
  const [state, setState] = useState({ loading: true, offline: false, wellbeing: null, ripple: null, social: null });

  const load = useCallback(async () => {
    let offline = false;
    const safe = (p, fb) => p.catch(() => { offline = true; return fb; });
    const [wellbeing, ripple, social] = await Promise.all([
      safe(getWellbeing(studentId), FALLBACK.wellbeing),
      safe(getRipple(studentId), FALLBACK.ripple),
      safe(getSocialSignal(studentId), FALLBACK.social),
    ]);
    setState({ loading: false, offline, wellbeing, ripple, social });
  }, [studentId]);

  useEffect(() => { load(); }, [load]);

  return (
    <div className="rp-wellbeing">
      <header className="rp-hero">
        <div>
          <h1>Weekly Wellbeing</h1>
          <p>Small changes over time create a ripple. A quick check-in helps you see yours.</p>
        </div>
        <svg className="rp-rings" viewBox="0 0 120 120" aria-hidden="true">
          <circle cx="60" cy="60" r="12" /><circle cx="60" cy="60" r="28" />
          <circle cx="60" cy="60" r="44" /><circle cx="60" cy="60" r="58" />
        </svg>
      </header>

      {state.offline && <p className="rp-note">Showing sample data while we reconnect.</p>}

      <WellbeingCheckIn studentId={studentId} onSubmitted={load} />

      {state.loading ? (
        <p className="rp-loading" role="status">Loading your ripple…</p>
      ) : (
        <div className="rp-grid">
          <RippleMatrix data={state.wellbeing} />
          <RippleInsight data={state.ripple} />
          <SocialSignalCard data={state.social} />
        </div>
      )}
    </div>
  );
}

export default function WellbeingPage() {
  return <WellbeingSection studentId="STU001" />;
}
