import React from "react";
import './VideogamesContainer.css';
import Videogame from "../Videogame/Videogame.jsx";
import { useSelector } from 'react-redux';

const VideogamesContainer = ({ index, setIndex }) => {

    const stateRedux = useSelector( state => state.filtered );

    const paginationHandler = (action) => {
        switch(action){
            case '+': 
            setIndex(prev => prev + 1);
            break;

            case '-': 
            setIndex(prev => prev - 1);
            break;

            case '-1':
            setIndex(prev => stateRedux.length - 1);
            break;

            case '1': 
            setIndex(prev => 0);
            break;

            default: return 'noting';
        }
    };

    if( typeof( stateRedux ) === 'string' ){
        return (
            <div>
                <h2>{ stateRedux }</h2>
            </div>
        )
    };

    if(stateRedux.length === 0){
        return (
            <div>
                <h2>Wait a second please</h2>
            </div>
        )
    };

    if(stateRedux.length > 0){
        return (
            <div className="container-videogames">                
                <div>
                    { index > 1 ?   <button onClick={() => paginationHandler('1')} > 1... </button>  :  null}{'<--'}
                    {  index === 0  ? null  : <button onClick={() => paginationHandler('-')} > {'<'} back </button>   }
                            <button> { index + 1 } </button>
                    {  index < stateRedux.length -1 ?  <button onClick={() => paginationHandler('+')} > next {'>'} </button> : null  }{'-->'}
                   { stateRedux.length - 2 > index ?   <button onClick={() => paginationHandler('-1')} >...{stateRedux.length}</button> : null }
                </div>

                <div className="videogame" >
                    {
                        stateRedux[index].map((videogame) => {
                            return <Videogame 
                                    id={videogame.id} 
                                    name={videogame.name} 
                                    genres={videogame.genres} 
                                    imgn={videogame.img}
                                    key={videogame.id}
                                    />
                        })
                    }
                </div>
                
            </div>
        )
    };
};

export default VideogamesContainer;