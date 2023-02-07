import React from "react";
import style from './Favorites.module.css'
import { useSelector } from 'react-redux';
import Videogame from '../Videogame/Videogame.jsx'


const Favorites = () => {
    const favorites = useSelector(state => state.favorites);

    return (
        <div>
            { favorites.map(obj => <Videogame id={obj.id} key={obj.id} name={obj.name} genres={obj.genres} imgn={obj.img} rating={obj.rating} />  )}
        </div>
    )
};

export default Favorites;