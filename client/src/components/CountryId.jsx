import { useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import {  useParams } from "react-router-dom";
import { getCountryDetails } from "../actions";
import '../styles/CountyId.css'
import { Actividad } from "./Actividad";


const CountryId = () => {
  const countryDetail = useSelector((state) => state.details);
  
  const dispatch = useDispatch();
 


  

  let { id } = useParams();
  useEffect(() => {
    dispatch(getCountryDetails(id));
  }, [id]);


 

 


 

  return (
    <div className="country">
      <div>

        <div className="titulo-country-id">
          <img className="img-country-id" src={countryDetail.bandera} alt="No img" />
          <h1>{countryDetail.nombre}</h1>
        </div>
        <div className="conteiner-detalle-actividad">
        <div className="detalle-country-id">
        <h1>Detalle del pais</h1>
        <div  className="texto-country-id"><p>Código:</p><p>{countryDetail.id}</p></div>
        <div  className="texto-country-id"><p>Región:</p><p>{countryDetail.region}</p></div>
        <div  className="texto-country-id"><p>Subregión: </p><p>{countryDetail.subregion}</p></div>
        <div  className="texto-country-id"><p>Capital: </p><p>{countryDetail.capital}</p></div>
        <div  className="texto-country-id"><p>Área: </p><p>{countryDetail.area} Km2</p></div>
        <div  className="texto-country-id"> <p>Población:</p><p> {countryDetail.poblacion} Hab. </p></div>
        </div>
        <div className='actividad'>
        <h1 className="actividades-disponibles">Actividades disponibles</h1>
          { countryDetail.activities?.length > 0 ? (
            countryDetail.activities?.map((activity, index) =>
            <Actividad 
            key={index}
            nombre={activity.nombre}
            duracion={activity.duracion}
            dificultad={activity.dificultad}
            temporada={activity.temporada}
            />
            )) : (
            <h3  className="actividades-disponibles">No se encontraron actividades</h3>
            
          )}
    
        </div>
        </div>
        </div>
      
      
    </div>
  );
};
export default CountryId;