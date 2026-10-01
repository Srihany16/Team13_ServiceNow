import React, { useState, useEffect, useCallback } from 'react';
import AcademicSnapshot from '../components/academic/AcademicSnapshot';
import { WellbeingSection } from './WellbeingPage';
import SupportOptions from '../components/support/SupportOptions';
import StudentOnboardingCheckIn from '../components/wellbeing/StudentOnboardingCheckIn';
import LoadingState from '../components/common/LoadingState';
import ErrorState from '../components/common/ErrorState';
import { getPressureForecast, getAcademicData, PRESSURE_FALLBACK } from '../services/pressureApi';

export default function StudentDashboard({ studentId = 'STU001' }) {
  const [studentName, setStudentName] = useState('Prashant');
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
            {studentName}'s Student Dashboard
          </h1>
          <p style={{ margin: 0, color: '#3a8394', fontSize: '0.95rem', fontWeight: 600 }}>
            Welcome back, {studentName}. Track your weekly rhythm, academic signals, and support pathways.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span
            style={{
              fontSize: '0.82rem',
              fontWeight: 800,
              padding: '6px 16px',
              borderRadius: '999px',
              backgroundColor: '#d3eef1',
              color: '#17424b'
            }}
          >
            Student: {studentName} ({studentId})
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
      {state.loading && <LoadingState message={`Loading your dashboard, ${studentName}...`} />}

      {state.error && (
        <ErrorState message={state.error} onRetry={loadDashboard} />
      )}

      {!state.loading && (
        <>
          {/* STEP 1: Quick Wellbeing Pulse Check & Name Form */}
          <StudentOnboardingCheckIn
            initialName={studentName}
            onComplete={({ name }) => setStudentName(name)}
          />

          {/* STEP 2: Weekly Wellbeing Check-in & Ripple Matrix */}
          <div>
            <WellbeingSection studentId={studentId} />
          </div>

          {/* SECTION B: Academic Workload Overview */}
          <div style={{ marginTop: '36px' }}>
            <AcademicSnapshot data={state.academic} />
          </div>

          {/* SECTION C: MODULE 3 — Recommended Support & Friend-First Options */}
          <div style={{ marginTop: '36px' }}>
            <SupportOptions studentId={studentId} />
          </div>
        </>
      )}
    </div>
  );
}
