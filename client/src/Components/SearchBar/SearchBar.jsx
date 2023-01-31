import React from "react";
import style from './SearchBar.module.css';
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
                <input className={style.input_search } placeholder="Name" type="text" value={input} onChange={inputChangeHandler}/>
                <input className={style.btn_search} type="submit" name='Search' value='Search' onClick={SearchHandler} />
            </form>
            
        </div>
    )
};

export default SearchBar;