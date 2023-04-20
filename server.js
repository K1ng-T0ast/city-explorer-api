'use strict';

// **** REQUIRE **** like import but for the backend

const express = require('express');
require('dotenv').config();
const cors = require('cors');
const getWeather = require('./modules/weather');
const getMovie = require('./modules/movies');
const getPhoto = require('./modules/photos');

const app = express();

app.use(cors());

const PORT = process.env.PORT || 3003;

app.listen(PORT, () => console.log(`listening on ${PORT}`));

app.get('/', (req, res) => {
    res.status(200).send('Welcome to my server!');
});

app.get('/weather', getWeather);

app.get('/movies', getMovie);

app.get('/photos', getPhoto);


app.get('*', (req, res) => {
    res.status(404).send('This page is not available');
});

app.use((error, req, res, next) => {
    console.log(error.message);
    res.status(500).send(error.message);
});


        // console.log('Weather Response:', weatherResponse.data); // response data

        // if (!weatherResponse.data.results) {
        //     return res.status(404).send('No weather found');
        // }

        // let foundWeather = weatherResponse.data.get(city => 
        //     city.city_name.toLowerCase() === searchQuery.toLowerCase() ||
        //     Math.abs(parseFloat(city.lat) - parseFloat(lat)) < 0.01 ||
        //     Math.abs(parseFloat(city.lon) - parseFloat(lon)) < 0.01
        // );
    

        // console.log('foundWeather:', foundWeather); // filtered data

        // if (!foundWeather) {
        //      return res.status(404).send('No weather found');
        // }

// **** Trying to understand why this original code is not working ****            
            // let lat = req.query.lat;
            // let lon = req.query.lon;
            // let searchQuery = req.query.searchQuery;
    
            // let foundWeather = weatherResponse.data.results.filter(city => city.city_name.toLowerCase() === searchQuery.toLowerCase() || city.lat == lat || city.lon == lon);