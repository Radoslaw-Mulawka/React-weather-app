import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import 'typeface-roboto';
import axios from 'axios';
import {createStore, applyMiddleware, compose} from 'redux';
import reducer from './store/reducer';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import * as actionTypes from './store/actions/actions';




axios.defaults.baseURL = 'http://localhost:5263';
axios.defaults.headers.common['Authorization'] = 'Bearer ba721f9895d5cebe18697546d08580b3bd7faee8';
axios.interceptors.request.use(request=>{
    return request;
  }, error=>{
    console.log('Something went wront on the client side');
    return Promise.reject(error);
  });

axios.interceptors.response.use(response=>{
    return response;
  }, error=>{
    console.log('Something went wront on the server side');
    return Promise.reject(error);
  });



const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSTION_COMPOSE__ || compose ;

const doesCityExist = ()=>{
    return next=>{
        return action=>{
            const result = next(action);
            if(action.type == actionTypes.ADD_CITY && action.value !== null){
                return result;
            }
        }
    }
}

export const store = createStore(reducer, composeEnhancers(applyMiddleware(doesCityExist,thunk)));







ReactDOM.render(<Provider store={store}><App/></Provider>, document.getElementById('root'));

serviceWorker.unregister();
