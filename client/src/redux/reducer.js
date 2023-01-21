import { GET_GAMES, GET_GENRES } from './actions';

const initialState = {
    games: [],
    filtered: [],
    genres: [],
    getByName: [],
    getById: [],

};

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_GAMES: return {
            ...state,
            games: action.payload,
            filtered: action.payload,
        };

        case GET_GENRES: return {
            ...state,
            genres: action.payload,
        }
    
        default: return {
            ...state
        }
    }
};

export default reducer;