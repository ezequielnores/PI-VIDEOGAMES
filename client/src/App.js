import './App.css';
import { useEffect } from 'react';
import { Route, useLocation } from 'react-router-dom';
import Home from './Components/Home/Home.jsx';
import Landing from './Components/Landing/Landing.jsx';
import SearchBar from './Components/SearchBar/SearchBar';
import { useDispatch } from 'react-redux';
import { getGames, getGenres } from './redux/actions';
import Detail from './Components/Detail/Detail.jsx';

function App() {
  const dispatch = useDispatch();

    useEffect(() => {
      dispatch(getGames());
      dispatch(getGenres());
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const { pathname } = useLocation();

  return (
    <div className="App">
      
      { pathname === '/' ? <Route exact path='/' component={ Landing } /> : null }

      <Route path='/home' component={ SearchBar } />

      <Route exact path='/home' render={ () => <Home /> } />

      <Route exact path='/home/detail/:id' render={( { match } ) => <Detail  id={ match.params.id } />} />

    </div>
  );
};

export default App;
