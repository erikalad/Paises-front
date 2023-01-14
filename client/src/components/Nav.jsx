import React from "react";
import "../styles/Nav.css";
import { Link } from "react-router-dom";

export function Nav(){

    return(
        <div className="nav">
            
            <div className="nav-entero">
            <p className="nav-countriesApp">Countries App</p>
            <ul className="nav-li">
            <li className="nav-li">
            <Link className="nav-li nav-a home" to='/'>Inicio</Link>
            </li>
            <li className="nav-li">
            <Link className="nav-li nav-a" to='/paises'>Paises</Link>
            </li>
            <li className="nav-li">
            <Link className="nav-li nav-a" to='/actividades'>Nueva Actividad</Link>
            </li>
            <li className="nav-li">
            <Link className="nav-li nav-a" to='/actividades-creadas'>Actividades</Link>
            </li>
            </ul>
            </div>
        </div>
    )
}