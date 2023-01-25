import React from "react";
import './Detail.css';
import { getGamesById, deleteStateById } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";

const Detail = ({ id }) => {
    const dispatch = useDispatch();
    const gameById = useSelector(state => state.getById);

    React.useEffect(() => {
        dispatch( getGamesById(id) );
        
        return () => {
            dispatch(deleteStateById())
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if(typeof(gameById) === 'string'){
        return(
        <div>
        { gameById }
       </div>

        ) 
    }

    if(gameById.length === 0){
    return (
        <div>
        <h2>wait please...</h2>
       </div>
    )    
    }
    
    if(gameById.length > 0){
    return (
        <div>
        <p>{gameById[0].name}</p>
        <p>{gameById[0].genres}</p>
        <p>{gameById[0].description}</p>
        <img src={gameById[0].img} alt="icons" />
       </div>
    )    
    }
};

export default Detail;