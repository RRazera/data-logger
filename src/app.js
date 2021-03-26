const path = require('path')
const express = require('express')

const app = express()

// define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)

// setup static dir to server
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Ricardo Razera'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Ricardo Razera'
    })
})

app.get('/weather', (req, res) => {
    res.send({
        forecast: 'clear',
        location: 'POA'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})