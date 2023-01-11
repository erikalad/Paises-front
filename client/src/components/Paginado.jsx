import React from "react";
import '../styles/Paginado.css'


export default function Paginado ({ countriesPerPage, allCountries, currentPage,setCurrentPage }) {
    const pageNumbers = [];
    const pageSecToFinish = allCountries - 9;
    pageNumbers.push(1);
   
    

    for (let i=2; i<=Math.ceil(pageSecToFinish/8.7); i++) {
        pageNumbers.push(i);
    }

    const paginated = (pageNumber) => {
        setCurrentPage(pageNumber);
      
    }



    return(
        <div className="paginado-conteiner">


            
            <ul className="paginado-clase">
            <button className="boton-paginado" onClick={() =>
                 pageNumbers && 
                 paginated(currentPage-1)}>{'<<'}</button> 
                { pageNumbers && 
                pageNumbers.map(n => (
                    <li className='number' key={n}>      
                        
                        <button className="boton-paginado" onClick={() => 
                            pageNumbers.length>0 && 
                            paginated(n)}>{n}</button> 
                       
                    </li> 
                ))}
                 <button className="boton-paginado"  onClick={() => 
                    pageNumbers && paginated(currentPage+1)}>{'>>'}</button> 
            </ul>
            
        </div>
    )
}