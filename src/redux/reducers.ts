import { combineReducers } from 'redux';
import * as actionTypes from "./actions/actionTypes";

const boatRampsFeaturesReducer = (state = [], action: BoatRampsAction) => {
    switch(action.type) {
        case 'FETCH_BOAT_RAMPS_DATA':
            return {...state, features: action && action.payload && action.payload.features};
        case 'FETCH_BOAT_RAMPS_DATA_ERROR':
                return {...state, error: action && action.payload};
        default:
            return state;
    }
};

export const rootReducer = combineReducers({
    boatRampsFeaturesReducer: boatRampsFeaturesReducer
});