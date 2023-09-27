const Teacher = require("../models/teacherModel");

const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

const factory = require("./handlerFactory");

exports.getAllTeachers = async (req, res, next) => {
    // #swagger.tags = ['Teachers']
    /* #swagger.description = 'This API For Get All Teachers With Filteration' */
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

    return factory.getAllMagdy(req, res, next, Teacher);
};

exports.createTeacher = catchAsync(async (req, res, next) => {
    // #swagger.tags = ['Teachers']
    /* #swagger.description = 'This API For Create Teacher Subject Enum:- رياضيات, عربي, انجليزي, كيمياء, فزياء, تاريخ, جغرفياء, فلسفه, علوم, درسات اجتماعيه, فرنساوي, الماني, ايطالي' */

    const { 
        name,
        age,
        phoneNumber,
        subject,
    } = req.body;

    const teacher = await Teacher.create({
        name,
        age,
        phoneNumber,
        subject,
    });

    res.status(201).json({
        status: "success",
        teacher
    });
});

exports.getTeacher = catchAsync(async (req, res, next) => {
    // #swagger.tags = ['Teachers']
    /* #swagger.description = 'This API For Get Teacher By Database Id' */

    const teacher = await Teacher.findById(req.params.id);

    if (!teacher) {
        return next(new AppError("No Teacher Found With This ID", 404));
    }

    res.status(200).json({
        status: "success",
        teacher
    });
});

exports.updateTeacher = catchAsync(async (req, res, next) => {
    // #swagger.tags = ['Teachers']
    /* #swagger.description = 'This API For update Teacher By Database Id Note:- All fields are optional' */

    const {
        name,
        age,
        phoneNumber,
        subject,
    } = req.body;

    const teacher = await Teacher.findByIdAndUpdate(req.params.id, {
        name,
        age,
        phoneNumber,
        subject,
    }, {
        new: true,
        runValidators: true
    });

    if (!teacher) {
        return next(new AppError("No Teacher Found With This ID", 404));
    }

    res.status(200).json({
        status: "success",
        teacher
    });
});

exports.deleteTeacher = catchAsync(async (req, res, next) => {
    // #swagger.tags = ['Teachers']
    /* #swagger.description = 'This API For Delete Teacher By Database Id' */

    const teacher = await Teacher.findById(req.params.id);

    if (!teacher) {
        return next(new AppError("No Teacher Found With This ID", 404));
    }

    await teacher.remove();

    res.status(204).json({
        status: "success",
        teacher: null
    });
});