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

export const getWellbeing = (studentId) => request(`/students/${studentId}/wellbeing`);
export const getSocialSignal = (studentId) => request(`/students/${studentId}/social`);
export const getRipple = (studentId) => request(`/students/${studentId}/ripple`);
export const submitCheckIn = (studentId, payload) =>
  request(`/students/${studentId}/wellbeing/check-in`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });

// ISO week string like "2026-W40"
export function currentIsoWeek(date = new Date()) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const day = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - day);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const week = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
  return `${d.getUTCFullYear()}-W${String(week).padStart(2, '0')}`;
}

// Used ONLY when the backend is unreachable.
export const FALLBACK = {
  wellbeing: {
    studentId: 'STU001',
    currentWeek: '2026-W40',
    overallLevel: 'MEDIUM',
    domains: { ACADEMIC: 'HIGH', EMOTIONAL: 'MEDIUM', SOCIAL: 'LOW', FINANCIAL: 'LOW', PERSONAL: 'MEDIUM' },
    weeklyTrend: [
      { week: '2026-W37', academic: 'LOW', emotional: 'LOW', social: 'LOW' },
      { week: '2026-W38', academic: 'LOW', emotional: 'LOW', social: 'MEDIUM' },
      { week: '2026-W39', academic: 'MEDIUM', emotional: 'MEDIUM', social: 'MEDIUM' },
    ],
  },
  ripple: {
    studentId: 'STU001', rippleDetected: true, severity: 'MEDIUM', trend: 'DECLINING',
    changedDomains: ['ACADEMIC', 'SOCIAL'],
    message: 'A meaningful change has been detected in recent weeks.',
    recommendedAction: 'OFFER_SUPPORT',
  },
  social: {
    studentId: 'STU001', currentConnections: 2, previousAverageConnections: 6,
    changePercentage: -67, signal: 'SIGNIFICANT_CHANGE', trend: 'DECLINING',
  },
};
