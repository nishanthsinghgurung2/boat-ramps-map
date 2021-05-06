import { BoatRampsViewPortPayload, FetchBoatRampsDataAction } from "../../type";
import { filterBoatRampsData } from "../../utils/utils";
import * as actionType from "./actionTypes";
// @ts-ignore: Disabled ts lint error for this line.
import BOAT_RAMPS_DATA from "../../data/boat_ramps.geojson";

export const fetchBoatRamps = (payload: any): FetchBoatRampsDataAction => ({
    type: actionType.FETCH_BOAT_RAMPS_DATA,
    payload
});

export const fetchBoatRampsData = ({ _sw, _ne }: any) => {
    return async(dispatch: any) => {
        try {
            const response = await fetch(BOAT_RAMPS_DATA,{
                headers : { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                   }
            });
            const result = await response.json();
            const filteredBoatRampsData = filterBoatRampsData(result, _ne, _sw);
            dispatch({
                type: actionType.FETCH_BOAT_RAMPS_DATA,
                payload: filteredBoatRampsData
            });
        } catch (error) {
            dispatch({
                type: actionType.FETCH_BOAT_RAMPS_DATA_FAILURE,
                payload: error
            });
        }
    }
};


export const setBoatRampsMapViewPort = (viewPortData: BoatRampsViewPortPayload) => {
    return {
        type: actionType.SET_BOAT_RAMPS_MAP_VIEWPORT,
        payload: viewPortData
    };
};
