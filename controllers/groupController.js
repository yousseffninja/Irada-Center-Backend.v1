const Group = require("../models/groupModel");
const StudentGroup = require("../models/studentGroup");
const Student = require("../models/studentsModel");
const Teacher =  require("../models/teacherModel");

const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

const factory = require("./handlerFactory");

exports.getAllGroups = async (req, res, next) => {
    // #swagger.tags = ['Groups']
    /* #swagger.description = 'This API For Get All Groups With Filteration' */
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

    return factory.getAllMagdy(req, res, next, Group);
}

exports.createGroup = catchAsync(async (req, res, next) => {
    // #swagger.tags = ['Groups']
    /* #swagger.description = 'This API For Create Groups grad Enum:- اولي اعدادي, تانيه اعدادي, تالته اعدادي, اولي ثانويه, تانيه ثانويه, تالته ثانويه  subject Enum:- رياضيات, عربي, انجليزي, كيمياء, فزياء, تاريخ, جغرفياء, فلسفه, علوم, درسات اجتماعيه, فرنساوي, الماني, ايطالي' */
    const { 
        teacher,
        grad,
        subject,
        price,
    } = req.body;

    const group = await Group.create({
        teacher,
        grad,
        subject,
        price,
    });

    res.status(201).json({
        status: "success",
        group
    });
});

exports.getGroup = catchAsync(async (req, res, next) => {
    // #swagger.tags = ['Groups']
    /* #swagger.description = 'This API For Get Group By Id' */
    const group = await Group.findById(req.params.groupId);

    if (!group) {
        return next(new AppError("No group found with that ID", 404));
    }

    const attendentce = await Attendence.findOne({ group: group._id });

    res.status(200).json({
        status: "success",
        group,
        attendentce
    });
});

exports.updateGroup = catchAsync(async (req, res, next) => {
    // #swagger.tags = ['Groups']
    /* #swagger.description = 'This API For Update Group By Id' */
    const group = await Group.findById(req.params.groupId);

    const { 
        teacher,
        grad,
        subject,
        price,
    } = req.body;

    if (!group) {
        return next(new AppError("No group found with that ID", 404));
    }

    group.teacher = teacher;
    group.grad = grad;
    group.subject = subject;
    group.price = price;
    await group.save();

    res.status(200).json({
        status: "success",
        group
    });
});

exports.deleteGroup = catchAsync(async (req, res, next) => {
    // #swagger.tags = ['Groups']
    /* #swagger.description = 'This API For Delete Group By Id' */
    const group = await Group.findByIdAndDelete(req.params.groupId);

    if (!group) {
        return next(new AppError("No group found with that ID", 404));
    }

    res.status(201).json({
        status: "success",
        data: null
    });
});

exports.addStudenttoGroup = catchAsync(async (req, res, next) => {
    // #swagger.tags = ['Groups']
    /* #swagger.description = 'This API For Add Student To Group' */
    const { 
        groupId,
        studentId,
        paid
    } = req.body;

    const student = await Student.findOne({ studentId });

    if (!student) {
        return next(new AppError("No student found with that ID", 404));
    }

    const group = await Group.findOne({ groupId });

    if (!group) {
        return next(new AppError("No group found with that ID", 404));
    }

    const studentGroup = await StudentGroup.create({
        groupId,
        student: student._id,
        paid
    });

    group.students.push(studentGroup._id);

    await group.save();

    const teacher = await Teacher.findById(group.teacher);
    teacher.balance += paid;
    await teacher.save();

    res.status(201).json({
        status: "success",
        studentGroup
    });
});