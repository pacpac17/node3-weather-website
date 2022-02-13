const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//console.log(__dirname)
//console.log(path.join(__dirname, '../public'))

const app = express()

//Define paths for Exprees cofig
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
//Setup handlerbars engine & views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static dir to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather Json String App',
        name: 'Pacpac',
        author: 'Frank'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Json String App',
        name: 'Pacpac',
        author: 'Frank'
    })
})


app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'Asdsadsadsad sdsad sadsad ',
        title: 'Ayuda',
        name: 'Pacpac17',
        author: 'Frank'
    })
})
/*
app.get('', (req, res) => {
    res.send('<h1>Weather....</h1>')
})
*/
/*
app.get('/help', (req, res) => {
    res.send([{
        name: 'Pacpac',
        age: 47
    },
    {
        name: 'Franc',
        age: 12
    }

])
})

app.get('/about' , (req, res) => {
    res.send('<title>Acerca de ...</title>')
})
*/

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Must provide an address'
        })
    }

    address = req.query.address.trim()

    geocode(address , ( error, {latitude, longitude, location } = {} ) => {
        if ( error) {
            return  res.send({
                error: 'Error geocoding...'
            }) 
        }  

        
        forecast( latitude , longitude , (error, forecastData) => {            
            if ( error) {
                return  res.send({
                    error: 'Error forecasting...'
                })                 
            }  
            
            console.log(forecastData)

            res.send( {
                forecast: forecastData.trim(),
                location,
                address: req.query.address
                
            }
        
            )

        })

    })



})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return  res.send({
            error: 'Search is mandatory...'
        })
    }

    console.log(req.query)
    res.send({
        products: []
    })
})



app.get ('/help/*', (req, res) => {
    //res.send('help articulo not found')
    res.render('error', {
        title: 'Error Json String App',
        name: 'Pacpac',
        author: 'Frank',
        message: 'Help article not found'
    })    
} )




app.get('*', (req, res) => {
    //res.send('My 404 page')
    res.render('error', {
        title: 'Error Json String App',
        name: 'Pacpac',
        author: 'Frank',
        message: 'Page not found'
    })        
})

app.listen(3000, () => {
    console.log('Server exprees  listening on port 3000 ' )
}) 