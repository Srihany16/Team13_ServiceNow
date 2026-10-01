import React, { useState, useEffect, useCallback } from 'react';
import StatusBadge from '../common/StatusBadge';
import LoadingState from '../common/LoadingState';
import SupportAction from './SupportAction';
import { getStudentProfile, SUPPORT_FALLBACK } from '../../services/supportApi';

export default function StudentSupportProfile({ studentId = 'STU001', onClose }) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadProfile = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getStudentProfile(studentId);
      setProfile(res);
    } catch (e) {
      setProfile(SUPPORT_FALLBACK.profile);
    } finally {
      setLoading(false);
    }
  }, [studentId]);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  if (loading) {
    return <LoadingState message="Loading unified student profile…" />;
  }

  if (!profile) return null;

  const { pressure, wellbeing, domains, support, shadowQueue } = profile;

  return (
    <div className="rp-profile-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
        <div>
          <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#3a8394', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Unified Student Profile
          </span>
          <h3 style={{ margin: '4px 0', fontSize: '1.4rem', fontWeight: 900, color: '#17424b' }}>
            Student {studentId}
          </h3>
          <p style={{ margin: 0, fontSize: '0.88rem', color: '#55737a' }}>
            Centralized support context — prevents students from having to re-explain their situation.
          </p>
        </div>

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            style={{
              background: '#eaf7f8',
              border: 'none',
              borderRadius: '999px',
              padding: '6px 14px',
              fontSize: '0.85rem',
              fontWeight: 700,
              cursor: 'pointer',
              color: '#17424b'
            }}
          >
            ✕ Close Profile
          </button>
        )}
      </div>

      {/* Profile Metrics Grid */}
      <div className="rp-profile-metrics">
        {/* Pressure */}
        <div className="rp-metric-box">
          <div style={{ fontSize: '0.78rem', color: '#68868c', fontWeight: 700, textTransform: 'uppercase' }}>
            Workload Pressure
          </div>
          <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#d8605e', marginTop: '4px' }}>
            {pressure.forecast} · {pressure.score} <small style={{ fontSize: '0.8rem', color: '#68868c' }}>/ 100</small>
          </div>
        </div>

        {/* Wellbeing */}
        <div className="rp-metric-box">
          <div style={{ fontSize: '0.78rem', color: '#68868c', fontWeight: 700, textTransform: 'uppercase' }}>
            Wellbeing Level
          </div>
          <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#8a6417', marginTop: '4px' }}>
            {wellbeing.overallLevel} · {wellbeing.trend}
          </div>
        </div>

        {/* Primary Domain */}
        <div className="rp-metric-box">
          <div style={{ fontSize: '0.78rem', color: '#68868c', fontWeight: 700, textTransform: 'uppercase' }}>
            Primary Domain
          </div>
          <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#1f5f6b', marginTop: '4px' }}>
            {domains.primary}
          </div>
        </div>

        {/* Secondary Domain */}
        <div className="rp-metric-box">
          <div style={{ fontSize: '0.78rem', color: '#68868c', fontWeight: 700, textTransform: 'uppercase' }}>
            Secondary Domain
          </div>
          <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#3a8394', marginTop: '4px' }}>
            {domains.secondary}
          </div>
        </div>

        {/* Support Status */}
        <div className="rp-metric-box">
          <div style={{ fontSize: '0.78rem', color: '#68868c', fontWeight: 700, textTransform: 'uppercase' }}>
            Support Status
          </div>
          <div style={{ fontSize: '1.05rem', fontWeight: 800, color: support.status === 'CONNECTED' ? '#25755f' : '#d8605e', marginTop: '4px' }}>
            {support.status.replace(/_/g, ' ')}
          </div>
        </div>

        {/* Shadow Queue Status */}
        <div className="rp-metric-box">
          <div style={{ fontSize: '0.78rem', color: '#68868c', fontWeight: 700, textTransform: 'uppercase' }}>
            Shadow Queue Status
          </div>
          <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#8c5214', marginTop: '4px' }}>
            {shadowQueue.status.replace(/_/g, ' ')} · {shadowQueue.severity}
          </div>
        </div>
      </div>

      {/* Staff Actions */}
      <SupportAction
        studentId={studentId}
        supportId={support.recommendedService || 'SUP001'}
        onActionCompleted={loadProfile}
      />
    </div>
  );
}
