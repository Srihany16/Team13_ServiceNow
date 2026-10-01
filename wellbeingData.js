/**
 * Module 2 — Wellbeing Ripple: synthetic, anonymized, deterministic demo data.
 *
 * Level meaning (per domain): how much STRAIN the student reports in that domain.
 *   LOW    = little strain (doing fine)
 *   MEDIUM = some strain
 *   HIGH   = a lot of strain
 * So LOW → HIGH over time means wellbeing is DECLINING.
 *
 * `attendance` is OPTIONAL (weekly attendance %). When it is missing,
 * the ripple engine simply skips that signal and makes no assumptions.
 */

const students = {
  // Declining wellbeing + declining social signal → ripple expected
  STU001: {
    studentId: "STU001",
    weeks: [
      { week: "2026-W37", domains: { ACADEMIC: "LOW", EMOTIONAL: "LOW", SOCIAL: "LOW", FINANCIAL: "LOW", PERSONAL: "LOW" } },
      { week: "2026-W38", domains: { ACADEMIC: "LOW", EMOTIONAL: "LOW", SOCIAL: "MEDIUM", FINANCIAL: "LOW", PERSONAL: "LOW" } },
      { week: "2026-W39", domains: { ACADEMIC: "MEDIUM", EMOTIONAL: "MEDIUM", SOCIAL: "MEDIUM", FINANCIAL: "LOW", PERSONAL: "MEDIUM" } },
      { week: "2026-W40", domains: { ACADEMIC: "HIGH", EMOTIONAL: "MEDIUM", SOCIAL: "HIGH", FINANCIAL: "LOW", PERSONAL: "MEDIUM" } },
    ],
    // no attendance data for this student (optional signal absent)
  },

  // Stable wellbeing + stable social signal → no ripple
  STU002: {
    studentId: "STU002",
    weeks: [
      { week: "2026-W37", domains: { ACADEMIC: "MEDIUM", EMOTIONAL: "LOW", SOCIAL: "LOW", FINANCIAL: "LOW", PERSONAL: "LOW" } },
      { week: "2026-W38", domains: { ACADEMIC: "MEDIUM", EMOTIONAL: "LOW", SOCIAL: "LOW", FINANCIAL: "LOW", PERSONAL: "LOW" } },
      { week: "2026-W39", domains: { ACADEMIC: "MEDIUM", EMOTIONAL: "MEDIUM", SOCIAL: "LOW", FINANCIAL: "LOW", PERSONAL: "LOW" } },
      { week: "2026-W40", domains: { ACADEMIC: "MEDIUM", EMOTIONAL: "LOW", SOCIAL: "LOW", FINANCIAL: "LOW", PERSONAL: "LOW" } },
    ],
    attendance: [88, 90, 87, 89],
  },

  // Improving wellbeing + improving social signal → no ripple
  STU003: {
    studentId: "STU003",
    weeks: [
      { week: "2026-W37", domains: { ACADEMIC: "HIGH", EMOTIONAL: "MEDIUM", SOCIAL: "MEDIUM", FINANCIAL: "LOW", PERSONAL: "MEDIUM" } },
      { week: "2026-W38", domains: { ACADEMIC: "MEDIUM", EMOTIONAL: "MEDIUM", SOCIAL: "MEDIUM", FINANCIAL: "LOW", PERSONAL: "MEDIUM" } },
      { week: "2026-W39", domains: { ACADEMIC: "LOW", EMOTIONAL: "LOW", SOCIAL: "LOW", FINANCIAL: "LOW", PERSONAL: "LOW" } },
      { week: "2026-W40", domains: { ACADEMIC: "LOW", EMOTIONAL: "LOW", SOCIAL: "LOW", FINANCIAL: "LOW", PERSONAL: "LOW" } },
    ],
    attendance: [80, 84, 88, 91],
  },
};

// In-memory check-in store: { [studentId]: [ { week, mood, energyDomain, recordedAt } ] }
// Resets when the server restarts (by design — no database).
const checkIns = {};

module.exports = { students, checkIns };
