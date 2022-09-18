const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    workload: {
        required: true,
        type: Number
    },
    type: {
        required: true,
        type: String
    },
    start: {
        required: true,
        type: String
    },
    end: {
        required: true,
        type: String
    }
})

module.exports = mongoose.model('teacher', teacherSchema)