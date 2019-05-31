import * as actionTypes from './actions/actions';

const initialState = {
    citiesSuggestions:[],
    cities:[]
}

const reducer = (state = initialState, action)=>{
   switch(action.type){
       case actionTypes.GET_CITIES_SUGGESTIONS:
            return {
                ...state,
                citiesSuggestions:[...action.value]
                }
        case actionTypes.ADD_CITY:
            return {
                ...state,
                cities: [...state.cities,action.value]
            }
        case actionTypes.DELETE_CITY:
             return {
                 ...state,
                 cities: state.cities.filter(city=> city.id != action.value)
             }
        case actionTypes.REFRESH_CITY:
             const oldCities = [...state.cities];
             oldCities.splice(oldCities.findIndex(item=>item.id==action.value.id), 1, action.value);
             return {
                 ...state,
                 cities: oldCities
             }
        case actionTypes.GET_CITIES_FROM_STORAGE:
             return {
                 ...state,
                 cities: action.value
             }
   }
   return state;
}

export default reducer;