
import { genericReducer, reduceKeyFromSingleParam } from '../common/reducers';
import * as ActionTypes from './action-types'; 


const initialState = {
    currentLocation: {
        name: 'location name',
        main: {},
        clouds:{},
        wind: {},
        weather:{}
    },
    listLocations: [],
    timeDesign: 'normal'
}

const lookUp = {
    [ActionTypes.SET_CURRENT_LOCATION]: reduceKeyFromSingleParam('currentLocation'),
    [ActionTypes.SET_MY_LOCATIONS]: reduceKeyFromSingleParam('listLocations'),
    [ActionTypes.SET_TIME_DESIGN]: reduceKeyFromSingleParam('timeDesign'),
    
}

export default genericReducer(lookUp, initialState);