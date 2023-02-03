const axios = require('axios');
const { Op } = require('sequelize')
require('dotenv').config();
const { API_KEY } = process.env;
const { Videogame, Genre } = require('../db.js');

const responseTransformer = (array) => {
    
    if(Array.isArray(array) && array.length === 0) return array;
    if(typeof array === 'string ') return array;
    
    return array.map(videogame => {
       console.log({ genres : videogame.genres, })
        return {
            id:videogame.id,
            name: videogame.name,
            rating: videogame.rating,
            img: videogame.background_image,
            released: videogame.released,
            platforms: Array.isArray(videogame.platforms) ?  videogame.platforms.map(obj => obj.platform.name) : [],
            genres:  videogame.genres.length === 0 ? [] : videogame.genres.map(genre => genre.name),
            created: false
        }
    });
};

const getAllGames = async() => {
    const response = await Promise.all([ getGamesFromDb(), getGamesFromApi()])
    return response[0].length === 0 ? response[1] : [ ...response[1], ...response[0] ];
};

const getGamesFromApi = async () => {
    let num = 1;  const endpoints = [];

    while(num < 6){
        endpoints.push(`https://api.rawg.io/api/games?key=${API_KEY}&page=${num}`);
        num = num + 1;
    };
   const response = await Promise.all( endpoints.map((endpoint) => axios.get(endpoint) ))
            .then(response => response.reduce(  (acc, element) =>  acc = [ ...acc, ...element.data.results ], [] ));       
            
    return responseTransformer(response);
};

const getGamesFromDb = async () => {
    const videogamesFromDb = await Videogame.findAll({ include: Genre });

    const response = videogamesFromDb.map(obj => {
        const videogame = obj.dataValues;
        return {
            id: videogame.id,
            name: videogame.name,
            description: videogame.description,
            rating: videogame.rating,
            released: videogame.released,
            platforms: videogame.platforms,
            genres: videogame.Genres.map(genre => genre.dataValues.name),
            created: videogame.created,
        }
    });
    return response;
};

const getGamesByName = async (name) => {
        const gamesByName = await Promise.all([ getGamesByNameFromBd(name), getGamesByNameFromApi(name)])
            .then(r => [ ...r[0], ...r[1] ]).catch(error => [error.message])
        
        return gamesByName.length > 0 ? gamesByName : 'Sorry, cant find that' ; 
};

const getGamesByNameFromApi = async (name) => {
                                                 // 'https://api.rawg.io/api/games?search=josias ezequiel nores&key=3dcc994cc37b4d09bff762888829af87'
    const videogamesByNameFromApi = await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`)
            .then( res =>  responseTransformer(res.data.results) )
            .catch((error) => {
                console.log(`ErrorApi: ${error.message}`);
                return `Errorapi: ${error.message}`
            });

    return videogamesByNameFromApi;
};

const getGamesByNameFromBd = async (name) => {

    const videogamesByNameFromDb = await Videogame.findAll({
        where: {
            name: {
                [Op.iLike]: `%${name}%`  
            }
        },
        include: { 
            model: Genre,
            attributes: [ 'name'],
            through: {
                attributes: []
            }
         }
    })
    .then(r => {
        console.log(r);
        return r.map(obj => {
            return {
                ...obj.dataValues,
                Genres: '' ,
                genres: obj.dataValues.Genres.map(genre => genre.dataValues.name)
            }
        })
    }).catch((error) => {
        console.log(`ErrorBDD: ${error.message}`);
        return `Errorbdd: ${error.message}`
    });
    return videogamesByNameFromDb;
}


const getGameById = async ({ id }) => {

        if(! /\D/.test(id) ){ //string
            const requestById = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`).then(res => {
                return [{
                        id: res.data.id,
                        name: res.data.name,
                        rating: res.data.rating,
                        img: res.data.background_image,
                        released: res.data.released,
                        platforms: res.data.platforms.map(obj => obj.platform.name),
                        genre: res.data.genres.map(genre => genre.name),
                        description: res.data.description,
                        created: false
                }];
            }).catch(err => 'Sorry, cant find that')
            
            return requestById;
        }

        else if( /\D/.test(id) && /\d/.test(id) ){  // si tiene numeros y letras, busca en la bd

            const response = await Videogame.findAll({
                where: { id: id },
                include: { model: Genre }
            }).catch(err => 'Sorry, cant find that');

            if(typeof(response) === 'string') return response;

            const getByIdFromDb = response.map(obj => {
                const videogame = obj.dataValues;
                return {
                    id:videogame.id,
                    name: videogame.name,
                    description: videogame.description,
                    rating: videogame.rating,
                    released: videogame.released,
                    platforms: videogame.platforms,
                    genre: videogame.Genres.map(genre => genre.dataValues.name),
                    created: videogame.created,
                }
            });
            return getByIdFromDb.length > 0  ? getByIdFromDb : 'Sorry, cant find that';
        };
        return 'Sorry, must entry a valid id';
};

const postGame = async ({ name, description, released, rating, platforms, genre }) => {
    if(!name || !description || !platforms) return 'Sorry, missing parameters';
    if(typeof(name) !== 'string' || typeof(description) !== 'string') return 'Sorry, name, description, must be strings';
    if(Array.isArray(platforms) === false) return 'Sorry, platforms must be an array';

    const posted = await Videogame.create({ name, description, released, platforms, rating })
        .catch(error => `Error: ${error.message}`);
    if(typeof(posted) !== 'string' && genre !== null) posted.addGenres(genre);
    return posted;
};

const deleteGame = async ( { id } ) => {

    const deleted = await Videogame.destroy({
        where: { id: id },
    }) 
    .catch(error => `Error: ${error.message}`);

    return typeof deleted === 'number' ? 'Deleted succesfully' : deleted ;
};


module.exports = {
    getGamesByName,
    getGameById,
    postGame,
    getAllGames,
    deleteGame,
    getGamesByNameFromApi,
    getGamesByNameFromBd
};