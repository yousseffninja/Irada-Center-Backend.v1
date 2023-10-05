const Attendence = require('../models/attendenceModel');
const Group = require("../models/groupModel");
const Student = require("../models/studentsModel");

const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

const factory = require("./handlerFactory");

exports.getAllAAttendence = async (req, res, next) => {
    // #swagger.tags = ['Attendence']
    /* #swagger.description = 'This API For Get All Attendence With Filteration' */
    /* #swagger.parameters['limit'] = {
            in: 'query',
            description: 'Page size: ex: ?limit=10',
            type: 'number'
        } 
    */
    /* #swagger.parameters['fields'] = {
            in: 'query',
            description: 'example: ?fields=name,description' ,
        } 
    */
    /* #swagger.parameters['page'] = {
            in: 'query',
            description: 'indexing page: ex: ?page=2',
            type: 'number'
        }
    */
    /* #swagger.parameters['sort'] = {
            in: 'query',
            description: 'example: ?sort=name,-createdAt',
        } 
    */

    return factory.getAllMagdy(req, res, next, Attendence);
};

exports.studentAttendance = catchAsync(async (req, res, next) => {
    // #swagger.tags = ['Attendence']
    /* #swagger.description = 'This API For Make Student Attend Group' */
    const {
        studentId,
        groupId,
        attendenceDate,
    } = req.body;

    const student = await Student.findOne({ studentId });

    if (!student) {
        return next(new AppError("No Student Found With This ID", 404));
    }

    const group = await Group.findOne({ groupId });

    if (!group) {
        return next(new AppError("No Group Found With This ID", 404));
    }

    const attendence = await Attendence.create({ 
        student: student._id, 
        group: group._id,
        attendenceDate,
    });
    
    res.status(201).json({
        status: "Student attendence created successfully",
        attendence
    });
});

exports.getAttendence = catchAsync(async (req, res, next) => {
    // #swagger.tags = ['Attendence']
    /* #swagger.description = 'This API For Get Attendence By Id' */
    const attendence = await Attendence.findById(req.params.id);

    if (!attendence) {
        return next(new AppError("No attendence found with that ID", 404));
    }

    res.status(200).json({
        status: "success",
        attendence
    });
});

exports.findStudentAttendence = catchAsync(async (req, res, next) => {
    // #swagger.tags = ['Attendence']
    /* #swagger.description = 'This API For Find Student Attendence By Id' */

    const { studentId, groupId } = req.body
    const attendence = await Attendence.find({ 
        student: studentId,
        group: groupId,
    });

    if (!attendence) {
        return next(new AppError("No attendence found with that ID", 404));
    }

    res.status(200).json({
        status: "success",
        attendence
    });
});