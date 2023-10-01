const mongoose = require('mongoose');

const studentGroupSchema = new mongoose.Schema({
    groupId: {
        type: String,
        default: Math.floor(Math.random() * 1000000000),
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

const StudentGroup = mongoose.model('student-group', studentGroupSchema);

module.exports = StudentGroup;