const express = require('express')
const Experiment = require('../models/experiment')
const router = new express.Router()

router.post('/experiments', async (req, res) => {
    const experiment = new Experiment(req.body)

    try {
        await experiment.save()

        res.status(201).redirect('/experiments')
    } catch (e) {
        res.status(500).send(e)
    }
})

router.get('/experiments', async (req, res) => {
    try {
        const experiments = await Experiment.find({})

        res.render('project', {
            title: 'Project Page',
            name: 'Ricardo Razera',
            experiments
        })
    } catch (e) {
        res.status(404).send(e)
    }
})

router.get('/experiments/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const experiment = await Experiment.findById(_id)

        if (!experiment) {
            return res.status(404).send()
        }

        await experiment.populate('results').execPopulate()

        const experimentJSON = JSON.stringify(experiment)
        const results = experiment.results

        res.render('experiment', {
            title: experiment.name,
            name: 'Ricardo Razera',
            expId: experiment._id,
            expstring: experimentJSON,
            resultsArray: results,
            results: JSON.stringify(results)
        })
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