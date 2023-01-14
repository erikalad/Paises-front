const initialState = {
    countries : [],
    allCountries : [],
    activities : [],
    details: []
    
}


function rootReducer (state = initialState, action) {
    switch (action.type) {
        case 'GET_COUNTRIES':
            return {
                ...state,
                countries: action.payload, // cuando se dispara la accion, me va a llenar los dos estados
                allCountries: action.payload
            }
        case 'FILTER_COUNTRIES_BY_CONTINENT':
            const allCountries = state.allCountries;
            const statusFiltered = action.payload === 'All' ? allCountries : allCountries.filter(el => el.region === action.payload)
            return {
                ...state,
                countries: statusFiltered,
            }

            case 'FILTER_COUNTRIES_BY_ACTIVITY':
                const activities = state.activities;
                const detailsFiltered = action.payload === 'All' ? activities : activities.filter(el => el.nombre === action.payload)
                return {
                    ...state,
                    details: detailsFiltered,
                }
    




        case 'ORDER_BY_NAME':
                const sortedArr = action.payload === 'asc' ?
                state.countries.sort(function(a, b) {
                    if(a.nombre > b.nombre) {
                        return 1;
                    }
                    if(b.nombre > a.nombre) {
                        return -1;
                    }
                    return 0;
                }) :
                state.countries.sort(function(a, b) {
                    if(a.nombre > b.nombre) {
                        return -1;
                    }
                    if(b.nombre > a.nombre) {
                        return 1;
                    }
                    return 0;
                });
                return {
                    ...state,
                    countries: sortedArr
                }
        case 'GET_NAME_COUNTRIES':
                return {
                    ...state,
                    countries: action.payload
                }
        case 'POST_ACTIVITY':
                return {
                    ...state,
                    activities: action.payload
                }
        case 'GET_ACTIVITIES':
                return {
                    ...state,
                    activities: action.payload
                }
        case 'FILTER_BY_POPULATION':
            const filterPopulation = action.payload === 'ascpop' ?
            state.countries.sort(function(a, b) {
                if(a.poblacion < b.poblacion) {
                    return 1;
                }
                if(b.poblacion < a.poblacion) {
                    return -1;
                }
                return 0;
            }) :
            state.countries.sort(function(a, b) {
                if(a.poblacion < b.poblacion) {
                    return -1;
                }
                if(b.poblacion < a.poblacion) {
                    return 1;
                }
                return 0;
            });
            return {
                ...state,
                countries: filterPopulation
            }
        case 'GET_COUNTRY_DETAILS':
            return {
                ...state,
                details: action.payload
            }

            

            case "REMOVE_ACTIVIDAD" :
                return {
                  ...state,
                  activities: state.activities.filter((actividad) => actividad.id !== action.payload)
                }

                default: return state;

                case 'GET_ACTIVITIES_DETAILS':
                    return {
                        ...state,
                        activities: state.activities.filter((actividad) => actividad.id === action.payload)
                    }
    }

}

  export default rootReducer;