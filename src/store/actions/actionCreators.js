import * as actionTypes from './actions';
import axios from 'axios';


export const getCitiesSuggestions = ()=>{
    return dispatch=>{
        axios.get('/api/city-list').then(response=>{
            let transformedCitiesObjects = response.data.map(city=>{
                return {
                    id: city.id,
                    label: city.name
                }
            })
            dispatch({
                type: actionTypes.GET_CITIES_SUGGESTIONS,
                value: transformedCitiesObjects
            })
        })
    }
}





export const getCitiesFromStorage = ()=>{
    return {
        type: actionTypes.GET_CITIES_FROM_STORAGE
    }
}



export const addCity = (city)=>{
    console.log(city)
    return dispatch=>{
        axios.get(`/api/weather/${city.id}`).then(response=>{
            dispatch({
                type: actionTypes.ADD_CITY,
                value: {
                    id: String(city.id),
                    name: city.name,
                    ...response.data
                }
            })
        })
    }
}