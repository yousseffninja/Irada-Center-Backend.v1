const express = require('express');
const attendenceController = require('../controllers/attendenceController');

const router = express.Router();

router
    .route('/')
    .get(attendenceController.getAllAAttendence)
    .post(attendenceController.studentAttendance);

router
    .route('/:id')
    .get(attendenceController.getAttendence)

router
    .route('/find-student-attendance')
    .patch(attendenceController.findStudentAttendence)

module.exports = router;