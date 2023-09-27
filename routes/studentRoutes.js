const express = require('express');

const studentController = require('../controllers/studentController');

const router = express.Router();

router
    .route('/')
    .get(studentController.getAllStudents)
    .post(studentController.createStudent);

router
    .route('/:studentId')
    .get(studentController.getStudentByStudentId)
    .patch(studentController.updateStudentByHisStudentId)
    .delete(studentController.deleteStudentByHisStudentId);

module.exports = router;