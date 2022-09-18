const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    credit_hour: {
        required: true,
        type: Number
    }
})

module.exports = mongoose.model('subject', subjectSchema)