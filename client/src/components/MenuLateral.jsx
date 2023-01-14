import React from "react";
import "../styles/Menu.css"
import { getActivities, getNameCountries } from '../actions';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCountries, filterCountriesByContinent, orderByName, filterByPopulation , filterCountriesByActivities} from '../actions';
import Card from './Card.jsx';
import Paginado from './Paginado';

export function MenuLateral(){
    const dispatch = useDispatch();
    const allCountries = useSelector((state) => state.countries);
    const activities = useSelector((state) => state.activities);
    const[orden, setOrden] = useState ('');
    const[currentPage, setCurrentPage] = useState(1);
    const [countriesPerPage, setCountriesPerPage] = useState (9);
    const indexOfLastCountry = currentPage * countriesPerPage;
    const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
    const currentCountries = allCountries.slice(indexOfFirstCountry, indexOfLastCountry);
    const[continent, setContinent] = useState('All');
    const[name, setName] = useState('');
    const[order, setOrder] = useState('');


    const pageValidation = (currentPage) => {
        if(currentPage ===1) {
            return setCountriesPerPage(9);
        } else {
            return setCountriesPerPage(9);
        }
    }

    useEffect( () => {
        pageValidation(currentPage);
    }, [currentPage])


    useEffect (()=>{
        dispatch(getCountries());
    },[dispatch])

    
    useEffect (()=>{
        dispatch(getActivities());
    },[dispatch])
   
    

    function onClickRadio(e){
        setContinent(e.target.value)
    }



    function onClickRadioOrder(e){
        setOrder(e.target.value)
    }


    function handleFilterContinent(e) {
        dispatch(filterCountriesByContinent(e.target.value)); //va a tomar como payload el valor de cada uno de los value de las option del select
    }



    function handleSort (e) {
        dispatch(orderByName(e.target.value));
        setCurrentPage(1); // cuando hago el ordenamiento lo hago desde la pagina 1, 
        setOrden(`Ordenado ${e.target.value}`) // setOrden es un estado local que en un inicio va a estar vacio, para cuando seteo en la pagina 1, me modifica el estado local y renderiza
    };

    function handleSortPop (e) {
        dispatch(filterByPopulation(e.target.value));
        setCurrentPage(1); // cuando hago el ordenamiento lo hago desde la pagina 1, 
        setOrden(`Ordenado ${e.target.value}`) // setOrden es un estado local que en un inicio va a estar vacio, para cuando seteo en la pagina 1, me modifica el estado local y renderiza
    };

    function handleActivities (e) {
        dispatch(filterCountriesByActivities(e.target.value));
        setCurrentPage(1); // cuando hago el ordenamiento lo hago desde la pagina 1, 
        setOrden(`Ordenado ${e.target.value}`) // setOrden es un estado local que en un inicio va a estar vacio, para cuando seteo en la pagina 1, me modifica el estado local y renderiza
    };
    

        //tengo que guardar en mi estado local, lo que vaya apareciendo en el input 
    function handleInputChange(e) {
            e.preventDefault();
            setName(e.target.value);
            
    } 
    
  /*   function handleSubmit(e) {
            e.preventDefault();
            setName(e.target.value);
            
            dispatch(getNameCountries(e.target.value)); //en el estado local name voy a ir guardando lo que vaya tipeando el usuario
        } */

        const handleSubmit = (e) => {
            e.preventDefault();
            setName(e.target.value);
          };

        useEffect(() => {
            dispatch(getNameCountries(name));
          }, [name]);


    

    return(
        <div>
        <div className="menu">
        
        
         {/*----MENU LATERAL-----*/} 
        <div className="menudefiltros">

        <div className="menu-buscador-input">
            <p className="menu-title">Nombre del pais</p>
            <div>
                <input className="menu-buscador"onClick = {(e) => handleSubmit(e)} type = 'text' placeholder = 'Ingrese el pais que quiere buscar' onChange={handleInputChange} />            
            </div>
            
            {/* {console.log(error.data)} */}
        <br></br>
       
        </div>
        <div className="menu-buscador-input-cont">
            <p className="menu-title">Filtro por continente</p>
        <div>
            <div className="menu-input"><input type = 'radio' checked={continent === 'All' ? true : false} onClick={e => onClickRadio(e)} onChange={e => handleFilterContinent(e)} value = 'All'/><p className="menu-p">Todos los paises</p></div>
            <div className="menu-input"><input type = 'radio' checked={continent === 'Africa' ? true : false} onClick={e => onClickRadio(e)}onChange={e => handleFilterContinent(e)} value = 'Africa'/><p className="menu-p">África</p></div>
            <div className="menu-input"><input type = 'radio' checked={continent === 'Americas' ? true : false} onClick={e => onClickRadio(e)}onChange={e => handleFilterContinent(e)} value = 'Americas'/><p className="menu-p">América</p></div>
            <div className="menu-input"><input type = 'radio' checked={continent === 'Asia' ? true : false} onClick={e => onClickRadio(e)}onChange={e => handleFilterContinent(e)} value = 'Asia'/><p className="menu-p">Asia</p></div>  
            <div className="menu-input"><input type = 'radio' checked={continent === 'Europe' ? true : false} onClick={e => onClickRadio(e)}onChange={e => handleFilterContinent(e)} value = 'Europe'/><p className="menu-p">Europa</p></div>   
            <div className="menu-input"><input type = 'radio' checked={continent === 'Oceania' ? true : false} onClick={e => onClickRadio(e)}onChange={e => handleFilterContinent(e)} value = 'Oceania'/><p className="menu-p">Oceania</p></div>           
        </div>
        </div>

        <div className="menu-buscador-input-gral">
            <p className="menu-title">Filtros general</p>
        <div>
            <div className="menu-input"><input type = 'radio' value = 'asc' checked={order === 'asc' ? true : false}  onClick={e => onClickRadioOrder(e)} onChange={e => handleSort(e)}/><p className="menu-p">Nombres ascendente</p></div>
            <div className="menu-input"><input type = 'radio' value = 'desc' checked={order === 'desc' ? true : false} onClick={e => onClickRadioOrder(e)} onChange={e => handleSort(e)}/><p className="menu-p">Nombres descendente</p></div>
            <div className="menu-input"><input type = 'radio' value = 'ascpop' checked={order === 'ascpop' ? true : false} onClick={e => onClickRadioOrder(e)} onChange={e => handleSortPop(e)}/><p className="menu-p">Mayor población</p></div>  
            <div className="menu-input"><input type = 'radio' value = 'descpop'checked={order === 'descpop' ? true : false} onClick={e => onClickRadioOrder(e)}  onChange={e => handleSortPop(e)}/><p className="menu-p">Menor población</p></div>           
            <div className="menu-input"><input type = 'radio' value = 'descpop'checked={order === 'descpop' ? true : false} onClick={e => onClickRadioOrder(e)}  onChange={e => handleSortPop(e)}/><p className="menu-p">Menor población</p></div>
        </div>


         {/*FILTRO POR ACTIVIDAD*/}
       {/*  <div >
            <p className="menu-title">Filtros por actividad</p>
        </div>

       
        
        <div>
            {console.log(activities)}
      { activities.map((c) => {
        let valor = c.nombre
            return(
                <li>
                    
                    <div className="menu-input"><input type = 'radio' value ={c.nombre} checked={order === valor ? true : false} onClick={e => onClickRadioOrder(e)}  onChange={e => handleActivities(e)}/><p className="menu-p">{c.nombre}</p></div>
                   
                </li>
            )
        })}
        </div> */}


        </div>
        </div>


    {/*----CARDS-----*/}
    <div className="container-paises">
    
        <div className="cards">
        { currentCountries?.map((c) => {
            return(
                <div >
                      
                        <Card poblacion={c.poblacion} nombre = { c.nombre } bandera = { c.bandera } region = { c.region } id = { c.id }/>
                </div>
            )
        })}
        </div>


          {/*----PAGINADO-----*/} 
    
    <div className="paginado">
                <Paginado
            countriesPerPage = { countriesPerPage }
            allCountries = { allCountries.length }
            currentPage = {currentPage}
            setCurrentPage={setCurrentPage}
            /> 
    </div>
    </div>
    </div>
</div>
    )
}