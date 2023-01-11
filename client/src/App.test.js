import { configure, mount, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import React from "react";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import App from "./App"
import Actividades from './components/Actividades.jsx';
import { Nav } from './components/Nav';
import { Home } from './components/Home';
import CountryId from './components/CountryId';
import Form from './components/Form';
import { MenuLateral } from './components/MenuLateral';
import { Paises } from './components/Paises';
configure({ adapter: new Adapter() });

jest.mock('../src/components/Actividad', () => () => <></>)
jest.mock('../src/components/Actividades', () => () => <></>);
jest.mock('../src/components/Nav', () => () => <></>);
jest.mock('../src/components/CountryId', () => () => <></>);
jest.mock('../src/components/Card', () => () => <></>);
jest.mock('../src/components/Form', () => () => <></>);
jest.mock('../src/components/MenuLateral', () => () => <></>);
jest.mock('../src/components/Paginado', () => () => <></>);
jest.mock('../src/components/Paises', () => () => <></>);
jest.mock('../src/components/SmallCountry', () => () => <></>);

describe("<App />", () => {

  let store;
  const routes = ["/", "countries/:id", "/actividades", "/actividades-creadas", "/paises"];
  const mockStore = configureStore([thunk]);
  const state = {
    countries : [],
    allCountries : [],
    activities : [],
    details: []
  };



  store = mockStore(state);

  const componentToUse = (route) => {
    return (
      <Provider store={store}>
        <MemoryRouter initialEntries={[route]}>
          <App />
        </MemoryRouter>
      </Provider>
    );
  };
  describe("Nav:", () => {
    it('Debería ser renderizado en la ruta "/actividades"', () => {
  

      const wrapper = shallow(<App />);
      expect(wrapper.find(Nav)).toHaveLength(1);
    /*   const app = mount(componentToUse(routes[0]));
      expect(app.find(Nav)).toHaveLength(1); */
    });

    xit('Debería ser renderizado en la ruta "/actividades"', () => {
      const app = mount(componentToUse(routes[1]));
      expect(app.find(Nav)).toHaveLength(1);
    });
    xit('Debería ser renderizado en la ruta "/actividades-creadas"', () => {
      const app = mount(componentToUse(routes[2]));
      expect(app.find(Nav)).toHaveLength(1);
    });
  });

  xdescribe("Home:", () => {
    it('El componente "Home" se debería renderizar solamente en la ruta "/"', () => {
      const app = mount(componentToUse(routes[0]));
      expect(app.find(Nav)).toHaveLength(0);
      expect(app.find(Form)).toHaveLength(0);
      expect(app.find(MenuLateral)).toHaveLength(0);
      expect(app.find(Home)).toHaveLength(1);
    });
    it('El componente "Home" no deberia mostrarse en ninguna otra ruta', () => {
      const app = mount(componentToUse(routes[0]));
      expect(app.find(Home)).toHaveLength(1);

      const app2 = mount(componentToUse(routes[1]));
      expect(app2.find(Home)).toHaveLength(0);

      const app3 = mount(componentToUse(routes[2]));
      expect(app3.find(Home)).toHaveLength(0);

      const app4 = mount(componentToUse(routes[3]));
      expect(app4.find(Home)).toHaveLength(0);

      const app5 = mount(componentToUse(routes[4]));
      expect(app5.find(Home)).toHaveLength(0);
    });
  });

  xdescribe("CountryId:", () => {
    it('La ruta "/countries/:id" deberia mostrar solo el componente CountryId y Nav', () => {
      const app = mount(componentToUse(routes[1]));
      expect(app.find(CountryId)).toHaveLength(1);
      expect(app.find(Home)).toHaveLength(0);
      expect(app.find(Form)).toHaveLength(0);
      expect(app.find(MenuLateral)).toHaveLength(0);
    });
  });

  xdescribe("Form:", () => {
    it('La ruta "/actividades" deberia mostrar solo el componente Form y Nav', () => {
      const app = mount(componentToUse(routes[2]));
      expect(app.find(Form)).toHaveLength(1);
      expect(app.find(Nav)).toHaveLength(1);
      expect(app.find(Home)).toHaveLength(0);
      expect(app.find(MenuLateral)).toHaveLength(0);
    });
  });

  xdescribe("Actividades:", () => {
    it("La ruta '/actividades-creadas' deberia mostrar solo el componente Actividades y Nav", () => {
      const app = mount(componentToUse(routes[3]));
      expect(app.find(Actividades)).toHaveLength(1);
      expect(app.find(Nav)).toHaveLength(1);
      expect(app.find(Home)).toHaveLength(0);
      expect(app.find(MenuLateral)).toHaveLength(0);
    });
  });

  xdescribe("Paises:", () => {
    it("La ruta '/paises' deberia mostrar solo el componente Paises", () => {
      const app = mount(componentToUse(routes[4]));
      expect(app.find(Paises)).toHaveLength(1);
      expect(app.find(Nav)).toHaveLength(0);
      expect(app.find(Form)).toHaveLength(0);
      expect(app.find(CountryId)).toHaveLength(0);
    });
  });

  describe("Clases:", () => {
    it("En el componente Form debemos encontrar las clases nombre y form", () => {
    const wrapper = shallow(<Form />);
    expect(wrapper.find('.nombre')).toHaveLength(5);
    expect(wrapper.find('.form')).toHaveLength(2);
    });
  });  
  
  
  describe("Div:", () => {
    it("En el componente Form debemos encontrar las clases nombre y form", () => {
  const wrapper = shallow(<Form />);

  expect(wrapper.props().bam).toEqual(false);
  expect(wrapper.instance()).toBeInstance(App);
  expect(wrapper.children().at(0).type()).toEqual('div');
  expect(wrapper.find(Form ).children().props().className).toEqual('div');
  expect(wrapper.find(Form ).children().at(0).props().className).toEqual('div');
  expect(wrapper.find(Form ).children().props().className).toEqual('div');
  expect(wrapper.children().type()).toEqual('div');
  expect(wrapper.children().props().bam).toEqual(undefined);
  });
  }); 

});