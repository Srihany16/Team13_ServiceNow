/**
 * Module 2 — socialService
 * Synthetic social-connection signal. A signal, NOT a diagnosis.
 */

const { socialData } = require("../data/socialData");
const { getStudent } = require("./wellbeingService");

const MODERATE_THRESHOLD = 20; // % change
const SIGNIFICANT_THRESHOLD = 50; // % change

/**
 * calculateSocialSignal(weeklyConnections)
 *
 * Input:  array of weekly connection counts, oldest first (needs ≥ 2 values).
 * Output: { currentConnections, previousAverageConnections, changePercentage, signal, trend }
 *         or null if there isn't enough data.
 *
 * RULE:
 *   current  = last week's count
 *   previous = average of all earlier weeks (rounded to 2 dp for display)
 *   changePercentage = round((current − previous) / previous × 100)
 *
 *   signal (by size of change, either direction):
 *     |change| < 20%  → NO_CHANGE
 *     |change| < 50%  → MODERATE_CHANGE
 *     |change| ≥ 50%  → SIGNIFICANT_CHANGE
 *
 *   trend (by direction):
 *     change ≤ −20%   → DECLINING
 *     change ≥ +20%   → IMPROVING
 *     otherwise       → STABLE
 */
function calculateSocialSignal(weeklyConnections) {
  if (!Array.isArray(weeklyConnections) || weeklyConnections.length < 2) return null;

  const current = weeklyConnections[weeklyConnections.length - 1];
  const earlier = weeklyConnections.slice(0, -1);
  const previous = earlier.reduce((s, n) => s + n, 0) / earlier.length;

  // Avoid divide-by-zero: if there were no previous connections, treat any new ones as +100%.
  const changePercentage =
    previous === 0 ? (current > 0 ? 100 : 0) : Math.round(((current - previous) / previous) * 100);

  const size = Math.abs(changePercentage);
  let signal = "NO_CHANGE";
  if (size >= SIGNIFICANT_THRESHOLD) signal = "SIGNIFICANT_CHANGE";
  else if (size >= MODERATE_THRESHOLD) signal = "MODERATE_CHANGE";

  let trend = "STABLE";
  if (changePercentage <= -MODERATE_THRESHOLD) trend = "DECLINING";
  else if (changePercentage >= MODERATE_THRESHOLD) trend = "IMPROVING";

  return {
    currentConnections: current,
    previousAverageConnections: Math.round(previous * 100) / 100,
    changePercentage,
    signal,
    trend,
  };
}

/** Social signal for one student, or null if the student has no social data. */
function getSocialSignal(studentId) {
  getStudent(studentId); // throws "Student not found"
  const record = socialData[studentId];
  if (!record) return null;
  const result = calculateSocialSignal(record.weeklyConnections);
  return result ? { studentId, ...result } : null;
}

module.exports = { calculateSocialSignal, getSocialSignal };
