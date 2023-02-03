import React from "react";
import style from './Footer.module.css';
import { useSelector } from "react-redux";
import { useLocation } from 'react-router-dom';

const Footer = () => {
    const{ pathname } = useLocation();
    const stateFiltered = useSelector(state => state.filtered);

    return (
        <footer className={ (Array.isArray(stateFiltered[0]) && stateFiltered[0].length > 4 ) || (pathname.includes('/home/create')) || pathname.includes('/home/detail') ?  style.footer_container : style.footer_raro}>
            <h3 className={style.name_h2}> Author: Josias Ezequiel Nores</h3>
        </footer> 
    )
};

export default Footer;