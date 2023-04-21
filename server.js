'use strict';

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
