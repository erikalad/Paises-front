import React from "react";
import "../styles/Paises.css"
import { MenuLateral } from "./MenuLateral";
import { Nav } from "./Nav";


export function Paises(){

    return(
        <div className="paises">
        <Nav/>
        <MenuLateral/>
        </div>
    )
}