const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: Number,
    phoneNumber: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true,
        ennum: ['رياضيات', 'عربي', 'انجليزي', 'كيمياء', "فزياء", "تاريخ", "جغرفياء", "فلسفه", "علوم", "درسات اجتماعيه", "فرنساوي", "الماني", "ايطالي"]
    },
    balance: {
        type: Number,
        default: 0
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

const Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = Teacher;