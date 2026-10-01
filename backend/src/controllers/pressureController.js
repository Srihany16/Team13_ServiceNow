const pressureService = require('../services/pressureService');

const getPressureForecast = (req, res) => {
  try {
    const studentId = req.params.studentId;
    const forecast = pressureService.generatePressureForecast(studentId);

    if (!forecast) {
      return res.status(404).json({
        success: false,
        data: null,
        error: "Student not found"
      });
    }

    return res.status(200).json({
      success: true,
      data: forecast,
      error: null
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      data: null,
      error: "Internal server error"
    });
  }
};

const getStudentAcademicData = (req, res) => {
  try {
    const studentId = req.params.studentId;
    const data = pressureService.getAcademicData(studentId);

    if (!data) {
      return res.status(404).json({
        success: false,
        data: null,
        error: "Student not found"
      });
    }

    return res.status(200).json({
      success: true,
      data: data,
      error: null
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      data: null,
      error: "Internal server error"
    });
  }
};

module.exports = {
  getPressureForecast,
  getStudentAcademicData
};
