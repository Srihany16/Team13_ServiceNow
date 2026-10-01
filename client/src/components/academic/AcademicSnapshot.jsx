import React from 'react';
import StatusBadge from '../common/StatusBadge';

export default function AcademicSnapshot({ data }) {
  if (!data) return null;

  const {
    term = 'Current Term',
    enrolledCredits,
    attendanceRate,
    attendanceTrend,
    assignmentsDue = [],
    upcomingExams = [],
    workloadLevel
  } = data;

  return (
    <section className="rp-academic-card">
      <div className="rp-academic-header">
        <div>
          <h3>Academic Snapshot</h3>
          <span style={{ fontSize: '0.85rem', color: '#68868c' }}>{term}</span>
        </div>
        {workloadLevel && (
          <StatusBadge level={workloadLevel}>
            Workload: {workloadLevel}
          </StatusBadge>
        )}
      </div>

      <div className="rp-academic-grid">
        {/* Assignments Due */}
        <div className="rp-academic-block">
          <h4>
            <span>📝</span> Upcoming Assignments ({assignmentsDue.length})
          </h4>
          {assignmentsDue.length === 0 ? (
            <p style={{ margin: 0, fontSize: '0.9rem', color: '#68868c' }}>No assignments due this week.</p>
          ) : (
            assignmentsDue.map((item, idx) => (
              <div key={item.id || idx} className="rp-assignment-item">
                <div>
                  <div className="rp-assignment-title">{item.title}</div>
                  <div style={{ fontSize: '0.75rem', color: '#3a8394' }}>{item.course} {item.weight ? `• ${item.weight}` : ''}</div>
                </div>
                <div className="rp-assignment-due">{item.dueDate}</div>
              </div>
            ))
          )}
        </div>

        {/* Exams & Attendance */}
        <div className="rp-academic-block">
          <h4>
            <span>🎯</span> Exams & Milestones
          </h4>
          {upcomingExams.length === 0 ? (
            <p style={{ margin: 0, fontSize: '0.9rem', color: '#68868c' }}>No exams scheduled for next 7 days.</p>
          ) : (
            upcomingExams.map((exam, idx) => (
              <div key={exam.id || idx} className="rp-assignment-item">
                <div>
                  <div className="rp-assignment-title">{exam.subject}</div>
                  <div style={{ fontSize: '0.75rem', color: '#3a8394' }}>{exam.course} {exam.location ? `• ${exam.location}` : ''}</div>
                </div>
                <div className="rp-assignment-due">{exam.date}</div>
              </div>
            ))
          )}

          {/* Attendance metric */}
          {attendanceRate !== undefined && (
            <div
              style={{
                marginTop: '16px',
                paddingTop: '12px',
                borderTop: '1px solid #e3f2f5',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <div>
                <span style={{ fontSize: '0.85rem', color: '#3a8394', fontWeight: 700 }}>
                  Course Attendance:
                </span>{' '}
                <strong style={{ color: '#17424b' }}>{attendanceRate}%</strong>
              </div>
              {attendanceTrend && (
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    padding: '2px 8px',
                    borderRadius: '999px',
                    backgroundColor: attendanceTrend === 'DECLINING' ? '#fedbd8' : '#d3eef1',
                    color: attendanceTrend === 'DECLINING' ? '#a33b39' : '#1f5f6b'
                  }}
                >
                  Trend: {attendanceTrend}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
