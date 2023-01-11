import './App.css';
import { Route, BrowserRouter } from "react-router-dom";
import { Home } from './components/Home';
import { Paises } from './components/Paises';
import Form from './components/Form';
import { Nav } from './components/Nav';
import CountryId from './components/CountryId';
import Actividades from './components/Actividades';





function App() {
  return (
    
    <div className="App">
      <BrowserRouter>

      <Route exact path="/" >
      <Home/>
      </Route>

      <Route exact path="/paises">
      <Paises/>
      </Route>

      <Route exact path="/countries/:id">
      <Nav/>
      <CountryId/>
      </Route>
      
      <Route path ="/actividades">
      <Nav/>
      <Form/>
      </Route>

      <Route path ="/actividades-creadas">
      <Nav/>
      <Actividades/>
      </Route>

      </BrowserRouter>


      
    </div>
  );
}

export default App;
