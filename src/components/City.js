import React from 'react';
import Icon from '@material-ui/core/Icon';

function City({cloudPercentage, rainAmount, temperature, city, triggerDeleteCity, triggerRefreshCity, id}) {
  return (
    <React.Fragment>
      <div className='city-list__city city'>
          <div className='city__main-info'>
              <div>
                  <Icon>{cloudPercentage > 50 ? 'cloud_queue' : 'wb_sunny'}</Icon>
                  <div className="manipulation-group">
                    <Icon onClick={()=>triggerRefreshCity({id, city})}>autorenew</Icon>
                    <Icon onClick={()=>triggerDeleteCity(id)}>delete_forever</Icon>
                  </div>
              </div>
              <span>
                  Temp {temperature}
              </span>
          </div>
          <div className='city__name'>
              {city}
          </div>
      </div>
    </React.Fragment>
  );
}

export default City;
