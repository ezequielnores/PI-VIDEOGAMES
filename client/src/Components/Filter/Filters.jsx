import React from "react";
import style from './Filters.module.css';
import { useDispatch, useSelector } from "react-redux";
import { filterByGenre, filterByRatingDecrement, filterByRatingAscendent, showAll, filterByCreated, filterByExisting, filterAlphabeticAscendent, filterAlphabeticDecrement } from "../../redux/actions";

const Filters = ({ index, setIndex }) => {
    const stateGenres = useSelector(state => state.genres);
    const stateFiltered = useSelector(state => state.filtered)
    const dispatch = useDispatch();   
    const[selected, setSelected] = React.useState({ genres: "", filter_existing:"", filter_order:"" })

    const genreOnChangeHandler = (event) => {
        setSelected({ genres: event.target.value, filter_existing:"", filter_order:""}); ///////////// ACAAA SELECTED

        if(event.target.value === 'ALL') return dispatch(showAll());
        event.preventDefault();
        setIndex(prev => 0);
        dispatch(filterByGenre(event.target.value));        
    };

    const OnChangeHandler = (event) => {
        setSelected({ ...selected, filter_order: event.target.value });
        setIndex((prev) => 0);
        
            if( Array.isArray(stateFiltered) && stateFiltered.length !== 0 ){
                switch (event.target.value) {
                    case 'ALL': return dispatch( showAll() );
                    case "Better Rankeds" : return dispatch( filterByRatingDecrement() );
                    case "Less Rankeds" :return dispatch( filterByRatingAscendent() );
                    case 'Z-A': return dispatch( filterAlphabeticDecrement() );
                    case 'A-Z': return dispatch( filterAlphabeticAscendent() );
                    default: break;
                };
            }
    };

    const filterByExistent = (event) => {
        setSelected({  filter_existing: event.target.value, filter_order:"", genres:"" });
        
        switch (event.target.value) {
            case 'CREATED': return dispatch( filterByCreated() ); 
            case 'EXISTING': return  dispatch( filterByExisting() );
            case 'ALL': return dispatch( showAll() );       
            
            default: break;
        }
    }


    const resetFilteredState = () => {
        setSelected(prev => {
            return {
                filter_existing : "ALL",
                filter_order:"ALL",
                genres: 'ALL'                
            }
        });
        dispatch( showAll());
    };

    return (
        <div>
            <div>
                    <button className={style.btn_all_games} onClick={() => resetFilteredState() }>Show all games</button>

                    <select className={style.all_select} name="GENRES" id="search-by-genre" value={selected.genres}  onChange={genreOnChangeHandler}>
                        <option value="ALL"> Genres </option>
                        {
                            stateGenres.map((genre) => <option value={genre.name} key={genre.id} > {genre.name} </option>)
                        }
                    </select>

                    <select className={style.all_select} name="FILTER_EXISTING" id="search-by-existing" value={selected.filter_existing} onChange={filterByExistent}>
                        <option key='1' value="ALL"> All </option>
                        <option key='2' value="CREATED"> Created </option>
                        <option key='3' value="EXISTING"> Existing </option>

                    </select>

                    <select className={style.all_select} name="FILTER_ORDER" id="search-by-order" value={selected.filter_order} onChange={OnChangeHandler}>
                        <option key='1' value="ALL"> Order By </option>
                        <option key='2' value="Better Rankeds"> Better Rankeds </option>
                        <option key='3' value="Less Rankeds"> Less Rankeds </option>
                        <option key='4' value="A-Z"> A - Z </option>
                        <option key='5' value="Z-A"> Z - A </option>
                    </select>
                </div>
        </div>
    )
};

export default Filters;