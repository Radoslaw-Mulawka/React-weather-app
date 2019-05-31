import React, {useEffect} from 'react';
import IntegrationAutosuggest from './Autosuggest';
import CityList from './CityList';
import {connect} from 'react-redux';
import {getCitiesFromStorage, updateInformation} from '../store/actions/actionCreators';

function App(props) {
  useEffect(()=>{
    if(!localStorage.getItem('weatherApp')){
      localStorage.setItem('weatherApp',JSON.stringify([]));
    }
    props.triggerGetCitiesFromStorage();

    // THIS IS HACK! THIS IS NOT A GOOD SOLUTION OR SOLUTION AT ALL. But still I don't know websockets, 
    // it is just something that hit my head
    setInterval(()=>{
      props.triggerInformationUpdate();
    },50000)
  },[])
  return (
    <div className='app-container'>
      <IntegrationAutosuggest/>
      <CityList/>
    </div>
  );
}


const mapDispatchToProps = dispatch =>{
  return {
     triggerGetCitiesFromStorage: ()=>dispatch(getCitiesFromStorage()),
     triggerInformationUpdate: ()=>dispatch(updateInformation())
  }
}
export default connect(null,mapDispatchToProps)(App);
