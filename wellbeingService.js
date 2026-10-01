/**
 * Module 2 — wellbeingService
 * Retrieves wellbeing data, records check-ins, calculates trends, builds the matrix.
 */

const { students, checkIns } = require("../data/wellbeingData");

const DOMAINS = ["ACADEMIC", "EMOTIONAL", "SOCIAL", "FINANCIAL", "PERSONAL"];
const MOODS = ["THRIVING", "GOOD", "MANAGING", "OVERLOADED", "NEED_SUPPORT"];
const ENERGY_DOMAINS = [...DOMAINS, "NONE"];
const WEEK_REGEX = /^\d{4}-W(0[1-9]|[1-4]\d|5[0-3])$/; // YYYY-Www, weeks 01–53

const LEVEL_SCORE = { LOW: 1, MEDIUM: 2, HIGH: 3 };

// Threshold used by calculateWellbeingTrend (half a level).
const TREND_THRESHOLD = 0.5;

/** Small error type so the controller can map errors to HTTP status codes. */
class AppError extends Error {
  constructor(message, status = 400) {
    super(message);
    this.status = status;
  }
}

// ---------- helpers ----------

/** LOW/MEDIUM/HIGH → 1/2/3. Numbers pass through unchanged. */
function toScore(value) {
  return typeof value === "number" ? value : LEVEL_SCORE[value];
}

/** 1..3 average → LOW/MEDIUM/HIGH (splits the 1–3 range into equal thirds). */
function scoreToLevel(score) {
  if (score < 5 / 3) return "LOW"; // < 1.67
  if (score < 7 / 3) return "MEDIUM"; // < 2.33
  return "HIGH";
}

const average = (nums) => nums.reduce((sum, n) => sum + n, 0) / nums.length;

/** Average strain score of one week across all 5 domains. */
function weekOverallScore(weekEntry) {
  return average(DOMAINS.map((d) => toScore(weekEntry.domains[d])));
}

function getStudent(studentId) {
  const student = students[studentId];
  if (!student) throw new AppError("Student not found", 404);
  return student;
}

// ---------- core ----------

/**
 * calculateWellbeingTrend(series)
 *
 * Input:  array of levels ("LOW"/"MEDIUM"/"HIGH") or numeric scores (1–3), oldest first.
 *         Works for a single domain OR for overall weekly scores.
 * Output: "IMPROVING" | "STABLE" | "DECLINING"
 *
 * RULE (transparent + deterministic):
 *   1. Convert levels to scores: LOW=1, MEDIUM=2, HIGH=3 (higher = more strain).
 *   2. Split the series into an EARLIER half and a RECENT half
 *      (with 4 weeks: weeks 1–2 vs weeks 3–4; odd lengths give the extra week to EARLIER).
 *   3. delta = avg(RECENT) − avg(EARLIER)
 *   4. delta ≥ +0.5  → DECLINING   (strain went up by at least half a level)
 *      delta ≤ −0.5  → IMPROVING   (strain went down by at least half a level)
 *      otherwise     → STABLE
 *   Fewer than 2 data points → STABLE (not enough history to call a change).
 *
 * Examples: LOW→LOW→MEDIUM→HIGH  = (1,1 | 2,3) → delta +1.5 → DECLINING
 *           HIGH→MEDIUM→LOW      = (3,2 | 1)   → delta −1.5 → IMPROVING
 */
function calculateWellbeingTrend(series) {
  if (!Array.isArray(series) || series.length < 2) return "STABLE";

  const scores = series.map(toScore);
  const mid = Math.ceil(scores.length / 2);
  const delta = average(scores.slice(mid)) - average(scores.slice(0, mid));

  if (delta >= TREND_THRESHOLD) return "DECLINING";
  if (delta <= -TREND_THRESHOLD) return "IMPROVING";
  return "STABLE";
}

/** Per-domain level history for a student, e.g. { ACADEMIC: ["LOW","LOW","MEDIUM","HIGH"], ... } */
function getDomainHistory(studentId) {
  const { weeks } = getStudent(studentId);
  const history = {};
  DOMAINS.forEach((d) => {
    history[d] = weeks.map((w) => w.domains[d]);
  });
  return history;
}

/** Overall score per week (array of numbers, oldest first). */
function getOverallHistory(studentId) {
  return getStudent(studentId).weeks.map(weekOverallScore);
}

/** Builds the GET /wellbeing matrix. */
function getWellbeingMatrix(studentId) {
  const { weeks } = getStudent(studentId);
  const latest = weeks[weeks.length - 1];

  return {
    studentId,
    currentWeek: latest.week,
    overallLevel: scoreToLevel(weekOverallScore(latest)),
    domains: { ...latest.domains },
    weeklyTrend: weeks.map((w) => ({
      week: w.week,
      academic: w.domains.ACADEMIC,
      emotional: w.domains.EMOTIONAL,
      social: w.domains.SOCIAL,
      financial: w.domains.FINANCIAL,
      personal: w.domains.PERSONAL,
    })),
  };
}

/** Validates and stores a weekly check-in in memory. No diagnosis, no inference. */
function recordCheckIn(studentId, body = {}) {
  getStudent(studentId);

  const { week, mood, energyDomain } = body || {};
  if (week === undefined || mood === undefined || energyDomain === undefined) {
    throw new AppError("Missing required field");
  }
  if (typeof week !== "string" || !WEEK_REGEX.test(week)) throw new AppError("Invalid week");
  if (!MOODS.includes(mood)) throw new AppError("Invalid mood");
  if (!ENERGY_DOMAINS.includes(energyDomain)) throw new AppError("Invalid energyDomain");

  if (!checkIns[studentId]) checkIns[studentId] = [];
  checkIns[studentId].push({ week, mood, energyDomain, recordedAt: new Date().toISOString() });

  return {
    studentId,
    week,
    mood,
    energyDomain,
    message: "Check-in recorded successfully.",
  };
}

function getCheckIns(studentId) {
  getStudent(studentId);
  return checkIns[studentId] || [];
}

module.exports = {
  DOMAINS,
  AppError,
  getStudent,
  calculateWellbeingTrend,
  getDomainHistory,
  getOverallHistory,
  getWellbeingMatrix,
  recordCheckIn,
  getCheckIns,
};
