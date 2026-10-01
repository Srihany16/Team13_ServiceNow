const academicData = require('../data/academicData');

const getAcademicData = (studentId) => {
  return academicData[studentId] || null;
};

const calculatePressureScore = (studentData) => {
  let score = 0;
  
  // Weights based on factors
  score += studentData.upcomingDeadlines * 10;
  score += studentData.upcomingExams * 20;
  score += studentData.academicBacklog * 15;
  
  if (studentData.attendanceTrend === 'DECLINING') {
    score += 20;
  } else if (studentData.attendanceTrend === 'STABLE') {
    score += 5;
  }
  
  if (studentData.currentAttendance < 80) {
    score += 15;
  }
  
  // Cap score at 100
  return Math.min(score, 100);
};

const getForecastLevel = (score) => {
  if (score >= 70) return "HIGH";
  if (score >= 40) return "MEDIUM";
  return "LOW";
};

const generatePressureForecast = (studentId) => {
  const data = getAcademicData(studentId);
  if (!data) return null;

  const score = calculatePressureScore(data);
  const forecast = getForecastLevel(score);

  // Generate factors strings
  const factors = [];
  if (data.upcomingDeadlines > 0) factors.push(`${data.upcomingDeadlines} assignments due`);
  if (data.upcomingExams > 0) factors.push(`${data.upcomingExams} exam upcoming`);
  if (data.academicBacklog > 0) factors.push(`${data.academicBacklog} past due assignments`);
  if (data.attendanceTrend === 'DECLINING') factors.push(`Attendance declining`);

  // Recommended actions based on forecast level
  let recommendedActions = [];
  if (forecast === "HIGH") {
    recommendedActions = ["PLAN_WEEK", "ACADEMIC_SUPPORT", "PEER_SUPPORT"];
  } else if (forecast === "MEDIUM") {
    recommendedActions = ["PLAN_WEEK", "PEER_SUPPORT"];
  } else {
    recommendedActions = ["SET_WELLBEING_GOAL"];
  }

  // Mock daily forecast
  const dailyForecast = [
    { day: "MON", level: forecast === "HIGH" ? "LOW" : "LOW" },
    { day: "TUE", level: forecast === "HIGH" ? "MEDIUM" : (forecast === "MEDIUM" ? "LOW" : "LOW") },
    { day: "WED", level: forecast === "HIGH" ? "HIGH" : (forecast === "MEDIUM" ? "MEDIUM" : "LOW") },
    { day: "THU", level: forecast === "HIGH" ? "HIGH" : (forecast === "MEDIUM" ? "MEDIUM" : "LOW") },
    { day: "FRI", level: forecast === "HIGH" ? "HIGH" : (forecast === "MEDIUM" ? "LOW" : "LOW") }
  ];

  return {
    studentId: studentId,
    forecast: forecast,
    score: score,
    week: "2026-W40",
    dailyForecast: dailyForecast,
    factors: factors,
    recommendedActions: recommendedActions
  };
};

module.exports = {
  getAcademicData,
  calculatePressureScore,
  generatePressureForecast
};
