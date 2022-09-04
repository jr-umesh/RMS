const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
    room_number: {
        required: true,
        type: Number
    },
    available: {
        required: true,
        type: Boolean
    }
})

module.exports = mongoose.model('room', subjectSchema)