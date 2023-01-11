import React from "react";
import "../styles/Card.css"
import { Link } from "react-router-dom";

export default function Card({ nombre , bandera, region , id, poblacion }) {
    return (
        <div className="card">
           <div className="card-titulo"> 
            <img className="card-img" src = { bandera }  alt = 'Imagen no encontrada' />
            <h3 className="card-title">{ nombre }</h3> 
            </div>
            <div  className="texto-country-id-card"><p>Region:</p><p>{region}</p></div>
            <div  className="texto-country-id-card"><p>Poblacion:</p><p>{poblacion} Hab.</p></div>
            <button className="boton-card"> <Link to={`/countries/${id}`}>Ver Detalle</Link></button>
        </div>
    );
}


