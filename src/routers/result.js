const express = require('express')
const multer = require('multer')
const sharp = require('sharp')
const Experiment = require('../models/experiment')
const Result = require('../models/result')
const router = new express.Router()

const upload = multer({
    limits: {
        fileSize: 10000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg|jpeg|pdf)$/)) {
            return cb(new Error('File must be a png, jpg, jpeg ou pdf'))
        }
        return cb(undefined, true)
    }
})

router.post('/result', upload.single('upload'), async (req, res) => {

    try {
        const buffer = await sharp(req.file.buffer).resize({ width: 500, height: 500 }).png().toBuffer()

        const comments = []
        for (i = 0; i < req.body.comments.length; i++) {
            const comment = req.body.comments[i]
            if (comment != '') {
                comments.push({ comment })
            }
        }

        const conditions = []
        for (i = 0; i < req.body.conditions.length; i++) {
            const condition = req.body.conditions[i]
            if (condition != '') {
                conditions.push({ condition })
            }
        }

        const result = new Result({
            picture: buffer,
            experiment: req.body.experiment,
            comments,
            conditions
        })

        await result.save()

        res.status(201).redirect('/experiments/' + req.body.experiment)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.post('/result/addResultPic', upload.single('upload'), async (req, res) => {
    try {
        const result = await Result.findById(req.body.id)

        result.picture = req.file.buffer
        await result.save()
        res.send()    
    } catch (e) {
        res.status(500).send()
    }
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message})
})

router.patch('/result/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['comments', 'conditions']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!'})
    }

    try {
        const result = await Result.findByIdAndUpdate(req.params.id, req.body, { new: true })

        if (!result) {
            return res.status(404).send()
        }

        res.send(result)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/result/:id/pic', async (req, res) => {
    try {
        const result = await Result.findById(req.params.id)

        result.picture = undefined
        await result.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/result/:id/pic', async (req, res) => {
    try {
        const result = await Result.findById(req.params.id)

        if (!result.picture || !result) {
            throw new Error()
        }

        res.set('Content-Type', 'image/png')
        res.send(result.picture)
    } catch (e) {
        res.status(404).send(e)
    }
})

router.delete('/result/:id', async (req, res) => {
    try {
        const result = await Result.findByIdAndDelete(req.params.id)

        if (!result) {
            return res.status(404).send()
        }

        res.send(result)
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router