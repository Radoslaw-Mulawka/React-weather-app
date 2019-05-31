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

export const addCity = (city)=>{
        return dispatch=>{
            axios.get(`/api/weather/${city.id}`).then(response=>{
                const newCity = {
                    id: String(city.id),
                    name: city.name,
                    ...response.data
                }
                const localStorageData = JSON.parse(localStorage.getItem('weatherApp'));
                if(!localStorageData.find(item=>item.id == city.id)){
                    const updatedStorage = JSON.stringify([...localStorageData, newCity])
                    localStorage.setItem('weatherApp',updatedStorage)
                }
                dispatch({
                    type: actionTypes.ADD_CITY,
                    value: newCity
                })
            })
        }
}


export const deleteCity = (id)=>{
    let localStorageData = JSON.parse(localStorage.getItem('weatherApp'));
    if(localStorageData.find(item=>item.id == id) ){
        localStorageData = localStorageData.filter(item=>item.id !== id);
        localStorage.setItem('weatherApp', JSON.stringify(localStorageData));
    }
    return {
        type: actionTypes.DELETE_CITY,
        value: id
    }
}

export const refreshCity = (city)=>{
    return dispatch=>{
        axios.get(`/api/weather/${city.id}`).then(response=>{
            let localStorageData = JSON.parse(localStorage.getItem('weatherApp'));
            if(localStorageData.find(item=>item.id == city.id) ){
                let cityIndex = localStorageData.findIndex(item=>item.id !== city.id);
                localStorageData.splice(cityIndex,1,{
                    id: String(city.id),
                    name: city.city,
                    ...response.data
                })
            }
            dispatch({
                type: actionTypes.REFRESH_CITY,
                value: {
                    id: String(city.id),
                    name: city.city || city.name,
                    ...response.data
                }
            })
        })
    }
}

export const getCitiesFromStorage = ()=>{
    const localStorageData = JSON.parse(localStorage.getItem('weatherApp'));
    return {
        type: actionTypes.GET_CITIES_FROM_STORAGE,
        value: localStorageData
    }
}



// THIS IS HACK! THIS IS NOT A GOOD SOLUTION OR SOLUTION AT ALL. But still I don't know websockets, 
// it is just something that hit my head
export const updateInformation = ()=>{
    return dispatch=>{
        let localStorageData = JSON.parse(localStorage.getItem('weatherApp'));
        if(localStorageData.length>0){
            for(let city of localStorageData){
                dispatch(refreshCity(city));
            }
        }
    }
}

