const mongoose = require('mongoose')
const validator = require('validator')

const resultSchema = new mongoose.Schema({
    picture: {
        type: Buffer,
        required: true
    },
    experiment: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Experiment'
    },
    comments: [{
        comment: {
            type: String,
            required: false
        }
    }],
    conditions: [{
        condition: {
            type: String,
            required: false
        }
    }],
})

const Result = mongoose.model('Result', resultSchema)

module.exports = Result