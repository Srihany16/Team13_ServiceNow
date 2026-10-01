/**
 * Module 2 — synthetic, anonymized social connection data.
 *
 * `weeklyConnections` = number of consented collaboration interactions per week
 * (e.g. study-group sessions, club activities). Pure demo counts.
 *
 * NO private messages, NO social media, NO location data, NO personal communications.
 * Oldest week first, most recent week last.
 */

const socialData = {
  STU001: { studentId: "STU001", weeks: ["2026-W37", "2026-W38", "2026-W39", "2026-W40"], weeklyConnections: [6, 6, 6, 2] },
  STU002: { studentId: "STU002", weeks: ["2026-W37", "2026-W38", "2026-W39", "2026-W40"], weeklyConnections: [5, 5, 6, 5] },
  STU003: { studentId: "STU003", weeks: ["2026-W37", "2026-W38", "2026-W39", "2026-W40"], weeklyConnections: [4, 4, 4, 5] },
};

module.exports = { socialData };
