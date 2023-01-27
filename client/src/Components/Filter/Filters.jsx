import React from "react";
import './Filters.css';
import { useDispatch, useSelector } from "react-redux";
import { filterByGenre, filterByRatingDecrement, filterByRatingAscendent, showAll, filterByCreated, filterByExisting, filterAlphabeticAscendent, filterAlphabeticDecrement } from "../../redux/actions";

const Filters = ({ index, setIndex }) => {
    const stateGenres = useSelector(state => state.genres);
    const dispatch = useDispatch();

    const genreOnChangeHandler = (event) => {
        if(event.target.value === 'ALL') return dispatch(showAll());
        event.preventDefault();
        setIndex(prev => 0);
        dispatch(filterByGenre(event.target.value));        
    };

    const OnChangeHandler = (event) => {
        setIndex((prev) => 0);
            switch (event.target.value) {
                case 'CREATED': return dispatch( filterByCreated() ); 
                case 'EXISTING': return  dispatch( filterByExisting() );
                case 'ALL': return dispatch( showAll() );       
                case "Better Rankeds" : return dispatch( filterByRatingDecrement() );
                case "Less Rankeds" :return dispatch( filterByRatingAscendent() );
                case 'Z-A': return dispatch( filterAlphabeticDecrement() );
                case 'A-Z': return dispatch( filterAlphabeticAscendent() );
                default: break;
            };
    };
    return (
        <div>
            <div>
                    <select name="GENRES" id="search-by-genre"  onChange={genreOnChangeHandler}>
                            <option value="ALL"> Genres </option>
                    {
                        stateGenres.map((genre) => <option value={genre.name} key={genre.id} > {genre.name} </option>)
                    }
                    </select>

                    <select name="FILTER_EXISTING" id="search-by-existing" onChange={OnChangeHandler}>
                        <option key='1' value="ALL"> All </option>
                        <option key='2' value="CREATED"> Created </option>
                        <option key='3' value="EXISTING"> Existing </option>

                    </select>

                    <select name="FILTER" id="search-by-existing" onChange={OnChangeHandler}>
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