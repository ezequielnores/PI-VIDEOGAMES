import './App.css';
import { useEffect } from 'react';
import { Route, useLocation } from 'react-router-dom';
import Home from './Components/Home/Home.jsx';
import Landing from './Components/Landing/Landing.jsx';
import { useDispatch } from 'react-redux';
import { getGames, getGenres } from './redux/actions';
import Detail from './Components/Detail/Detail.jsx';
import NavBar from './Components/NavBar/NavBar.jsx';
import Create from './Components/Create/Create';
import Footer from './Components/Footer/Footer';

function App() {
  const dispatch = useDispatch();

    useEffect(() => {
      dispatch(getGames());
      dispatch(getGenres());
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // const { pathname } = useLocation();
    const location = useLocation();
    console.log(location);
  return (
    <div className="App">
      
      { location.pathname === '/' ? <Route exact path='/' component={ Landing } /> : null }

      <Route path='/home' component={ NavBar } />

      <Route exact path='/home' render={ () => <Home /> } />

      <Route exact path='/home/detail/:id' render={( { match } ) => <Detail  id={ match.params.id } />} />

      <Route exact path='/home/create' component={Create} />

      <Route path='/home' render={() => <Footer />} />
      
    </div>
  );
};

export default App;
