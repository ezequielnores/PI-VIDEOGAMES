import { 
    GET_GAMES, 
    GET_GENRES, 
    GET_GAME_BY_ID, 
    GET_GAME_BY_NAME, 
    DELETE_STATE_BY_ID, 
    FILTER_BY_GENRE, 
    FILTER_RATING_ASCENDENT, 
    FILTER_RATING_DECREMENT, 
    FILTER_BY_CREATED, 
    FILTER_BY_EXISTING, 
    SHOW_ALL,
    FILTER_ALPHABETIC_ASCENDENT,
    FILTER_ALPHABETIC_DECREMENT,
    GET_PLATFORMS,
    CLEAN_STATE_FILTERED
} from './actions';

    const DESCENDENT = 'DESCENDENT';
    const ASCENDENT = 'ASCENDENT';

    const initialState = {
        games: [],
        filtered: [],
        genres: [],
        getByName: [],
        getById: [],
        platforms: [],
        namesGames: [],
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
    const planeArray = (array) => {
        return array.reduce((acc, el) => acc = [ ...acc, ...el ], [] );
    };

    // const ratingOrderDecrement = (array) => {
    //         if(array.length < 1) return array;
    //         let right = []; 
    //         let left = []; 
    //         let pivote = array[0];

    //         for(let i = 1; i < array.length; i++){ 
    //             if(pivote.rating > array[i].rating) left.push(array[i]);
    //             else right.push(array[i]);
    //         };
    //         return [].concat(ratingOrderDecrement(right), pivote, ratingOrderDecrement(left));
    // }; 

    const ratingOrder = (array, option ) => {

            if(array.length < 1) return array;

            const right = [];  
            const left = []; 
            const pivote = array[0];

        for(let i = 1; i < array.length; i++){
            if(pivote.rating > array[i].rating) left.push(array[i]);
            else right.push(array[i]);
        };

        if(option === 'ASCENDENT'){
            return [].concat(ratingOrder(left, option), pivote, ratingOrder(right, option));
        }
        if(option === 'DESCENDENT'){
            return [].concat(ratingOrder(right, option), pivote, ratingOrder(left, option));
        }
    };
    
    


    const alphabeticOrderDecrement = (array) => {
        if(array.length < 1) return array;
        const right = [];
        const left = [];
        const pivote = array[0];

        for(let i = 1; i < array.length; i++){
          if(pivote.name[0] > array[i].name[0]){
              left.push(array[i])
          }else{
            right.push(array[i])
          }
        }
        
        return [].concat(alphabeticOrderDecrement(right), pivote, alphabeticOrderDecrement(left));
    };
    const alphabeticOrderAscendent = (array) => {
        if(array.length < 1) return array;
        let right = [];
        let left = [];
        let pivote = array[0];

        for(let i = 1; i < array.length; i++){
          if(pivote.name[0] > array[i].name[0]) left.push(array[i]);
          else right.push(array[i]);
        }
        return [].concat(alphabeticOrderAscendent(left), pivote, alphabeticOrderAscendent(right));
    };

    
    switch (action.type) {

        case GET_GAMES: {
            const cleaned = [];
            if(typeof(action.payload) !== 'string'){
                const allPlatforms = action.payload.reduce(( acc, el ) => acc = [...acc, ...el.platforms], []);
                allPlatforms.forEach( (platform) => {
                    if(! cleaned.includes(platform)) cleaned.push(platform)
                });
            };            
            return {
            ...state,
            games: action.payload,
            filtered: divideStateForPagination(action.payload),
            platforms: cleaned,
            namesGames: action.payload.map(game => game.name.toLowerCase())
        };
}
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

        case FILTER_BY_GENRE: {
            const filteredByGenre = state.games.filter(game => game.genres.includes(action.payload));
            const verification = filteredByGenre.length === 0 ? `Sorry, cant find any ${action.payload} games.` : divideStateForPagination(filteredByGenre) ; 
            return { ...state, filtered: verification  };
        };

        case FILTER_BY_CREATED: {
                const response = state.games.filter(game => game.created === true);
                return { 
                    ...state, 
                    filtered: response.length === 0 ? `Sorry, you haven${"'"}t created any yet.` : divideStateForPagination(response) 
                };
        };

        case FILTER_BY_EXISTING: { 
            const response = state.games.filter(game => game.created === false);
            return {  ...state, filtered: divideStateForPagination(response)  };
        };

        case SHOW_ALL: return  {
                ...state,
                filtered: divideStateForPagination(state.games)
        };


        case FILTER_RATING_ASCENDENT: {
            const plane = planeArray(state.filtered);
            const response = ratingOrder(plane, ASCENDENT);
              return {
                ...state,
                filtered: divideStateForPagination(response),
              }
        };

        case FILTER_RATING_DECREMENT: {
              const plane = planeArray(state.filtered);
              const response = ratingOrder(plane, DESCENDENT)
            return {
                ...state,
                filtered: divideStateForPagination(response)
            };
        };

        case FILTER_ALPHABETIC_ASCENDENT: {
            const plane = planeArray(state.filtered);
            const order = alphabeticOrderAscendent(plane);
            return {
                ...state,
                filtered: divideStateForPagination(order)
            };
        }
        case FILTER_ALPHABETIC_DECREMENT: {
            const plane = planeArray(state.filtered);
            const order = alphabeticOrderDecrement(plane);
            return {
                ...state,
                filtered: divideStateForPagination(order)
            };
        };

        case GET_PLATFORMS: {
            const cleaned = [];
            const allPlatforms = state.games.reduce(( acc, el ) => acc = [...acc, ...el.platforms] ,[]);
            allPlatforms.forEach(platform => {
                if(! cleaned.includes(platform)) cleaned.push(platform)
            });
            return {
                ...state,
                platforms: cleaned
            };
        };

        case CLEAN_STATE_FILTERED: return {
            ...state,
            filtered: []
        };

        default: return {
            ...state
        };
    };
};

export default reducer;