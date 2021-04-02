const express = require('express')
const Experiment = require('../models/experiment')
const router = new express.Router()

router.post('/experiments', async (req, res) => {
    const experiment = new Experiment(req.body)

    try {
        await experiment.save()

        res.status(201).send(experiment)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.get('/experiments', async (req, res) => {
    try {
        const experiments = await Experiment.find({})

        res.send(experiments)
    } catch (e) {
        res.status(404).send(e)
    }
})

router.get('/experiments/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const experiment = await Experiment.findById(_id)
        const experimentJSON = JSON.stringify(experiment)

        if (!experiment) {
            return res.status(404).send()
        }

        res.render('experiment', {
            title: experiment.description,
            name: 'Ricardo Razera',
            expstring: experimentJSON
        })
        // res.send(experiment)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.patch('/experiments/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!'})
    }
    try {
        const experiment = await Experiment.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true})

        if (!experiment) {
            return res.status(404).send()
        }

        res.send(experiment)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/experiments/:id', async (req, res) => {
    try {
        const experiment = await Experiment.findByIdAndDelete(req.params.id)

        if (!experiment) {
            return res.status(404).send()
        }

        res.send(experiment)
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router