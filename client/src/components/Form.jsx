import React, { useEffect, useState } from "react";
import { postActivity, getNameCountries, getActivities } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import { SmallCountry } from "./SmallCountry";
import '../styles/Form.css'
import { Actividad } from "./Actividad";


const Form = () => {
  const countries = useSelector((state) => state.countries);
  const [inputName, setInputName] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const dispatch = useDispatch();
  

  useEffect(() => {
    setCurrentPage(0);
  }, [countries]);

  useEffect (()=>{
      dispatch(getActivities());
  },[dispatch])

  const filteredC = countries.slice(currentPage, currentPage + 7);
  
  const [error, setError] = useState({
      nombre: "Minimo 4 letras",
      dificultad: "Minimo 1",
      duracion:"Minimo 1",
      temporada:"Campo obligatorio"
  })

  const [dataForm, setDataForm] = useState({
    nombre: "",
    dificultad: 0,
    duracion: 0,
    temporada: "",
    countryId: [],
  });

  const stateReset = () => {
    setDataForm({
      nombre: "",
      dificultad: 0,
      duracion: 0,
      temporada: "",
      countryId: [],

    });

    setError({
      nombre: "Minimo 4 letras",
      dificultad: "Minimo 1",
      duracion:"Minimo 1",
      temporada:"Campo obligatorio"
    })

    setInputName("");
  };

  const submitInputName = (e) => {
    e.preventDefault();

    

    setInputName(e.target.value);
  };

  const setDataHandler = (e) => {
    e.preventDefault();

    if([e.target.name] !== "dificultad" || "duracion" || "temporada"){
    if(e.target.value.length >= 3){
      setError({
        ...error,
        [e.target.name]: "Correcto",
      });
  
    }
    }

    if([e.target.name] === "dificultad" || "duracion"){
      if(e.target.value >= 1){
        setError({
          ...error,
        [e.target.name]: "Correcto",
        });
      }

      
    }


    setDataForm({
      ...dataForm,
      [e.target.name]: e.target.value,
    });
  };



  

  const setIdHandler = (e) => {
    e.preventDefault();

    

    setDataForm({
      ...dataForm,
      countryId: dataForm.countryId.concat(e.target.value),
    });
    
    alert("Pais agregado");
  };



  useEffect(() => {
    dispatch(getNameCountries(inputName));
  }, [inputName]);

  const submitForm = (e) => {
    e.preventDefault();
    var form = true;

    if (dataForm["nombre"].length < 2) {
      form = false;
    } else if (!dataForm["countryId"].length >= 1) {
      form = false;
    }

    if (form) {
      dispatch(postActivity(dataForm))
        .then(() => stateReset())
        .then(() => alert("Actividad agregada"));
    } else {
      return alert(" A tu actividad le faltan detalles");
    }


  };

  return (
    <div  >
      <div className="agregar-actividad"> Agregar Actividad</div>
      <div className="form">
        <form onSubmit={(e) => submitForm(e)} className="form">

        <div className="nombre">
            <label className="titulo-form">Seleccionar Paises</label>
            <input
              className="input-form"
              type="text"
              autocomplete="off"
              placeholder="Buscá el pais"
              onChange={submitInputName}
             
            />
            {dataForm.countryId.length === 0 ?
            <div>
              Campo obligatorio
            </div>
            : 
            <div>
              Correcto 
            </div>
            }
          </div>


          <div className="nombre">
          <label className="titulo-form">Nombre</label>
            <input
              id="nombre-actividad"
              className="input-form"
              type="text"
              autocomplete="off"
              placeholder="Nombre de la actividad"
              name="nombre"
              value={dataForm.name}
              onChange={setDataHandler}
              required minLength="4" maxLength="20"
            />
            {
              error.nombre !== "" ? 

            <div>
              { error.nombre}
            </div>
            :
              <div>
                { error.nombre}
              </div>

            }    
            
          </div>
          

          <div className="nombre">
            <label className="titulo-form">Seleccionar dificultad</label>
            <input
        
             className="input-form"
              name="dificultad"
              value={dataForm.dificultad}
              id="dificultad"
              onChange={setDataHandler}
              min="1" max="5"
              type="number"
            />

            {
              error.dificultad.length > 1  ? 
                <div>
                  {error.dificultad}
                </div>
                : 
                <div>
                {error.dificultad}
              </div>

            } 
          </div>




          <div className="nombre">
            <label className="titulo-form">Duración en horas</label>
            <input
             className="input-form"
              name="duracion"
              value={dataForm.duracion}
              id="duracion"
              onChange={setDataHandler}
              min="1" max="24"
              type="number"
    
            />

            {
              error.duracion.length > 1  ? 
                <div>
                  {error.duracion}
                </div>
                : 
                <div>
                {error.duracion}
              </div>

            } 
          
          </div>

          <div className="nombre">
            <label className="titulo-form">Seleccionar Temporada</label>
            <select
             className="input-form"
              name="temporada"
              value={dataForm.temporada}
              id="temporada"
              onChange={setDataHandler}
              required
              pattern="[Oo]toño|[Pp]rimavera|[Vv]erano|[Ii]nvierno"    
            >
            <option value="Otoño">Otoño</option>
              <option value="Invierno">Inviero</option>
              <option value="Primavera">Primavera</option>
              <option value="Verano">Verano</option>
            </select>

          {
              error.temporada !== "" ? 

            <div>
              { error.temporada}
            </div>
            :
              <div>
                { error.temporada}
              </div>

            }    
          </div>

          <div>
            <input className="input-form-boton" type="submit" value="Agregar actividad" />
          </div>
        
        
        </form>
      </div>

<div className="conteiner-form-elegir">
     <div className="paises-elegir">
        {
        dataForm.countryId.length === 0 &&
        filteredC.length < 30
          ? filteredC.map((c) => (
              <div>
                <div className="smallcountry">
                  <SmallCountry key={c.id} nombre={c.nombre} bandera={c.bandera} />
                  <button
                  
                    className="boton-agregar"
                    onClick={setIdHandler}
                    value={c.id}
                    name="countryId"
                    
                  >
                    +
                  </button>
                </div>
                
              </div>
             
            ) )
           
          : console.log("...")}

          
      
      </div>

      <div className='actividad'>
        <h1 className="actividades-disponibles" style={{color:"white"}}>Actividad</h1>
          { dataForm ? 
            
            <Actividad
            nombre={dataForm.nombre}
            duracion={dataForm.duracion}
            dificultad={dataForm.dificultad}
            temporada={dataForm.temporada}
            paises={dataForm.countryId}
      
            />
             : (
            <h3  className="actividades-disponibles">No se encontraron actividades</h3>
            
          )}
          <div className="texto-country-id" style={{color:"white"}}><div>Pais:</div><div style={{color:"white"}}>
          { dataForm.countryId?.length > 0 ? (
            dataForm.countryId?.map((pais) =>
            <div>
           {pais}
            </div>  
            )) : (
            <div className="texto-country-id">Sin pais agregado</div>
            
          )}
          
          </div></div>
        </div>

  </div>    

    </div>
  );
};

export default Form;