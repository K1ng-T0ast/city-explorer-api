'use strict';

const axios = require('axios');

async function getPhoto(req, res, next) {
    try {
        let cityImg = req.query.city;
        let url = `https://api.unsplash.com/search/photos?client_id=${process.env.UNSPLASH_API_KEY}&query=${cityImg}`;

        let imgResponse = await axios.get(url);

        let dataSend = imgResponse.data.results.map(obj => new Photo(obj));

        res.status(200).send(dataSend);
    } catch (error) {
        next(error);
    }
}

class Photo {
    constructor(imgObj) {
        this.src = imgObj.urls.regular;
        this.alt = imgObj.alt_description;
        this.userName = imgObj.user.name;
    }
}

module.exports = getPhoto;