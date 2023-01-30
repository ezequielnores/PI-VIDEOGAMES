import React from "react";
import style from './Create.module.css';
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios';
import { getGames } from '../../redux/actions.js';

const Create = () => {
    const dispatch = useDispatch();
    const stateGenres = useSelector(state => state.genres);
    const platformas = useSelector(state => state.platforms);
    const namesGames = useSelector(state => state.namesGames);
    
    const[disableButton, setDisableButton] = React.useState(true)

    const[date, setDate] = React.useState({
        year: '',
        month: '',
        day: '',
    });

    const[form, setForm] = React.useState({
        name: "",
        description: "",
        released: "",
        rating: "0.1",
        genre: [],
        platforms: [],
    });

    const[error, setError] = React.useState({
        name: "",
        description: "",
        released: "",
        rating: "",
        genre: "",
        platforms: "",
    });
    
    const deleteGenres = (id) => {
        setForm({ ...form, genre: form.genre.filter(obj => obj.id !== id) });
    }

    const handleSelectGenres = (e) => {
        const{ id, name } = { id: e.target.value.split(',')[0], name: e.target.value.split(',')[1] }
        const genres = form.genre.map(obj => obj.name); // crea una lista solo con los nombres de los generos

        if( ! genres.includes(name) ){ // comprueba si en esa lista existe el name recibido por parametro
            setForm({
                ...form,
                genre: [...form.genre, { id: parseInt(id), name }]
            });
            setError({...error, genre: ""});
        } else {
            setError({ ...error, genre: `${name} is already selected` });
        };
    };
    
    const platformsHandler = (e) => {
        if(! form.platforms.includes(e.target.value) ){
            setForm({
                ...form,
                platforms: [...form.platforms, e.target.value]
            });
            setError({...error, platforms: ""})
        }else{
            setError({ ...error, platforms: `${e.target.value} is already selected` });
        }
    };
    
    const deletePlatform = (platformName) => {
        setForm({ ...form, platforms: form.platforms.filter(platform => platform !== platformName) })
    };

    const onSubmitHandler = () => {
        axios.post('http://localhost:3001/videogames', {
            ...form,
            released: form.released.split('-').reverse().join('/'),
            genre: form.genre.map(obj => obj.id),
            rating: parseFloat(form.rating)
        })
        .then(()=>  alert(`${form.name} were created succesfully`))
        .catch(error => alert(`Error: ${error.message}`))

        dispatch(getGames());
    };

    const handleFormInputs = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });
        validateForm({ ...form, [event.target.name]: event.target.value }, event.target.name);
    };

    const validateForm = (form, name) => {
        console.log(name);
        if(name === 'name'){
            if(! namesGames.includes( form[name].toLowerCase() ) )   setError({ ...error, name:""});
            else setError({ ...error, [name]: `${form[name]} already exist` });
            if(/\W/.test( form[name].split(' ').join('') ))   setError({ ...error, name: 'Sorry, simbols are not allowed' }); // BORRA ESPACIOS, Y COMPRUEBA SI CONTIENE SIMBOLOS 
            if(form[name] === "") setError({ ...error, name: 'Name is a required field' });
        };
        
        if(name === 'description'){
            setError({ ...error, description: ''})
            if(form[name] === "") setError({ ...error, description: 'Description is a required field' });
        };

        if(name === 'date'){
            
            const { day, month, year } = { day: parseInt(form.day), month: parseInt(form.month), year: parseInt(form.year) };
            const dat = new Date();
            const accDate = { day: dat.getDate(), month: dat.getMonth() + 1, year: dat.getFullYear()}
           
            if(year > accDate.year){
                setError({ ...error, released: 'invalid Date' })
            };
            if(year === accDate.year){
                
            }
                
            
        };
    };

    const dateHandler = (e) => {
        
        setDate({ ...date, [e.target.name]: e.target.value });

        if(date.day || date.year || date.month) setForm({...form, released: `${date.day}/${date.month}/${date.year}`});

        validateForm({ ...date, [e.target.name]: e.target.value }, 'date');
    };
    
    return (
        <div className={style.div_container}>
            
                <div>
                    <form className={style.form_inputs} id="form-inputs"> 

                            <div>
                                <label htmlFor="name">Name: </label>
                                <input name='name' placeholder="name" type="text" value={form.name} onChange={ handleFormInputs } />
                            </div>
                            {error.name}

                            <div>
                                <label htmlFor="description">Description: </label>
                                <input name='description' placeholder="description" type="text" value={form.description} onChange={ handleFormInputs } />
                            </div>
                            { error.description }

                            <div>
                                <label htmlFor="released">Released: </label>
                                <input className={style.date_only} type="number" placeholder="dd" name="day" value={date.day} onChange={dateHandler} min='0' max='31' /> / 
                                <input className={style.date_only} type="number" placeholder="mm" name="month" value={date.month} onChange={dateHandler} min='1' max='12' /> / 
                                <input className={style.date_only} type="numbers" placeholder="yyyy" name="year" value={date.year} onChange={dateHandler} min='1950' max='2023' />
                            </div>
                            { error.released }

                            <div>
                                <label htmlFor="rating">Rating: </label>
                                <input name='rating' type="range" value={form.rating}  min="0.1" max="5" step='0.1' onChange={ handleFormInputs } />   <div>{ form.rating } ⭐</div>
                            </div>
                            { error.rating }

                    </form>
                </div>

                <div>
                    <select name="genres" id="genres" onChange={handleSelectGenres} >
                        <option value="Genres" id ='genresDefault'  > Genres </option>
                        {
                            stateGenres.map((genre) => <option value={[genre.id, genre.name]} key={genre.id} > { genre.name } </option> )
                        }
                    </select>

                    <div>{ error.genre }</div>  {/* ERROR GENRE */}

                     { form.genre.length !== 0 && form.genre.map((genre) => <div key={genre.id}  > {genre.name} <button onClick={() => deleteGenres(genre.id)}>X</button> </div>) }

                </div> 

                <div>
                    <select name="platforms" id="platforms" onChange={platformsHandler} >
                        <option value="Platforms">Platforms</option>
                        {
                            platformas.map(platform => <option key={platform} value={platform} > { platform } </option>)
                        }
                    </select>
                        <div>{error.platforms}</div>
                    { form.platforms.map(platform => <div key={platform} > {platform}  <button onClick={() => deletePlatform(platform)} >X</button> </div>) }

                </div>
                <div>
                <button disabled={disableButton} onClick={onSubmitHandler} > Create </button>
                </div>
        </div>
    )
};

export default Create;