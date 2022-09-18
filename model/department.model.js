const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
})

module.exports = mongoose.model('department', departmentSchema)