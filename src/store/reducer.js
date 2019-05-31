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
   }
   return state;
}

export default reducer;