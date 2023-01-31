import React from "react";
import style from  './Landing.module.css';
import { Link } from "react-router-dom";

const Landing = () => {
    React.useEffect(() => {
        document.title = 'Welcome';
      }, []);
      
    return (    
        <div className={style.landing_div} >

            <h1 className={style.header_welcome}> Welcome </h1>

            <Link className={style.link} to="/home">
                <button className={style.btn_start}>Start</button>
            </Link>

        </div>
    )
};

export default Landing;