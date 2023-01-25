import React from "react";
import './Home.css';
import VideogamesContainer from "../VideogamesContainer/VideogamesContainer.jsx";
import SearchBar from "../SearchBar/SearchBar";
import { useDispatch, useSelector } from "react-redux";
import { filterByGenre, filterByExistingOrCreated } from "../../redux/actions";

const  Home = () => {
    const stateGenres = useSelector(state => state.genres);
    const dispatch = useDispatch();
    const[index, setIndex] = React.useState(0);

    const genreOnChangeHandler = (event) => {
        event.preventDefault();
        setIndex(prev => 0);
        dispatch(filterByGenre(event.target.value));        
    };

    const createdOnChangeHandler = (event) => {
        event.preventDefault();
        setIndex(prev => 0);
        dispatch(filterByExistingOrCreated(event.target.value));
    };
    
        return (
            <div> 
                <SearchBar  index={index} setIndex={setIndex} />
                <div>
                    <select name="GENRES" id="search-by-genre"  onChange={genreOnChangeHandler}>
                            <option value="All"> Genres </option>
                    {
                        stateGenres.map((genre) => <option value={genre.name} key={genre.id} > {genre.name} </option>)
                    }
                    </select>

                    <select name="FILTER" id="search-by-existing" onChange={createdOnChangeHandler}>

                        <option key='1' value="ALL"> All </option>
                        <option key='2' value="CREATED"> Created </option>
                        <option key='3' value="EXISTING"> Existing </option>
                    </select>
                </div>
                <VideogamesContainer index={index} setIndex={setIndex}  />
            </div>
        )
    

};

export default Home;