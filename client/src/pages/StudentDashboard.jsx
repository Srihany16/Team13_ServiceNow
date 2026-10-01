import React, { useState, useEffect, useCallback } from 'react';
import PressureForecast from '../components/pressure/PressureForecast';
import AcademicSnapshot from '../components/academic/AcademicSnapshot';
import { WellbeingSection } from './WellbeingPage';
import SupportOptions from '../components/support/SupportOptions';
import LoadingState from '../components/common/LoadingState';
import ErrorState from '../components/common/ErrorState';
import { getPressureForecast, getAcademicData, PRESSURE_FALLBACK } from '../services/pressureApi';

export default function StudentDashboard({ studentId = 'STU001' }) {
  const [state, setState] = useState({
    loading: true,
    error: null,
    pressure: null,
    academic: null,
    offline: false
  });

  const loadDashboard = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    let isOffline = false;

    const safeFetch = async (fetcher, fallback) => {
      try {
        return await fetcher(studentId);
      } catch (err) {
        isOffline = true;
        return fallback;
      }
    };

    try {
      const [pressure, academic] = await Promise.all([
        safeFetch(getPressureForecast, PRESSURE_FALLBACK.pressure),
        safeFetch(getAcademicData, PRESSURE_FALLBACK.academic),
      ]);

      setState({
        loading: false,
        error: null,
        pressure,
        academic,
        offline: isOffline
      });
    } catch (err) {
      setState({
        loading: false,
        error: err.message || "We couldn't load your pressure forecast.",
        pressure: PRESSURE_FALLBACK.pressure,
        academic: PRESSURE_FALLBACK.academic,
        offline: true
      });
    }
  }, [studentId]);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  return (
    <div style={{ maxWidth: '1040px', margin: '0 auto', fontFamily: "'Nunito', system-ui, sans-serif" }}>
      {/* Product Philosophy Header */}
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          marginBottom: '20px',
          padding: '0 4px'
        }}
      >
        <div>
          <span
            style={{
              fontSize: '0.8rem',
              fontWeight: 800,
              color: '#1f5f6b',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              display: 'inline-block',
              marginBottom: '2px'
            }}
          >
            Predict → Connect → Support
          </span>
          <h1
            style={{
              fontSize: 'clamp(1.6rem, 4vw, 2.2rem)',
              fontWeight: 900,
              color: '#17424b',
              margin: '0 0 4px',
              letterSpacing: '-0.5px'
            }}
          >
            Student Workload & Pressure
          </h1>
          <p style={{ margin: 0, color: '#3a8394', fontSize: '0.95rem', fontWeight: 600 }}>
            RIPPLE doesn’t wait for the crisis. It sees the pressure coming first.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span
            style={{
              fontSize: '0.8rem',
              fontWeight: 700,
              padding: '6px 14px',
              borderRadius: '999px',
              backgroundColor: '#d3eef1',
              color: '#17424b'
            }}
          >
            Student: STU001
          </span>
          {state.offline && (
            <span
              style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                padding: '4px 10px',
                borderRadius: '999px',
                backgroundColor: '#fedbd8',
                color: '#a33b39'
              }}
              title="Using prototype fallback data"
            >
              Prototype Mode
            </span>
          )}
        </div>
      </header>

      {/* Loading & Error States */}
      {state.loading && <LoadingState message="Checking your upcoming week..." />}

      {state.error && (
        <ErrorState message={state.error} onRetry={loadDashboard} />
      )}

      {!state.loading && (
        <>
          {/* SECTION A: MODULE 1 HERO FEATURE — Pressure Forecast (Hero + Calendar + Factors + Actions) */}
          <PressureForecast data={state.pressure} />

          {/* SECTION B: Academic Workload Overview */}
          <AcademicSnapshot data={state.academic} />

          {/* SECTION C: MODULE 2 — Integrated Wellbeing Section */}
          <div style={{ marginTop: '36px' }}>
            <div style={{ marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '1.25rem' }}>🌊</span>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#17424b', margin: 0 }}>
                Weekly Wellbeing Check-in & History
              </h2>
            </div>
            <WellbeingSection studentId={studentId} />
          </div>

          {/* SECTION D: MODULE 3 — Recommended Support & Friend-First Options */}
          <div style={{ marginTop: '36px' }}>
            <SupportOptions studentId={studentId} />
          </div>
        </>
      )}
    </div>
  );
}
