'use strict';

const axios = require('axios');

let cache = {};
const CACHE_EXPIRATION_TIME = 8.64e+7;

async function getWeather(req, res, next) {
    try {
        const { lat, lon } = req.query;
        let latitude = parseFloat(lat);
        let longitude = parseFloat(lon);
        let key = `lat:${latitude} lon:${longitude}`

        if ((cache[key]) && (Date.now() - cache[key].created) < CACHE_EXPIRATION_TIME) {
            console.log('Cache hit!', cache);
            res.status(200).send(cache[key].data);
            
        } else {
            console.log('Cache miss!', cache);
            let url = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHERBIT_API_KEY}&lat=${latitude}&lon=${longitude}&days=16`;
    
            console.log('URL:', url); // request URL
    
            let weatherResponse = await axios.get(url)
    
            let forecasts = weatherResponse.data.data.map(weatherData => new Forecast(weatherData));
    
            console.log('Forecasts:', forecasts); // mapped forecasts

            cache[key] = {
                data: forecasts,
                created: Date.now()
            };
    
            res.status(200).send(cache[key].data);
        }


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
        this.sunrise = forecastData.sunrise_ts;
        this.sunset = forecastData.sunset_ts;
    }
}

module.exports = getWeather;