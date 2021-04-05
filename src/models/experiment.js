const mongoose = require('mongoose')
const validator = require('validator')

const experimentSchema = mongoose.Schema({
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

experimentSchema.virtual('results', {
    ref: 'Result',
    localField: '_id',
    foreignField: 'experiment'
})

const Experiment = mongoose.model('Experiment', experimentSchema)

module.exports = Experiment