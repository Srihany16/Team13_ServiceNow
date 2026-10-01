const express = require('express');
const router = express.Router();
const pressureController = require('../controllers/pressureController');

// Route matches base: /api/students/:studentId
// The routes are nested inside index or app, assuming the base path maps to '/api/students'
// For example: app.use('/api/students', pressureRoutes)

router.get('/:studentId/pressure', pressureController.getPressureForecast);
router.get('/:studentId/academic', pressureController.getStudentAcademicData);

module.exports = router;
