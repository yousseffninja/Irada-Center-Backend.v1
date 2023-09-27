const mongoose = require('mongoose');

const attendenceSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    },
    studentDeposite: {
        type: Number,
        required: true
    },
    group: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group'
    },
    attendenceDate: [{
        type: Date,
    }],
});

const Attendence = mongoose.model('Attendence', attendenceSchema);

module.exports = Attendence;