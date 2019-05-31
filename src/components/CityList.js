import React from 'react';
import City from './City';
import {connect} from 'react-redux';
import {deleteCity, refreshCity} from '../store/actions/actionCreators';
function CityList(props) {
  return (
    <div className='city-list'>
        {props.cities.map(city=>{
            return (
                <City 
                    cloudPercentage={city.cloudPercentage} 
                    rainAmount={city.rainAmount} 
                    temperature={city.temperature} 
                    city={city.name}
                    id={city.id}
                    key={city.id}
                    triggerDeleteCity={props.triggerDeleteCity}
                    triggerRefreshCity={props.triggerRefreshCity}/>
            )
        })}
    </div>
  );
}

const mapStateToProps = state=>{
    return {
        cities: state.cities
    }
}
const mapDispatchToProps = dispatch=>{
    return {
        triggerDeleteCity: id=>dispatch(deleteCity(id)),
        triggerRefreshCity: city=>dispatch(refreshCity(city))
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(CityList);
