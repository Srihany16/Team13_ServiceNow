const BASE = '/api';

async function request(path, options) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  const body = await res.json().catch(() => null);
  if (!res.ok || !body || body.success === false) {
    throw new Error(body?.error || `Request failed (${res.status})`);
  }
  return body.data;
}

export const getPressureForecast = (studentId = 'STU001') =>
  request(`/students/${studentId}/pressure`);

export const getAcademicData = (studentId = 'STU001') =>
  request(`/students/${studentId}/academic`);

// Deterministic fallback data used when the backend API is offline
export const PRESSURE_FALLBACK = {
  pressure: {
    studentId: 'STU001',
    forecast: 'HIGH',
    score: 82,
    week: '2026-W40',
    dailyForecast: [
      { day: 'MON', level: 'LOW' },
      { day: 'TUE', level: 'MEDIUM' },
      { day: 'WED', level: 'HIGH' },
      { day: 'THU', level: 'HIGH' },
      { day: 'FRI', level: 'HIGH' },
    ],
    factors: [
      '3 assignments due',
      '1 exam upcoming',
      'Attendance declining',
    ],
    recommendedActions: [
      'PLAN_WEEK',
      'ACADEMIC_SUPPORT',
      'PEER_SUPPORT',
    ],
  },
  academic: {
    studentId: 'STU001',
    term: 'Fall Term 2026',
    enrolledCredits: 16,
    attendanceRate: 78,
    attendanceTrend: 'DECLINING',
    assignmentsDue: [
      { id: 1, title: 'Data Structures Project 2', course: 'CS201', dueDate: 'Wed, Oct 7', weight: '15%' },
      { id: 2, title: 'Calculus Problem Set 6', course: 'MATH202', dueDate: 'Thu, Oct 8', weight: '10%' },
      { id: 3, title: 'Algorithms Peer Review', course: 'CS205', dueDate: 'Fri, Oct 9', weight: '5%' },
    ],
    upcomingExams: [
      { id: 1, subject: 'Computer Systems Midterm', course: 'CS210', date: 'Fri, Oct 9', location: 'Hall B' },
    ],
    workloadLevel: 'HIGH',
  },
};
