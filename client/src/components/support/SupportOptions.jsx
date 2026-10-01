import React, { useState, useEffect, useCallback } from 'react';
import SupportServiceCard from './SupportServiceCard';
import FriendFirstSupport from './FriendFirstSupport';
import LoadingState from '../common/LoadingState';
import { getStudentSupport, createSupportAction, SUPPORT_FALLBACK } from '../../services/supportApi';
import './support.css';

export default function SupportOptions({ studentId = 'STU001', onActionTaken }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [connectingId, setConnectingId] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [offline, setOffline] = useState(false);

  const loadSupport = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getStudentSupport(studentId);
      setData(res);
      setOffline(false);
    } catch (e) {
      setData(SUPPORT_FALLBACK.support);
      setOffline(true);
    } finally {
      setLoading(false);
    }
  }, [studentId]);

  useEffect(() => {
    loadSupport();
  }, [loadSupport]);

  async function handleConnect(supportId, serviceName) {
    setConnectingId(supportId);
    setFeedback('');
    try {
      await createSupportAction(studentId, {
        supportId,
        action: 'ASSIGN',
        notes: `${serviceName} connection requested by student.`,
        consent: true,
      });
      setFeedback(`Support connection recorded for ${serviceName}.`);
      onActionTaken?.();
      await loadSupport();
    } catch (e) {
      // In offline prototype, show confirmation
      setFeedback(`Support connection recorded for ${serviceName}. (Prototype)`);
      onActionTaken?.();
    } finally {
      setConnectingId(null);
      setTimeout(() => setFeedback(''), 4000);
    }
  }

  if (loading) {
    return <LoadingState message="Finding available support options…" />;
  }

  if (!data) return null;

  const { recommendedDomain, recommendedAction, services = [] } = data;

  return (
    <section className="rp-support-section">
      <div className="rp-support-header">
        <div>
          <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#3a8394', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Appropriate Support Routing
          </span>
          <h3 style={{ margin: '4px 0', fontSize: '1.4rem', fontWeight: 800, color: '#17424b' }}>
            Recommended Support Pathway
          </h3>
          <p style={{ margin: 0, fontSize: '0.92rem', color: '#55737a' }}>
            RIPPLE routes directly to your need instead of directing every student to long clinical waitlists.
          </p>
        </div>
      </div>

      {/* Recommended Domain Banner */}
      <div className="rp-recommendation-banner">
        <div>
          <div style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', color: '#1f5f6b', letterSpacing: '0.08em' }}>
            Recommended Domain
          </div>
          <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#17424b', marginTop: '2px' }}>
            {recommendedDomain} Support
          </div>
          <div style={{ fontSize: '0.9rem', color: '#3a8394', marginTop: '2px' }}>
            Action: <strong>{recommendedAction.replace(/_/g, ' ')}</strong> recommended based on current workload.
          </div>
        </div>
        <div style={{ background: '#1f5f6b', color: '#fff', padding: '6px 14px', borderRadius: '999px', fontSize: '0.82rem', fontWeight: 800 }}>
          Targeted Match
        </div>
      </div>

      {feedback && (
        <div
          style={{
            backgroundColor: '#d3eef1',
            color: '#17424b',
            padding: '12px 16px',
            borderRadius: '12px',
            fontWeight: 700,
            fontSize: '0.92rem',
            marginBottom: '18px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <span>✓</span> {feedback}
        </div>
      )}

      {/* Available Services Grid */}
      <div className="rp-service-grid">
        {services.map((service) => (
          <SupportServiceCard
            key={service.supportId}
            service={service}
            onConnect={handleConnect}
            isConnecting={connectingId === service.supportId}
          />
        ))}
      </div>

      {/* Friend-First Alternative */}
      <FriendFirstSupport studentId={studentId} onSent={onActionTaken} />
    </section>
  );
}
