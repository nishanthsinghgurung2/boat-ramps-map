import { combineReducers } from 'redux';
import { INIT_COLORS } from '../styles/colors';
import { BoatRampsMapAction, BoatRampsMapFeaturesFilterState, BoatRampsMapFeaturesState, BoatRampsViewPortAction, BoatRampsViewPortState, Feature, FetchBoatRampsDataFilterAction } from '../type';
import * as actionTypes from "./actions/actionTypes";

const INIT_BOAT_RAMPS_MAP_FEATURES: BoatRampsMapFeaturesState = {
   features: [] as Array<Feature>,
   error: null
};

const boatRampsMapFeaturesReducer = (state = INIT_BOAT_RAMPS_MAP_FEATURES, action: BoatRampsMapAction): BoatRampsMapFeaturesState=> {
    switch(action.type) {
        case actionTypes.FETCH_BOAT_RAMPS_DATA:
            return {...state, features: action.payload};
        case actionTypes.FETCH_BOAT_RAMPS_DATA_FAILURE:
            return {...state, error: action.payload};
        case actionTypes.SET_BOAT_RAMPS_MAP_FEATURES_FILTER:
            return {...state, features: action.payload};
        default:
            return state;
    }
};

const INIT_BOAT_RAMPS_MAP_VIEWPORT: BoatRampsViewPortState = {
    latitude: -28,
    longitude: 153.4,
    zoom: 10
};

const boatRampsMapViewPortReducer = (state = INIT_BOAT_RAMPS_MAP_VIEWPORT, action: BoatRampsViewPortAction): BoatRampsViewPortState => {
    switch(action.type) {
        case actionTypes.SET_BOAT_RAMPS_MAP_VIEWPORT:
            return {...state, ...action.payload };
        default:
            return state;
    }
}

export const INIT_BOAT_RAMPS_MAP_FEATURES_FILTER: BoatRampsMapFeaturesFilterState = {
    isFiltered: false,
    colors: INIT_COLORS
};

const boatRampsMapFeaturesFilteredReducer = (
    state = INIT_BOAT_RAMPS_MAP_FEATURES_FILTER,
    action: FetchBoatRampsDataFilterAction
): BoatRampsMapFeaturesFilterState => {
    switch(action.type){
        case actionTypes.SET_BOAT_RAMPS_MAP_FILTER:
            return {
                ...state, 
                isFiltered: action?.payload?.isFiltered
            };
        case actionTypes.SET_BOAT_RAMPS_MAP_CHARTS_COLORS:
            return {...state, colors: action?.payload?.colors};
        default:
            return state
    }
};

export const rootReducer = combineReducers({
    boatRampsMapFeatures: boatRampsMapFeaturesReducer,
    boatRampsMapViewPort: boatRampsMapViewPortReducer,
    boatRampsMapFeaturesFiltered: boatRampsMapFeaturesFilteredReducer
});

export type RootState = ReturnType<typeof rootReducer>
