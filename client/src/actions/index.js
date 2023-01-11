import axios from 'axios';


export function getCountries() {
    return async function(dispatch) {
        var json = await axios.get('/countries');
        return dispatch({
            type: 'GET_COUNTRIES',
            payload: json.data
        })
    }
}

// por payload llega el name

export function getNameCountries(nombre) {
        return async (dispatch) => {
          try {
            const res = await axios.get(
              `/countries?name=${nombre}`
            );
      
            dispatch({ type: 'GET_NAME_COUNTRIES',
             payload: res.data });
          } catch (error) {
            console.log(error);
          }
        };
      }


export function getActivities() {
    return async function (dispatch) {
        var info = await axios.get('/activities')
        return dispatch({
            type: 'GET_ACTIVITIES',
            payload: info.data
        })
    };
}

export function filterCountriesByContinent(payload) {
    return {
        type: 'FILTER_COUNTRIES_BY_CONTINENT',
        payload
    }
}

export function postActivity(payload) {
    return async function (dispatch) {
        const response = await axios.post('/activity', payload)
        console.log(response)
        return {
            type: 'POST_ACTIVITY',
            response
        }
    }
}

export function orderByName(payload) {
    return {
        type: 'ORDER_BY_NAME',
        payload
    }
}

export function filterByPopulation(payload) {
    return {
        type: 'FILTER_BY_POPULATION',
        payload
    }
}

export function getCountryDetails (id) {
    return async function (dispatch) {
        try {
            var json = await axios.get('/countries/' + id);
            return dispatch ({
                type: 'GET_COUNTRY_DETAILS',
                payload: json.data
            })
    } catch (error) {
        console.log(error)
        }
    }
       
}

export function getActivityDetails (id) {
    return async function (dispatch) {
        try {
            var json = await axios.get('/activities/' + id);
            return dispatch ({
                type: 'GET_ACTIVITIES_DETAIL',
                payload: json.data
            })
    } catch (error) {
        console.log(error)
        }
    }  
}
/* 
export function removeActividad(id) {
    return async function (dispatch) {
        try {
            var json = await axios.delete('http://localhost:3001/activities:' + id, id);
            return dispatch ({
                type: "REMOVE_ACTIVIDAD",
                payload : id
            })
    } catch (error) {
        console.log(error)
        }
    }
  } */

  export const removeActividad = (id) => {
    return async (dispatch) => {
        try {
            let deleted = await axios.delete(`/activities/${id}`, id);
            dispatch({
                type: "REMOVE_ACTIVIDAD",
                payload: deleted.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}