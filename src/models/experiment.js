const mongoose = require('mongoose')
const validator = require('validator')

const Experiment = mongoose.model('Experiment', {
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    }
})

module.exports = Experiment