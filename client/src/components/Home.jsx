import React from "react";
import "../styles/Home.css"

export function Home(){

    return(
        <div className="fondo">
            <div className="countriesApp">Countries App</div>
            <div>
            <button className="buttonStart"><a className="start" href="/paises" >Start</a></button>
            </div>
        </div>
    )
}