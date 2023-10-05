const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    studentId: {
        type: String,
        default: function () {
            return String(Math.floor(Math.random() * 1000000000));
        },
    },
    age: Number,
    phoneNumber: {
        type: String,
        required: true
    },
    parentPhoneNumber: {
        type: String,
        required: true
    },
    grad: {
        type: String,
        required: true,
        ennum: ['اولي اعدادي', 'تانيه اعدادي', 'تالته اعدادي', 'اولي ثانويه', 'تانيه ثانويه', 'تالته ثانويه']
    },
    groups: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group'
    }],
    transactions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Transaction'
    }],
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;