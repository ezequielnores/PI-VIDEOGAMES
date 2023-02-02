import React from "react";
import style from './Home.module.css';
import VideogamesContainer from "../VideogamesContainer/VideogamesContainer.jsx";
import SearchBar from "../SearchBar/SearchBar";
import Filters from "../Filter/Filters";

const  Home = ({ index, setIndex }) => {
   
     
    
    React.useEffect(() => {
        document.title = 'Home';
      }, []);

        return (
            <div className={style.home_container}> 
            
                <div className={style.div_filters_container}>
                    <Filters index={index} setIndex={setIndex}/>
                    <SearchBar  index={index} setIndex={setIndex} />
                </div>

                    <hr  style={{ color: "red", backgroundColor: "#161b22", height: 2, border: 'none' }}  />

                    <VideogamesContainer index={index} setIndex={setIndex}  />

            </div>
        );
};

export default Home;