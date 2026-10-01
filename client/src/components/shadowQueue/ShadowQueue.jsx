import React, { useState, useEffect, useCallback } from 'react';
import ShadowQueueFlow from './ShadowQueueFlow';
import ShadowQueueCard from './ShadowQueueCard';
import StudentSupportProfile from '../support/StudentSupportProfile';
import LoadingState from '../common/LoadingState';
import { getShadowQueue, SUPPORT_FALLBACK } from '../../services/supportApi';

export default function ShadowQueue() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedStudentId, setSelectedStudentId] = useState(null);

  const loadQueue = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getShadowQueue();
      setData(res);
    } catch (e) {
      setData(SUPPORT_FALLBACK.shadowQueue);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadQueue();
  }, [loadQueue]);

  if (loading) {
    return <LoadingState message="Loading Shadow Queue telemetry…" />;
  }

  const students = data?.students || [];

  return (
    <div className="rp-shadow-wrap">
      <div style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '1.4rem' }}>🛡️</span>
          <h2 style={{ fontSize: '1.7rem', fontWeight: 900, color: '#17424b', margin: 0 }}>
            Shadow Queue
          </h2>
          <span
            style={{
              backgroundColor: '#fe7442',
              color: '#ffffff',
              padding: '2px 10px',
              borderRadius: '999px',
              fontSize: '0.8rem',
              fontWeight: 800
            }}
          >
            {students.length} Queued
          </span>
        </div>
        <p style={{ margin: '6px 0 0', color: '#55737a', fontSize: '0.98rem' }}>
          Students showing repeated support signals without a current support connection.
        </p>
      </div>

      {/* Visual Journey Flow */}
      <ShadowQueueFlow />

      {/* Selected Student Unified Profile */}
      {selectedStudentId && (
        <div style={{ marginBottom: '24px' }}>
          <StudentSupportProfile
            studentId={selectedStudentId}
            onClose={() => setSelectedStudentId(null)}
          />
        </div>
      )}

      {/* Student List */}
      <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#17424b', marginBottom: '14px' }}>
        Active Cases Awaiting Connection ({students.length})
      </h3>

      {students.length === 0 ? (
        <p style={{ color: '#25755f', fontWeight: 700 }}>
          ✓ No students currently stranded in the Shadow Queue. All students are connected.
        </p>
      ) : (
        students.map((st) => (
          <ShadowQueueCard
            key={st.studentId}
            student={st}
            onViewProfile={(id) => setSelectedStudentId(id)}
          />
        ))
      )}
    </div>
  );
}
