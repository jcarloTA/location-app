import { SET_CURRENT_LOCATION, SET_MY_LOCATIONS, SET_TIME_DESIGN } from "./action-types";


export const setCurrentLocation = (location:any) => (dispatch:any) => {
    const temp = location.main.temp;
    let text = 'normal';
    if(temp > 23) {
        text = 'hot'
    } else if (temp < 15) {
        text = 'cold'
    }
    dispatch({type: SET_CURRENT_LOCATION, payload: location});
    dispatch({type: SET_TIME_DESIGN, payload: text});
}

export const setMylocations = (locations:any) => (dispatch:any) => {
    dispatch({type: SET_MY_LOCATIONS, payload: locations})
}



