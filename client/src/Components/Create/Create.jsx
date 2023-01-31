import React from "react";
import style from './Create.module.css';
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios';
import { getGames } from '../../redux/actions.js';

const Create = () => {

    React.useEffect(() => {
        document.title = 'Create Videogame!';
      }, []);

    console.log('reset');
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

    const[selected, setSelected] = React.useState({
        genres:"",
        platforms:""
    })

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
        platforms: ""
    });
    
    const onSubmitHandler = () => {

                if( form.name.length === 0 || form.description.length === 0  || form.released.length === 0 || form.genre.length === 0 || form.platforms.length === 0){
                    alert('Incomplete Form');
                }
                else{
                    axios.post('http://localhost:3001/videogames', {
                        ...form,
                        released: form.released.split('-').reverse().join('/'),
                        genre: form.genre.map(obj => obj.id),
                        rating: parseFloat(form.rating)
                    })
                    .then(() =>  {
                        alert(`${form.name} were created succesfully`)
                        dispatch(getGames());
                        setForm({ name: "", description:"", released: "", rating: "0.1", genre:[], platforms:[] });
                        setDate({ day: "", year: "", month:"" });
                        setSelected({ platforms:"", genres:""});
                    }).catch(error => alert(`Error: ${error.message}`));
        
        };
    };





    const handleSelectGenres = (e) => {
        setSelected({ ...selected, genres: e.target.value })
        const{ id, name } = { id: e.target.value.split(',')[0], name: e.target.value.split(',')[1] }
        const genres = form.genre.map(obj => obj.name); // crea una lista solo con los nombres de los generos

        if( ! genres.includes(name) ){ // comprueba si en esa lista existe el name recibido por parametro
            setForm({
                ...form,
                genre: [...form.genre, { id: parseInt(id), name }]
            });
            setError({...error, genre: ""});
            handleCreateButton({...error, genre: ""});

        } else {
            setError({ ...error, genre: `${name} is already selected` });
            handleCreateButton({ ...error, genre: `${name} is already selected` });
        };
        
    };
    
    const platformsHandler = (e) => {
        setSelected({ ...selected, platforms: e.target.value });
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

    const handleFormInputs = (event) => {

        setForm({ ...form, [event.target.name]: event.target.value });
        validateForm({ ...form, [event.target.name]: event.target.value }, event.target.name);

        handleCreateButton(error);
    };

    const dateHandler = (e) => {
        setDate({ ...date, [e.target.name]: e.target.value });

        if(date.day && date.year && date.month) setForm({...form, released: `${date.day}/${date.month}/${date.year}`});

        validateForm({ ...date, [e.target.name]: e.target.value }, 'date');
        handleCreateButton({ ...error });
    };


    
    const deletePlatform = (platformName) => {
        setForm({ ...form, platforms: form.platforms.filter(platform => platform !== platformName) })
    };
    const deleteGenres = (id) => {
        setForm({ ...form, genre: form.genre.filter(obj => obj.id !== id) });
    };



   

    const validateForm = (form, name) => {
    
        if(name === 'name'){
            if(! namesGames.includes( form[name].toLowerCase() ) ) setError((prev) => {
                return { ...error, name:""}
            })
            else setError((prev) => {
                return { ...error, [name]: `${form[name]} already exist` };
            });
            
            if(/\W/.test( form[name].split(' ').join('') ))   setError((prev) => {
                return { ...error, name: 'Sorry, simbols are not allowed' } // BORRA ESPACIOS, Y COMPRUEBA SI CONTIENE SIMBOLOS 
            });

            if(form[name] === "") setError((prev) => { 
                return{  ...error, name: 'Name is a required field' };
             });
           
           
        };
        
        if(name === 'description'){
            setError({ ...error, description: ''})
            if(form[name] === "") setError((prev) => { 
               return{  ...error, description: 'Description is a required field' } 
            });
            
        };

        if(name === 'date'){
            let condition = false;
            const { day, month, year } = { day: parseInt(form.day), month: parseInt(form.month), year: parseInt(form.year) };
            const dat = new Date();
            const accDate = { day: dat.getDate(), month: dat.getMonth() + 1, year: dat.getFullYear()}
           
            if(year > accDate.year || year < 1950) condition = true;
            if(year === accDate.year && month > accDate.month) condition = true;
            if(year === accDate.year && month === accDate.month && day > accDate.day) condition = true;
            if(month > 12 || month < 1) condition = true;
            if(day > 31 || day < 1 ) condition = true;
            if(!day || !month || !year) condition = true;
            
            if(condition === true) setError((prev) => {
                return { ...error, released: 'invalid Date' }
            })
            else setError((prev) => {
                return { ...error, released: '' }
            });
        };
        handleCreateButton({ ...error });
    };   

    const handleCreateButton = (error) => {
        let condition = false;
        
        for (const key in error) {
            if(error[key] !== '') condition = true;
        };

        setDisableButton((prev) => condition);
    };

    return (
        <div className={style.div_container}>
            
                <div className={style.div_subcontainer}>
                    <form className={style.form_inputs} id="form-inputs"> 

                            <div>
                                <label  htmlFor="name"> Name: </label>
                                <input className={style.input_name_description} name='name' placeholder="name" type="text" value={form.name} onChange={ handleFormInputs } />
                            </div>
                            {error.name}

                            <div>
                                <label htmlFor="description">Description: </label>
                                <input className={style.input_name_description}  name='description' placeholder="description" type="text" value={form.description} onChange={ handleFormInputs } />
                            </div>
                            { error.description }

                            <div>
                                <label htmlFor="released">Released: </label>
                                <input className={style.date_only} type="number" placeholder="dd" name="day" value={date.day} onChange={dateHandler} min='0' max='31' /> / 
                                <input className={style.date_only} type="number" placeholder="mm" name="month" value={date.month} onChange={dateHandler} min='1' max='12' /> / 
                                <input className={style.date_only} type="number" placeholder="yyyy" name="year" value={date.year} onChange={dateHandler} min='1950' max='2023' />
                            </div>
                            { error.released }

                            <div>
                                <label htmlFor="rating">Rating: </label>
                                <input className={style.rating} name='rating' type="range" value={form.rating}  min="0.1" max="5" step='0.1' onChange={ handleFormInputs } />   <div>{ form.rating } ⭐</div>
                            </div>
                            { error.rating }

                    </form>
                </div>



                <div className={style.div_subcontainer}>
                        <select value={selected.genres}  className={style.select_options}  name="genres" id="genres" onChange={handleSelectGenres} >
                            <option value="Genres" id ='genresDefault'  > Genres </option>
                            {
                                stateGenres.map((genre) => <option value={[genre.id, genre.name]} key={genre.id} > { genre.name } </option> )
                            }
                        </select>

                        <div>{ error.genre }</div>  
                            <div className={style.container_selecteds}>
                                { form.genre.length !== 0 && form.genre.map((genre) => <div className={style.array_selected} key={genre.id}  > {genre.name} <button className={style.btn_close} onClick={() => deleteGenres(genre.id)}>X</button> </div>) }
                            </div>
                </div> 

                <div className={style.div_subcontainer}>
                        <select value={selected.platforms} className={style.select_options} name="platforms" id="platforms" onChange={platformsHandler} >
                            <option value="Platforms">Platforms</option>
                            {
                                platformas.map(platform => <option key={platform} value={platform} > { platform } </option>)
                            }
                        </select>
                            <div>{error.platforms}</div>

                            <div className={style.container_selecteds}>
                                { form.platforms.map(platform => <div className={style.array_selected} key={platform} > {platform}  <button className={style.btn_close}  onClick={() => deletePlatform(platform)} >X</button> </div>) }
                            </div>
                </div>

                <div className={style.div_subcontainer}>
                        <button className={style.btn_create} disabled={ disableButton } onClick={onSubmitHandler} > Create </button>
                        <div> { error.incomplete } </div>
                </div>

        </div>
    )
};

export default Create;