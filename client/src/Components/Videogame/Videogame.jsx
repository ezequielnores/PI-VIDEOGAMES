import React from "react";
import style from './Videogame.module.css';
import { Link } from 'react-router-dom';

const Videogame = ({ id, name, genres, imgn, rating }) => {
    
    return (
        <Link className={style.link_container} to={`/home/detail/${id}`}>

            <div className={style.div_videogame_card}>

                { imgn ? <img src={imgn} alt="videogame" className={style.imagen_home} /> : <img className={style.imagen_home} src="https://virtualbackgrounds.site/wp-content/uploads/2020/07/super-mario-bros-level-ending.jpg" alt="icon" /> }
                <p> {name} </p>
                <p>Rating: {rating} </p>
                <p>Genres: { genres.join(", ") } </p>

            </div>
            
        </Link>
    )
};

export default Videogame;