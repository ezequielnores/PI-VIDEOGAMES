import React from "react";
import './Home.css';
import VideogamesContainer from "../VideogamesContainer/VideogamesContainer.jsx";
import SearchBar from "../SearchBar/SearchBar";
import { useDispatch } from "react-redux";
import { showAll } from "../../redux/actions";
import Filters from "../Filter/Filters";

const  Home = () => {
    const dispatch = useDispatch();
    const[index, setIndex] = React.useState(0);   
    
        return (
            <div> 
                <button onClick={() => dispatch(showAll())}>Show all games</button>
                <SearchBar  index={index} setIndex={setIndex} />
                <Filters index={index} setIndex={setIndex}/>
                <VideogamesContainer index={index} setIndex={setIndex}  />
            </div>
        );
};

export default Home;