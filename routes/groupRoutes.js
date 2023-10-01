const express = require('express');

const groupController = require('../controllers/groupController');

const router = express.Router();

router
    .route('/')
    .get(groupController.getAllGroups)
    .post(groupController.createGroup)
    .patch(groupController.addStudenttoGroup)


router
    .route('/:groupId')
    .get(groupController.getGroup)
    .patch(groupController.updateGroup)
    .delete(groupController.deleteGroup);

module.exports = router;