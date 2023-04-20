'use strict';

const axios = require('axios');

async function getMovie(req, res, next) {
    try {
        let movieImg = req.query.city;
        let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_DB_API_KEY}&language=en-US&query=${movieImg}`;

        let movieResponse = await axios.get(url);

        let dataSend = movieResponse.data.results.map(obj => new Movie(obj));

        res.status(200).send(dataSend);
        
    } catch (error) {
        next(error);
    }
}

class Movie {
    constructor(movieObj) {
        this.title = movieObj.title;
        this.poster = movieObj.poster_path;
    }
}

module.exports = getMovie;