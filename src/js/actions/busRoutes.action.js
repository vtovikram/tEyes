import { NEWBUSROUTES, BUSLOCATIONS } from '../constants/counter.contant';
import  { getVechileCoordinatesObject } from './parsers/busRouteParser';
import axios from 'axios';
import store from '../store';
export const BASE_URL = 'http://webservices.nextbus.com/service/publicJSONFeed?';

export function busRoutes() {
  return {
    type: NEWBUSROUTES,
    busRoutes: {}
  };
}

export function buslocations() {
  // :TODO have to move the api functionality to its own directory
  // :TODO for each bus route dynamically add for each location.
  // const date  = new Date();
  // : TODO have to update date based on time zone fo SFO and pass as parameter.
  
    const request = axios.get(`${BASE_URL}command=vehicleLocations&a=sf-muni&r=N&t=1522635676931`);

    return(dispatch) => {
      request.then(({data})=> {
        const coordinates = getVechileCoordinatesObject(data.vehicle);
        store.dispatch((dispatch) => {
          dispatch({type: BUSLOCATIONS, buslocations: coordinates});
        })
      });
    }

}
