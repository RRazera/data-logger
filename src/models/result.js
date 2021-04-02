const mongoose = require('mongoose')
const validator = require('validator')

const Result = mongoose.model('Result', {
    picture: {
        type: String,
        required: true,
        trim: true
    },
    comments: {
        type: String,
        default: false
    }
})

module.exports = Experiment