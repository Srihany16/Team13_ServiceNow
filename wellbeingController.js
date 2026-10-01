/**
 * Module 2 — wellbeingController
 * Request handling + response formatting only. Business logic lives in services.
 */

const wellbeingService = require("../services/wellbeingService");
const socialService = require("../services/socialService");
const rippleService = require("../services/rippleService");

const ok = (res, data) => res.status(200).json({ success: true, data, error: null });

const fail = (res, err) => {
  const status = err && err.status ? err.status : 500;
  const message = err && err.status ? err.message : "Internal server error";
  return res.status(status).json({ success: false, data: null, error: message });
};

function getWellbeing(req, res) {
  try {
    ok(res, wellbeingService.getWellbeingMatrix(req.params.studentId));
  } catch (err) {
    fail(res, err);
  }
}

function postCheckIn(req, res) {
  try {
    ok(res, wellbeingService.recordCheckIn(req.params.studentId, req.body));
  } catch (err) {
    fail(res, err);
  }
}

function getSocial(req, res) {
  try {
    const signal = socialService.getSocialSignal(req.params.studentId);
    if (!signal) return fail(res, { status: 404, message: "Social data not found" });
    ok(res, signal);
  } catch (err) {
    fail(res, err);
  }
}

function getRipple(req, res) {
  try {
    ok(res, rippleService.detectRipple(req.params.studentId));
  } catch (err) {
    fail(res, err);
  }
}

module.exports = { getWellbeing, postCheckIn, getSocial, getRipple, fail };
