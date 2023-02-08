import React from "react";
import style from './Favorites.module.css'
import { useSelector } from 'react-redux';
import Videogame from '../Videogame/Videogame.jsx'


const Favorites = () => {
    const favorites = useSelector(state => state.favorites);

    if(favorites.length === 0){
        return (
            <div className={style.h1}>
                <h1>
                    Any favorites added
                </h1>
            </div>
        )
    }

    return (
        <div className={style.div_container}>
            { favorites.map(obj => <Videogame id={obj.id} key={obj.id} name={obj.name} genres={obj.genres} imgn={obj.imgn} rating={obj.rating} />  )}
        </div>
    )
};

export default Favorites;