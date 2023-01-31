import React from "react";
import style from './Detail.module.css';
import { getGamesById, deleteStateById, getGames, cleanStateFilter } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {Link} from 'react-router-dom';

const Detail = ({ id }) => {
    const dispatch = useDispatch();
    const gameById = useSelector(state => state.getById);
    
    React.useEffect(() => {
        dispatch( getGamesById(id) );
        document.title = 'Detail';
        
        return () => {
            dispatch(deleteStateById())
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const deleteGame = () => {
        dispatch(cleanStateFilter())
        axios.delete(`http://localhost:3001/videogames/${id}`)
            .then(response => {
                dispatch(getGames());
                alert(`${ response.data }`);
            })
            .catch(error => alert(`Error: ${error.message}`));
    };

    if(typeof(gameById) === 'string'){
        return(
        <div  className={style.other_options}>
            <div>
                <button className={style.go_back} onClick={() => window.history.back()} > Go Back </button>
            </div>
            
            <div>
                <h2> { gameById } </h2>
            </div>
       </div>

        ) 
    }

    if(gameById.length === 0){
    return (
        <div className={style.other_options}>
            <h2> Wait a moment please... </h2>
       </div>
    )}
    
    if(gameById.length > 0){
        return (
        <div className={style.div_master}>

                <div className={style.btn_container}>
                    <button className={style.go_back} onClick={() => window.history.back()} > Go Back </button>
                   
                  { gameById[0].created ? <Link to='/home'> <button className={style.delete_btn} onClick={deleteGame} > Delete </button> </Link> : null}
                    
                </div>


                <div className={style.detail_container} >

                        <div>
                            { gameById[0].img ? <img className={style.img} src={gameById[0].img} alt="icons" /> : <img className={style.img} src="https://virtualbackgrounds.site/wp-content/uploads/2020/07/super-mario-bros-level-ending.jpg" alt="icon" />}
                        </div>
                
                        <div className={style.div_information}>

                                <h2> { gameById[0].name } </h2>

                                <p> Genres: { gameById[0].genre.join(', ') }</p>

                                {/* <p> Description: { gameById[0].description }</p> */}

                                <div dangerouslySetInnerHTML={{ __html: gameById[0].description }} />
                            
                        </div>

                </div>
    </div>
        )
    }
};

export default Detail;