import { NEWBUSROUTES, BUSLOCATIONS } from '../constants/counter.contant';

const initialState = {
  busRoutes: undefined,
  busLocations: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case NEWBUSROUTES:
      return { ...state, busRoutes: action.busRoutes };
    case BUSLOCATIONS:
      return { ...state, busLocations: action.buslocations };
    default:
      return state;
  }
};
