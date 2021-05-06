import { combineReducers } from 'redux';
import { BoatRampsAction, BoatRampsViewPortAction } from '../type';
import * as actionTypes from "./actions/actionTypes";

const boatRampsMapFeaturesReducer = (state = [], action: BoatRampsAction) => {
    switch(action.type) {
        case actionTypes.FETCH_BOAT_RAMPS_DATA:
            return action && action.payload && action.payload.features;
        case actionTypes.FETCH_BOAT_RAMPS_DATA_FAILURE:
                return action && action.payload;
        default:
            return state;
    }
};

const INIT_BOAT_RAMPS_MAP_VIEWPORT = {
    latitude: -28,
    longitude: 153.4,
    zoom: 10
};

const boatRampsMapViewPortReducer = (state = INIT_BOAT_RAMPS_MAP_VIEWPORT, action: BoatRampsViewPortAction) => {
    switch(action.type) {
        case actionTypes.SET_BOAT_RAMPS_MAP_VIEWPORT:
            return {...state, payload: action.payload };
        default:
            return state;
    }
}

export const rootReducer = combineReducers({
    boatRampsMapFeatures: boatRampsMapFeaturesReducer,
    boatRampsMapViewPort: boatRampsMapViewPortReducer
});

export type RootState = ReturnType<typeof rootReducer>
