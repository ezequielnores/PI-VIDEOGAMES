const axios = require('axios');
require('dotenv').config();
const { Genre } = require('../db.js');
const { API_KEY } = process.env;

const getGenres = async () => {
    const alreadyCreated = await Genre.findAll();
    if(alreadyCreated.length > 0) return alreadyCreated;
    else{
        const genresFromApi = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`).then(r => r.data.results.map(obj => {
            return { name: obj.name };
        }));
        const created = await Genre.bulkCreate(genresFromApi);
        return created;
    } 
}

module.exports = {
    getGenres,
    
}