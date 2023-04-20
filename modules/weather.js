'use strict';

const axios = require('axios');

async function getWeather(req, res, next) {
    try {
        let lat = parseFloat(req.query.lat);
        let lon = parseFloat(req.query.lon);

        let url = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHERBIT_API_KEY}&lat=${lat}&lon=${lon}&days=16`;

        console.log('URL:', url); // request URL

        let weatherResponse = await axios.get(url)

        let forecasts = weatherResponse.data.data.map(weatherData => new Forecast(weatherData));

        console.log('Forecasts:', forecasts); // mapped forecasts

        res.status(200).send(forecasts);
    } catch (error) {
        next(error);
    }
}

class Forecast {
    constructor(forecastData) {
        this.date = forecastData.datetime;
        this.description = forecastData.weather.description;
        this.minTemp = forecastData.min_temp;
        this.maxTemp = forecastData.max_temp;
    }
}

module.exports = getWeather;