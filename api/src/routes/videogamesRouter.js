const { Router } = require('express');
require('dotenv').config();
const videogamesRouter = Router();
const {getGamesByName, getGameById, postGame, deleteGame, getAllGames, getGamesByNameFromApi, getGamesByNameFromBd } = require('../Controllers/videogamesController');

videogamesRouter.get('/', async (req, res) => {
    try {
        const { name } = req.query;
        if(name){
            console.log(name);
            const videoGamesByName = await getGamesByName(name);
            // const videoGamesByName = await getGamesByNameFromApi(name);
            // const videoGamesByName = await getGamesByNameFromBd(name);
            res.status(200).send(videoGamesByName)
        } else{
            const allVideogames = await getAllGames();
            res.status(200).send(allVideogames);
        };
    } catch (error) {
        res.status(400).send(error)
    }
});

videogamesRouter.get('/:id', async (req,res) => {
    try {
        const videogameById = await getGameById(req.params);
        res.status(200).send(videogameById);
        
    } catch (error) {
        res.status(400).send(error.message)
    }
})
 
videogamesRouter.post('/', async (req,res) => {
try {
    const created = await postGame(req.body);
    res.status(200).send(created)

} catch (error) {
    res.status(400).send(error.message);
}
});

videogamesRouter.delete('/:id', async (req,res) => {
    try {
        const deleted = await deleteGame(req.params);
        res.status(200).json(deleted);
        
    } catch (error) {
        res.status(400).send(`Error: ${error.message}`);
    }
});


module.exports = videogamesRouter;