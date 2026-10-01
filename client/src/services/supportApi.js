const BASE = '/api';

async function request(path, options = {}) {
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

export const getShadowQueue = () => request('/shadow-queue');

export const getStudentSupport = (studentId = 'STU001') =>
  request(`/students/${studentId}/support`);

export const getStudentProfile = (studentId = 'STU001') =>
  request(`/students/${studentId}/profile`);

export const createSupportAction = (studentId = 'STU001', payload) =>
  request(`/students/${studentId}/support/action`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });

export const createFriendSupportRequest = (studentId = 'STU001', payload) =>
  request(`/students/${studentId}/friend-support`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });

// Deterministic fallback data matching prompt specifications for offline/prototype execution
export const SUPPORT_FALLBACK = {
  support: {
    studentId: 'STU001',
    recommendedDomain: 'ACADEMIC',
    recommendedAction: 'ACADEMIC_CHECK_IN',
    services: [
      {
        supportId: 'SUP003',
        name: 'Peer Support',
        domain: 'PEER',
        availability: 'TODAY',
        waitMinutes: 15,
        status: 'AVAILABLE',
        description: 'Trained student listener who understands your coursework load.'
      },
      {
        supportId: 'SUP001',
        name: 'Academic Advisor',
        domain: 'ACADEMIC',
        availability: 'TODAY',
        waitMinutes: 30,
        status: 'AVAILABLE',
        description: 'Faculty advisor for workload planning and deadline pacing.'
      },
      {
        supportId: 'SUP002',
        name: 'Counselling',
        domain: 'EMOTIONAL',
        availability: '3_DAYS',
        waitMinutes: 4320,
        status: 'AVAILABLE',
        description: 'Campus wellbeing specialist for deeper personal guidance.'
      },
    ],
  },
  shadowQueue: {
    total: 1,
    students: [
      {
        studentId: 'STU001',
        status: 'SHADOW_QUEUE',
        severity: 'MEDIUM',
        reason: [
          'Repeated declining trend',
          'Support recommendation not accepted',
        ],
        recommendedDomain: 'ACADEMIC',
        recommendedAction: 'ACADEMIC_CHECK_IN',
        daysWithoutConnection: 18,
      },
    ],
  },
  profile: {
    studentId: 'STU001',
    pressure: {
      forecast: 'HIGH',
      score: 82,
    },
    wellbeing: {
      overallLevel: 'MEDIUM',
      trend: 'DECLINING',
    },
    domains: {
      primary: 'ACADEMIC',
      secondary: 'SOCIAL',
    },
    support: {
      status: 'NOT_CONNECTED',
      currentServices: [],
      recommendedService: 'SUP001',
    },
    shadowQueue: {
      status: 'SHADOW_QUEUE',
      severity: 'MEDIUM',
    },
  },
};
