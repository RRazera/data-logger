const express = require('express')
const multer = require('multer')
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
    console.log(req.body)
    const result = new Result({
        picture: req.file.buffer,
        experiment: req.body.experiment,
        comments: req.body.comments,
        conditions: req.body.conditions
    })

    try {
        await result.save()

        res.status(201).send()
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

        res.set('Content-Type', 'image/jpg')
        res.send(result.picture)
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router