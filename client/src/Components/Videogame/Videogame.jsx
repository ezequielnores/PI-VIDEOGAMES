import React from "react";
import './Videogame.css'

const Videogame = ({ id, name, genres, imgn }) => {
    
    return (
        <div>
            { imgn ? <img src={imgn} alt="videogame" className="imagen-home" /> : <img className="imagen-home" src="https://blog.ida.cl/wp-content/uploads/sites/5/2020/05/ida-uxvideojuegos-blog-768x551.png" alt="icon" /> }
            <p> {name} </p>
            <p> { genres.join(", ") } </p>
        </div>
    )
};

export default Videogame;