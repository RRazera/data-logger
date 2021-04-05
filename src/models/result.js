const mongoose = require('mongoose')
const validator = require('validator')

const resultSchema = new mongoose.Schema({
    picture: {
        type: Buffer,
        required: false
    },
    experiment: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Experiment'
    },
    comments: {
        type: String,
        required: false
    },
    conditions: {
        type: String,
        required: false
    }
})

const Result = mongoose.model('Result', resultSchema)

module.exports = Result