const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const hbs = require('hbs')
require('./db/mongoose')
const userRouter = require('./routers/user')
const experimentRouter = require('./routers/experiment')
const resultRouter = require('./routers/result')

const app = express()
const port = process.env.PORT || 3000

// define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static dir to server
app.use(express.static(publicDirPath))

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(userRouter)
app.use(experimentRouter)
app.use(resultRouter)

app.get('', (req, res) => {
    // res.render('index', {
    //     title: 'Data Logger',
    //     name: 'Ricardo Razera'
    // })
    res.redirect('/experiments')
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Ricardo Razera'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Ricardo Razera',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Ricardo Razera',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})