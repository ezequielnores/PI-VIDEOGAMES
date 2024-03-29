import React from "react";
import { Link } from "react-router-dom";
import style from './NavBar.module.css'

const NavBar = () => {
    return (
        <nav className={style.nav_container}>
            <div>
                <h1 className={style.h1}> Videogames App </h1>
            </div>
            <div>
                
                    <Link to='/home'  className={style.option_menu}> Home </Link>
                
                    <Link to='/home/create' className={style.option_menu}> Create </Link>

                    <Link to='/home/favorites'  className={style.option_menu}> Favorites </Link>
                
            </div>
        </nav>
    )
};

export default NavBar;