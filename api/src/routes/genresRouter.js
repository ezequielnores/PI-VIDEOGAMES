const { Router } = require('express');
const genresRouter = Router();
const { getGenres } = require('../Controllers/genresController.js');

 
genresRouter.get('/', async (req,res)=> {
    try {
        const genres = await getGenres();
        res.status(200).send(genres)
    } catch (error) {
        res.status(400).send(error.message)
    }
});

module.exports = genresRouter;