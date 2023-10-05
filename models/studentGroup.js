const mongoose = require('mongoose');

const studentGroupSchema = new mongoose.Schema({
    groupId: {
        type: String,
        default: function () {
            return String(Math.floor(Math.random() * 1000000000));
        },
        unique: true
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    },
    paid: {
        type: Number,
        required: true
    },
});

studentGroupSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'student',
        select: '-__v'
    });
    next();
});

const StudentGroup = mongoose.model('student-group', studentGroupSchema);

module.exports = StudentGroup;