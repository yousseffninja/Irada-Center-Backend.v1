const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    },
    Teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher'
    },
    studentDeposite: {
        type: Number,
        required: true
    },
    percentage: {
        type: Number,
    },
    group: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group'
    },
    transactionDate: {
        type: Date,
        default: Date.now
    },
    transactionType: {
        type: String,
        required: true,
        enum: ['deposite', 'withdraw']
    },
    transactionNote: String
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;