import React from "react";
import './SearchBar.css';
import { useDispatch } from "react-redux";
import { getGameByName, cleanStateFilter } from "../../redux/actions.js";

const SearchBar = ({ index, setIndex }) => {
    const dispatch = useDispatch();
    const[input, setInput] = React.useState('') 

    const inputChangeHandler = (event) => {
        event.preventDefault()
        setInput((prev) => event.target.value)
    };

    const SearchHandler = (e) => {
        e.preventDefault();
        setIndex(prev => 0)
        dispatch(cleanStateFilter());
        dispatch(getGameByName(input));
        setInput(prev => '');
    };

    return (
        <div>
            <form >
                <input type="text" value={input} onChange={inputChangeHandler}/>
                <input type="submit" name='Search' onClick={SearchHandler} />
            </form>
            
        </div>
    )
};

export default SearchBar;