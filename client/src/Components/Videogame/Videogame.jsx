import React from "react";
import './Videogame.css';
import { Link } from 'react-router-dom';

const Videogame = ({ id, name, genres, imgn, rating }) => {
    
    return (
        <Link to={`/home/detail/${id}`}>
            <div className="videogame-card">
                { imgn ? <img src={imgn} alt="videogame" className="imagen-home" /> : <img className="imagen-home" src="https://blog.ida.cl/wp-content/uploads/sites/5/2020/05/ida-uxvideojuegos-blog-768x551.png" alt="icon" /> }
                <p> {name} </p>
                <p> {rating} </p>
            { typeof(genres[0]) === 'string'  ? <p> { genres.join(", ") } </p> : genres.map(obj => obj.name).join(', ')  }
            </div>
        </Link>
    )
};

export default Videogame;