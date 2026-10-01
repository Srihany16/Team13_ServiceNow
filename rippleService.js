/**
 * Module 2 — rippleService
 * Detects meaningful CHANGES over time by combining available signals.
 * This is a pattern-change detector. It does NOT diagnose anyone.
 *
 * Does NOT implement Pressure Forecast (Module 1), Shadow Queue, Support Routing,
 * or Friend-First Escalation.
 */

const {
  DOMAINS,
  getStudent,
  calculateWellbeingTrend,
  getDomainHistory,
  getOverallHistory,
} = require("./wellbeingService");
const { getSocialSignal } = require("./socialService");

/**
 * Domain change rule:
 *   A domain counts as "changed" when its own trend is DECLINING
 *   AND its most recent level is HIGH.
 *   (A drift from LOW to MEDIUM alone is not treated as meaningful.)
 */
function getChangedDomains(studentId) {
  const history = getDomainHistory(studentId);
  return DOMAINS.filter((d) => {
    const levels = history[d];
    return calculateWellbeingTrend(levels) === "DECLINING" && levels[levels.length - 1] === "HIGH";
  });
}

/**
 * Attendance trend (OPTIONAL signal).
 * Returns null when the student has no attendance data — no assumptions are made.
 * Rule: avg of recent half vs earlier half; drop ≥ 5 points → DECLINING,
 *       rise ≥ 5 points → IMPROVING, else STABLE.
 */
function getAttendanceTrend(studentId) {
  const { attendance } = getStudent(studentId);
  if (!Array.isArray(attendance) || attendance.length < 2) return null;

  const mid = Math.ceil(attendance.length / 2);
  const avg = (a) => a.reduce((s, n) => s + n, 0) / a.length;
  const delta = avg(attendance.slice(mid)) - avg(attendance.slice(0, mid));

  if (delta <= -5) return "DECLINING";
  if (delta >= 5) return "IMPROVING";
  return "STABLE";
}

/**
 * Severity rule (points system — easy to explain in a demo):
 *
 *   +1  overall wellbeing trend is DECLINING
 *   +1  for EACH changed domain
 *   +1  social signal trend is DECLINING        (only if social data exists)
 *   +1  attendance trend is DECLINING           (only if attendance data exists)
 *   +1  pressure signal is HIGH                 (only if a Module 1 signal is passed in)
 *
 *   score 0–1  → no ripple                → NO_ACTION
 *   score 2–3  → ripple, severity LOW     → CHECK_IN
 *   score 4–5  → ripple, severity MEDIUM  → OFFER_SUPPORT
 *   score 6+   → ripple, severity HIGH    → URGENT_SUPPORT
 */
function scoreToSeverity(score) {
  if (score >= 6) return { rippleDetected: true, severity: "HIGH", recommendedAction: "URGENT_SUPPORT" };
  if (score >= 4) return { rippleDetected: true, severity: "MEDIUM", recommendedAction: "OFFER_SUPPORT" };
  if (score >= 2) return { rippleDetected: true, severity: "LOW", recommendedAction: "CHECK_IN" };
  return { rippleDetected: false, severity: null, recommendedAction: "NO_ACTION" };
}

/**
 * detectRipple(studentId, options)
 *
 * options.pressureLevel (optional): "LOW" | "MEDIUM" | "HIGH" from Module 1.
 *   Module 2 never calculates pressure itself; it only uses the level if given.
 */
function detectRipple(studentId, options = {}) {
  getStudent(studentId); // throws "Student not found"

  const trend = calculateWellbeingTrend(getOverallHistory(studentId));
  const changedDomains = getChangedDomains(studentId);
  const social = getSocialSignal(studentId); // null if no data
  const attendanceTrend = getAttendanceTrend(studentId); // null if no data

  let score = 0;
  if (trend === "DECLINING") score += 1;
  score += changedDomains.length;
  if (social && social.trend === "DECLINING") score += 1;
  if (attendanceTrend === "DECLINING") score += 1;
  if (options.pressureLevel === "HIGH") score += 1;

  const result = scoreToSeverity(score);

  return {
    studentId,
    rippleDetected: result.rippleDetected,
    severity: result.severity,
    trend,
    changedDomains,
    message: result.rippleDetected
      ? "A meaningful change has been detected in recent weeks."
      : "No meaningful change detected in recent weeks.",
    recommendedAction: result.recommendedAction,
  };
}

module.exports = { detectRipple, getChangedDomains, getAttendanceTrend, scoreToSeverity };
