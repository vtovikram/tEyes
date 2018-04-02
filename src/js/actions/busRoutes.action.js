import { NEWBUSROUTES, BUSLOCATIONS } from '../constants/counter.contant';
import  { getVechileCoordinatesObject } from './parsers/busRouteParser';
import axios from 'axios';
import store from '../store';

export function busRoutes() {
  return {
    type: NEWBUSROUTES,
    busRoutes: {}
  };
}

export function buslocations() {
  // :TODO have to move the api functionality to its own directory

    const request = axios.get('http://webservices.nextbus.com/service/publicJSONFeed?command=vehicleLocations&a=sf-muni&r=N&t=1522635676931');

    return(dispatch) => {
      request.then(({data})=> {
        const coordinates = getVechileCoordinatesObject(data.vehicle);
        store.dispatch((dispatch) => {
          dispatch({type: BUSLOCATIONS, buslocations: coordinates});
        })
      });
    }

}
