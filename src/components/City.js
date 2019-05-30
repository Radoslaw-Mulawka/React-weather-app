import React from 'react';
import Icon from '@material-ui/core/Icon';

function City({cloudPercentage, rainAmount, temperature, city}) {
  
  return (
    <React.Fragment>
      <div className='city-list__city city'>
          <div className='city__main-info'>
              <div>
                  <Icon>{cloudPercentage > 50 ? 'cloud_queue' : 'wb_sunny'}</Icon>
                  <div className="manipulation-group">
                    <Icon>autorenew</Icon>
                    <Icon>delete_forever</Icon>
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
