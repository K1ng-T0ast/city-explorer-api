'use strict';

const axios = require('axios');

let cache = {};
const CACHE_EXPIRATION_TIME = 2.628e+9;

async function getPhoto(req, res, next) {
    try {
        let cityImg = req.query.city;
        let key = `${cityImg}-photos`;

        if ((cache[key]) && (Date.now() - cache[key].created) < CACHE_EXPIRATION_TIME) {
            console.log('Cache hit!', cache);
            res.status(200).send(cache[key].data);

        } else {
            console.log('Cache miss!', cache);
            let url = `https://api.unsplash.com/search/photos?client_id=${process.env.UNSPLASH_API_KEY}&query=${cityImg}`;

            let imgResponse = await axios.get(url);

            let dataSend = imgResponse.data.results.map(obj => new Photo(obj));

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

class Photo {
    constructor(imgObj) {
        this.src = imgObj.urls.regular;
        this.alt = imgObj.alt_description;
        this.username = imgObj.user.name;
    }
}

module.exports = getPhoto;
