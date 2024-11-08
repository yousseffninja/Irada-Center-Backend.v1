const teacherController = require('../controllers/teacherController');

const express = require('express');

const router = express.Router();

router
    .route('/')
    .get(teacherController.getAllTeachers)
    .post(teacherController.createTeacher)
    .patch(teacherController.withdrawBalance);

router
    .route('/:id')
    .get(teacherController.getTeacher)
    .patch(teacherController.updateTeacher)
    .delete(teacherController.deleteTeacher);

module.exports = router;