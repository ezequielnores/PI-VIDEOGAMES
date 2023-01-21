import axios from 'axios';
export const GET_GAMES = 'GET_GAMES';
export const GET_GENRES = 'GET_GENRES';

export const getGames = () => {
     return async function(dispatch){
        await axios.get('http://localhost:3001/videogames')
            .then(response => dispatch({ type: GET_GAMES , payload: response.data }));
    };
};

export const getGenres = () => {
    return async function(dispatch){
        await axios.get('http://localhost:3001/genres')
            .then(response => dispatch({ type: GET_GENRES, payload: response.data }));
    };
};