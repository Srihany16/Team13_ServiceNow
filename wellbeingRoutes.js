/**
 * Module 2 — Wellbeing Ripple routes.
 * Mount in the existing server with:  app.use("/api", wellbeingRoutes);
 * Paths here are RELATIVE to /api.
 */

const express = require("express");
const controller = require("../controllers/wellbeingController");

const router = express.Router();

// Safe even if the main app already uses express.json() — it won't parse twice.
router.use(express.json());

router.get("/students/:studentId/wellbeing", controller.getWellbeing);
router.post("/students/:studentId/wellbeing/check-in", controller.postCheckIn);
router.get("/students/:studentId/social", controller.getSocial);
router.get("/students/:studentId/ripple", controller.getRipple);

// Malformed JSON bodies etc. → same response contract, no raw Express error.
// eslint-disable-next-line no-unused-vars
router.use((err, req, res, next) => {
  if (err.type === "entity.parse.failed") {
    return res.status(400).json({ success: false, data: null, error: "Invalid JSON body" });
  }
  return controller.fail(res, err);
});

module.exports = router;
