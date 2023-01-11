import '../styles/Actividad.css'
import React from "react";



export const Actividad = ({nombre,duracion, temporada, dificultad,paises}) => {
   
  


    return (
        <div >
            <div>
            
            
                <div className="titulo-country-id">{nombre}</div>
                <hr></hr>
                <div className="texto-country-id"><div>Duracion:</div><div> {duracion} hs</div></div>
                <div className="texto-country-id"><div>Temporada: </div><div>{temporada}</div></div>
                <div className="texto-country-id"><div>Dificultad: </div><div>{dificultad}</div></div>
       {/*  <div className="texto-country-id" ><div>Pais:</div><div>
          { paises?.length > 0 ? (
            paises?.map((pais) =>
            <div>
           {pais}
            </div>  
            )) : (
            <div className="texto-country-id">Sin pais agregado</div>
            
          )}
          
          </div></div> */}
            </div>
        </div>
     
    )
}