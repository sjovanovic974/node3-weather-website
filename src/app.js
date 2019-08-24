const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Saša Jovanović'
    })
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Saša Jovanović'
    })
});

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Saša Jovanović'
    })
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        });
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({ error });
        }

        forecast(latitude, longitude, (error, {summary, temp, precipitation}) => {
            if(error) {
                return res.send({ error });
            }

            res.send({
                location,
                summary, 
                temp,
                precipitation
            });
        });
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        msg: 'Help article not found',
        name: 'Saša Jovanović' 
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        msg: 'Page not found',
        name: 'Saša Jovanović'
    });
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}.`)
});