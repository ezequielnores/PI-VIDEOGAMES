import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <div>
                    <h2>Soy NavBar</h2>
            <div>
                
                    <Link to='/home'> Home </Link>
                
                    <Link to='/home/create'> Create </Link>
                
            </div>
        </div>
    )
};

export default NavBar;