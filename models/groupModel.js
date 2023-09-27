const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
    groupId: {
        type: String,
        default: Math.floor(Math.random() * 1000000000),
        unique: true
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher'
    },
    grad: {
        type: String,
        required: true,
        ennum: ['اولي اعدادي', 'تالته اعدادي اعدادي', 'اولي ثانويه', 'تانيه ثانويه', 'تالته ثانويه']
    },
    subject: {
        type: String,
        required: true,
        ennum: ['رياضيات', 'عربي', 'انجليزي', 'كيمياء', "فزياء", "تاريخ", "جغرفياء", "فلسفه", "علوم", "درسات اجتماعيه", "فرنساوي", "الماني", "ايطالي"]
    },
    price: {
        type: Number,
        required: true
    },
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    }],
});

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;