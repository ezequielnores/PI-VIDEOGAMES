import axios from 'axios';
export const GET_GAMES = 'GET_GAMES';
export const GET_GENRES = 'GET_GENRES';
export const GET_GAME_BY_ID = 'GET_GAME_BY_ID'; 
export const GET_GAME_BY_NAME = 'GET_GAME_BY_NAME'; 
export const DELETE_STATE_BY_ID = 'DELETE_STATE_BY_ID'; 
export const FILTER_BY_GENRE = 'FILTER_BY_GENRE'; 
export const FILTER_BY_EXISTING_OR_CREATED = 'FILTER_BY_EXISTING_OR_CREATED'; 

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

export const getGamesById =  (id) => {
    return async function(dispatch){
       await axios.get(`http://localhost:3001/videogames/${id}`)
        .then(response => dispatch({ type: GET_GAME_BY_ID, payload: response.data }))
    }
};

export const getGameByName = (name) => {
    return async function(dispatch){
        await axios.get(`http://localhost:3001/videogames?name=${name}`)
        .then( (response) => dispatch({ type: GET_GAME_BY_NAME, payload: response.data }) );
    }
};

export const deleteStateById = () => {
    return { type: DELETE_STATE_BY_ID  };
}

export const filterByGenre = (genre_name) => {
    return { type: FILTER_BY_GENRE, payload: genre_name }
};


export const filterByExistingOrCreated = (option) => {
    return { type: FILTER_BY_EXISTING_OR_CREATED, payload: option }
};
