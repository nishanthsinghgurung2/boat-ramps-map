import * as actionType from "./actionTypes";


type FetchBoatRampsAction = {
    type: string;
    payload: any;
  };


export const fetchBoatRamps = (payload: any): FetchBoatRampsAction => ({
    type: actionType.FETCH_BOAT_RAMPS_DATA,
    payload
});

export const fetchBoatRampsData = () => {
    return async(dispatch: (arg0: { type: any; data: any; }) => any) => {
        try {
            const response = await fetch('../../data/boat_ramps.geojson');
            return dispatch({
                type: actionType.FETCH_BOAT_RAMPS_DATA,
                data: response.json()
            });
        } catch (error) {
            return dispatch({
                type: actionType.FETCH_BOAT_RAMPS_DATA_FAILURE,
                data: error
            });
        }
    }
};