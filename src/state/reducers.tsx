import { combineReducers } from "redux";

import locationReducers from './location/reducers';

export default combineReducers({
    location: locationReducers,
});