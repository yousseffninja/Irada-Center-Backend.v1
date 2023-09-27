const Student = require("../models/studentsModel");

const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

const factory = require("./handlerFactory");

exports.getAllStudents = async (req, res, next) => {
  // #swagger.tags = ['Students']
  /* #swagger.description = 'This API For Get All Student With Filteration' */
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

  return factory.getAllMagdy(req, res, next, Student);
};

exports.createStudent = catchAsync(async (req, res, next) => {
  // #swagger.tags = ['Students']
  /* #swagger.description = 'This API For Create Students gradEnum:- اولي اعدادي, تانيه اعدادي, تالته اعدادي, اولي ثانويه, تانيه ثانويه, تالته ثانويه '*/

  const { 
    name,
    age,
    phoneNumber,
    parentPhoneNumber,
    grad,
  } = req.body;

  const student = await Student.create({
    name,
    age,
    phoneNumber,
    parentPhoneNumber,
    grad,
  });

  res.status(201).json({
    status: "success",
    student
  });
});

exports.getStudentByStudentId = catchAsync(async (req, res, next) => {
  // #swagger.tags = ['Students']
  /* #swagger.description = 'This API For Get Student By His Student ID '*/

  const studentId = req.params.studentId;

  const student = await Student.findOne({ studentId })

  if (!student) {
    return next(new AppError("This student not Found !", 404));
  }

  res.status(200).json({
    status: "success",
    student
  });
})

exports.updateStudentByHisStudentId = catchAsync(async (req, res, next) => {
  // #swagger.tags = ['Students']
  /* #swagger.description = 'This API For Update Student By His Student ID. gradEnum:- اولي اعدادي, تانيه اعدادي, تالته اعدادي, اولي ثانويه, تانيه ثانويه, تالته ثانويه , Note:- All fields are optional '*/

  const studentId = req.params.studentId;

  const { 
    name,
    age,
    phoneNumber,
    parentPhoneNumber,
    grad,
  } = req.body;

  const student = await Student.findOneAndUpdate({ studentId }, {
    name,
    age,
    phoneNumber,
    parentPhoneNumber,
    grad,
  });

  if(!student) {
    return next(new AppError("This student not Found !", 404));
  }

  res.status(200).json({
    status: "success",
    student
  });
})


exports.deleteStudentByHisStudentId = catchAsync(async (req, res, next) => {
  // #swagger.tags = ['Students']
  /* #swagger.description = 'This API For Delete Student By His Student ID '*/

  const studentId = req.params.studentId;

  const student = await Student.findOne({ studentId })

  if (!student) {
    return next(new AppError("This student not Found !", 404));
  }

  await student.remove();

  res.status(200).json({
    status: "success",
  });
});