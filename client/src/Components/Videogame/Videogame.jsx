import React from "react";
import style from './Videogame.module.css';
import { Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { addFavorites } from "../../redux/actions";

const Videogame = ({ id, name, genres, imgn, rating }) => {
    const dispatch = useDispatch();

    return (
        // <Link className={style.link_container} to={`/home/detail/${id}`}>

            <div className={style.div_videogame_card}>
                
                <div className={style.container}>

                    <button onClick={() => dispatch(addFavorites({ id, name, genres, imgn, rating })) }>+⭐</button>

                    { imgn ? <img src={imgn} alt="videogame" className={style.imagen_home} /> : <img className={style.imagen_home} src="https://virtualbackgrounds.site/wp-content/uploads/2020/07/super-mario-bros-level-ending.jpg" alt="icon" /> }

                </div>

                <Link  to={`/home/detail/${id}`} className={style.link_to_detail}> <p>{name}</p> </Link>

                <p>Rating: {rating} </p>

                <p>Genres: { genres.join(", ") } </p>

            </div>
    )
};

export default Videogame;