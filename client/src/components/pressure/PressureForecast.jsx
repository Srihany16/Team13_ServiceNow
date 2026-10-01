import React from 'react';
import PressureCalendar from './PressureCalendar';
import PressureFactors from './PressureFactors';
import ActionCard from './ActionCard';
import './pressure.css';

export default function PressureForecast({ data }) {
  if (!data) return null;

  const { forecast = 'HIGH', score = 82, dailyForecast = [], factors = [], recommendedActions = [] } = data;

  const tagline =
    forecast === 'HIGH'
      ? 'Your next 7 days look unusually demanding. We saw the pressure coming and highlighted options to stay ahead.'
      : forecast === 'MEDIUM'
      ? 'Your next 7 days have moderate activity. Balanced pacing will keep you on track.'
      : 'Your next 7 days appear calm and manageable.';

  return (
    <section className="rp-pressure-hero">
      <div className="rp-pressure-pill">Next 7 Days Forecast</div>

      <div className="rp-pressure-title">
        <h2>{forecast} PRESSURE</h2>
        <div className="rp-pressure-score">
          {score} <small>/ 100</small>
        </div>
      </div>

      <p className="rp-pressure-tagline">{tagline}</p>

      {/* Heatmap Calendar */}
      <PressureCalendar dailyForecast={dailyForecast} />

      {/* Explainable Factors */}
      <PressureFactors factors={factors} />

      {/* Recommended Action Options */}
      <ActionCard actions={recommendedActions} />
    </section>
  );
}
