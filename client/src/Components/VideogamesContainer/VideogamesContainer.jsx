import React from "react";
import style from './VideogamesContainer.module.css';
import Videogame from "../Videogame/Videogame.jsx";
import { useSelector } from 'react-redux';

const VideogamesContainer = ({ index, setIndex }) => {

    const stateRedux = useSelector( state => state.filtered );

    const paginationHandler = (action) => {
        switch(action){
            case '+': 
            setIndex(prev => prev + 1);
            break;

            case '-': 
            setIndex(prev => prev - 1);
            break;

            case '-1':
            setIndex(prev => stateRedux.length - 1);
            break;

            case '1': 
            setIndex(prev => 0);
            break;

            default: return 'noting';
        }
    };



    if( typeof( stateRedux ) === 'string' ){
        return (
            <div className={style.other_options} >
                <h2>{ stateRedux }</h2>
            </div>
        )
    };

    if(stateRedux.length === 0 && Array.isArray(stateRedux)){
        return (
            <div className={style.other_options}>
                <h2>Wait a second please</h2>
            </div>
        )
    };

    if(stateRedux.length > 0 && Array.isArray(stateRedux)){
        return (
            <div className={style.div_all_videogames_container}>   


                <div className={style.container_videogames} >
                    {
                        stateRedux[index].map((videogame) => {
                            return <Videogame 
                                    id={videogame.id} 
                                    name={videogame.name} 
                                    genres={videogame.genres} 
                                    imgn={videogame.img}
                                    key={videogame.id}
                                    rating={videogame.rating}
                                    />
                        })
                    }
                </div>

                <div className={style.btn_pagination_container}>

                    <button className={style.btn_pagination} onClick={() => paginationHandler('1')} > 1 </button> ......
                        {  index === 0  ? null  : <button className={style.btn_pagination} onClick={() => paginationHandler('-')} > back </button>   }
                            <button disabled={true} className={style.btn_pagination} > { index + 1 } </button>
                        {  index < stateRedux.length -1 ?  <button className={style.btn_pagination} onClick={() => paginationHandler('+')} > next </button> : null  }{'......'}
                    <button className={style.btn_pagination} onClick={() => paginationHandler('-1')} >{stateRedux.length}</button>

                </div>
                
            </div>
        )
    };
};

export default VideogamesContainer;