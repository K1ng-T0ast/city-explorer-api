'use strict';

const axios = require('axios');

let cache = {};
const CACHE_EXPIRATION_TIME = 2.628e+9;

async function getMovie(req, res, next) {
    try {
        let movieImg = req.query.city;
        let key = `${movieImg}`

        if ((cache[key]) && (Date.now() - cache[key].created) < CACHE_EXPIRATION_TIME) {
            console.log('Cache hit!', cache);
            res.status(200).send(cache[key].data);

        } else {
            console.log('Cache miss!', cache);
            let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_DB_API_KEY}&language=en-US&query=${movieImg}`;
    
            let movieResponse = await axios.get(url);
    
            let dataSend = movieResponse.data.results.map(obj => new Movie(obj));

            cache[key] = {
                data: dataSend,
                created: Date.now()
            };
    
            res.status(200).send(dataSend);
        }


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