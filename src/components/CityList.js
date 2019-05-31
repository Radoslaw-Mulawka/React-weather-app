import React, {useEffect} from 'react';
import City from './City';
import {connect} from 'react-redux';

function CityList(props) {


  useEffect(()=>{

  })

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
                    key={city.id}/>
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



export default connect(mapStateToProps)(CityList);
