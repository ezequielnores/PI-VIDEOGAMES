import React from "react";
import './VideogamesContainer.css';
import Videogame from "../Videogame/Videogame.jsx";
import { useSelector } from 'react-redux';
import { useState } from "react";

const VideogamesContainer = () => {
    
    const[index, setIndex] = useState(0);

    const stateRedux = useSelector( state => state.filtered );

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

    if(stateRedux.length !== 0){
        return (
            <div className="container-videogames">                
                {
                    stateRedux.map((videogame) => {
                        if(videogame.created === true){
                            console.log(videogame);
                        }
                        return <Videogame 
                                id={videogame.id} 
                                name={videogame.name} 
                                genres={videogame.genres} 
                                imgn={videogame.img}
                                key={videogame.id}
                                />
                    })
                }

                <button onClick={() => setIndex(prev => prev - 1)} > {'<'} back </button>
                <button onClick={() => setIndex(prev => prev + 1)} > next {'>'} </button>
                
            </div>
        )
    };
};

export default VideogamesContainer;