import axios from 'axios';
export const GET_GAMES = 'GET_GAMES';
export const GET_GENRES = 'GET_GENRES';
export const GET_GAME_BY_ID = 'GET_GAME_BY_ID'; 
export const GET_GAME_BY_NAME = 'GET_GAME_BY_NAME'; 
export const DELETE_STATE_BY_ID = 'DELETE_STATE_BY_ID'; 
export const FILTER_BY_GENRE = 'FILTER_BY_GENRE'; 
export const FILTER_RATING_ASCENDENT = 'FILTER_RATING_ASCENDENT'; 
export const FILTER_RATING_DECREMENT = 'FILTER_RATING_DECREMENT'; 
export const SHOW_ALL = 'SHOW_ALL'; 
export const FILTER_BY_EXISTING = 'FILTER_BY_EXISTING'; 
export const FILTER_BY_CREATED = 'FILTER_BY_CREATED'; 
export const FILTER_ALPHABETIC_DECREMENT = 'FILTER_ALPHABETIC_DECREMENT'; 
export const FILTER_ALPHABETIC_ASCENDENT = 'FILTER_ALPHABETIC_ASCENDENT'; 
export const GET_PLATFORMS = 'GET_PLATFORMS'; 
export const CLEAN_STATE_FILTERED = 'CLEAN_STATE_FILTERED'; 
export const ADD_FAVORITES = 'ADD_FAVORITES'; 
export const ALL_GAMES_AGAIN = 'ALL_GAMES_AGAIN'; 



export const getGames = () => {
     return async function(dispatch){
        await axios.get('/videogames')
            .then(response => dispatch({ type: GET_GAMES , payload: response.data }))
            .catch(error => dispatch({ type: GET_GAMES , payload: `Error: ${error.message}, please reload the page` }))
    };
};

export const getAllGamesAgain=()=> {
    return function(dispatch){
        axios.get('/videogames')
        .then(response => dispatch({ type: ALL_GAMES_AGAIN, payload: response.data }))
    }
}

export const getGenres = () => {
    return async function(dispatch){
        await axios.get('/genres')
            .then(response => dispatch({ type: GET_GENRES, payload: response.data }));
    };
};

export const getGamesById =  (id) => {
    return async function(dispatch){
       await axios.get(`/videogames/${id}`)
        .then(response => dispatch({ type: GET_GAME_BY_ID, payload: response.data }))
        .catch((error) => dispatch({ type: GET_GAME_BY_ID, payload: `Error: ${error.message}`}))
    }
};

export const getGameByName = (name) => {
    return async function(dispatch){
        await axios.get(`/videogames?name=${name}`)
        .then( (response) => dispatch({ type: GET_GAME_BY_NAME, payload: response.data }) )
        .catch((error) => dispatch({ type: GET_GAME_BY_NAME, payload: `Error: ${error.message}` }));
    }
};

export const deleteStateById = () => {
    return { type: DELETE_STATE_BY_ID  };
}

export const filterByGenre = (genre_name) => {
    return { type: FILTER_BY_GENRE, payload: genre_name }
};


export const filterByCreated = () => {
    return { type: FILTER_BY_CREATED };
};
export const filterByExisting = () => {
    return { type: FILTER_BY_EXISTING };
};
export const showAll = () => {
    return { type: SHOW_ALL };
};




export const filterByRatingDecrement = () => {
    return { type: FILTER_RATING_DECREMENT };
};
export const filterByRatingAscendent = () => {
    return { type: FILTER_RATING_ASCENDENT };
};



export const filterAlphabeticDecrement = () => {
    return { type: FILTER_ALPHABETIC_DECREMENT };
};
export const filterAlphabeticAscendent = () => {
    return { type: FILTER_ALPHABETIC_ASCENDENT };
};

export const cleanStateFilter = () => {
    return { type: CLEAN_STATE_FILTERED };
};


export const addFavorites = (game)  => {
    return { type: ADD_FAVORITES, payload: game }
};
