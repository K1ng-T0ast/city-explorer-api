'use strict';

// **** REQUIRE **** like import but for the backend

const express = require('express');
require('dotenv').config();
const cors = require('cors');
let weatherData = require('./data/weather.json');

// App now === server - Need to call express to create the server
const app = express();

// **** MIDDLEWARE **** Allow anyone to hit our server
app.use(cors());

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => console.log(`listening on ${PORT}`));

// **** ENDPOINTS ****
// **** 1st arg - endpoint URL, 2nd arg - callback which will execute when endpoint is hit
// **** 2 parameters - request, response
app.get('/', (req, res) => {
    res.status(200).send('Welcome to my server!');
});

// **** Weather goes here ****

app.get('/weather', (req, res, next) => {
    try {
        let lat = parseFloat(req.query.lat);
        let lon = parseFloat(req.query.lon);
        let searchQuery = req.query.searchQuery;

        console.log('lat:', lat, 'lon:', lon, 'searchQuery:', searchQuery);

        let foundWeather = weatherData.find(city => city.city_name.toLowerCase() === searchQuery.toLowerCase() &&
            Math.abs(city.lat - lat) < 0.001 &&
            Math.abs(city.lon - lon) < 0.001);

        console.log('foundWeather:', foundWeather);


// **** Trying to understand why this original code is not working ****            
            // let lat = req.query.lat;
            // let lon = req.query.lon;
            // let searchQuery = req.query.searchQuery;
    
            // let foundWeather = weatherData.find(city => city.city_name.toLowerCase() === searchQuery.toLowerCase() && city.lat == lat && city.lon == lon);

        if (!foundWeather) {
             return res.status(404).send('No weather found');
        }

        let forecasts = foundWeather.data.map(weatherData => new Forecast(weatherData));

        res.status(200).send(forecasts);
    } catch (error) {
        next(error);
    }
});

// **** CLASS TO CLEAN UP BULKY DATA ****
class Forecast {
    constructor(forecastData) {
        this.date = forecastData.datetime;
        this.description = forecastData.weather.description;
    }
}

// **** CATCH ALL SHOULD BE THE LAST DEFINED ****
app.get('*', (req, res) => {
    res.status(404).send('This page is not available');
});

app.use((error, req, res, next) => {
    console.log(error.message);
    res.status(500).send(error.message);
});