import { GET_GAMES, GET_GENRES ,GET_GAME_BY_ID, GET_GAME_BY_NAME, DELETE_STATE_BY_ID, FILTER_BY_GENRE, FILTER_BY_EXISTING_OR_CREATED } from './actions';

const initialState = {
    games: [],
    filtered: [],
    genres: [],
    getByName: [],
    getById: [],

};

const reducer = (state = initialState, action) => {
    
    const divideStateForPagination = (array) => {
        if( typeof(array) === 'string' ) return array;
        const response = []; 
        let actual = [];
    
        array.forEach((videogame) => {
            if( actual.length <= 15 ){
                actual.push( videogame );
            };
            if( actual.length === 15 ){
                response.push(actual);
                actual = [];
            };
            if( array[array.length - 1].id === videogame.id && actual.length > 0 ){
                response.push( actual );
            };
        });
        return response;
    };

    switch (action.type) {

        case GET_GAMES: return {
            ...state,
            games: action.payload,
            filtered: divideStateForPagination(action.payload),
        };

        case GET_GENRES: return {
            ...state,
            genres: action.payload,
        };

        case GET_GAME_BY_ID: return {
            ...state,
            getById: action.payload,
        };

        case GET_GAME_BY_NAME: return {
            ...state,
            getByName: action.payload,
            filtered: divideStateForPagination(action.payload)
        };

        case DELETE_STATE_BY_ID: return {
            ...state,
            getById: [],
        };

        case FILTER_BY_GENRE: 
            const filteredByGenre = action.payload === 'All'  ?  state.games :  state.games.filter(game => game.genres.includes(action.payload));
            const verification = filteredByGenre.length === 0 ? `Sorry, cant find any ${action.payload} games.` : divideStateForPagination(filteredByGenre) ; 
        return {
            ...state,
            filtered: verification,
        };

        case FILTER_BY_EXISTING_OR_CREATED: 
            let response = [];
                if(action.payload === 'CREATED'){
                    response =  state.games.filter(game => game.created === true);
                    response = response.length === 0 ? 'Sorry, you havent created any yet.' : divideStateForPagination(response); 
                }
                if(action.payload === 'EXISTING'){
                    response =  state.games.filter(game => game.created === false);
                    response = divideStateForPagination(response);
                }
                if(action.payload === 'ALL') {
                    response = divideStateForPagination(state.games);
                };
        return {
            ...state,
            filtered: response
        };

        default: return {
            ...state
        };
    };
};

export default reducer;