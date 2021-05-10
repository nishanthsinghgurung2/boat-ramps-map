import {
  BoatRampsViewPortState,
  Feature,
  FetchBoatRampsDataAction,
} from '../../type';
import { filterBoatRampsData } from '../../utils/utils';
import * as actionType from './actionTypes';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore: Disabled ts lint error for this line.
import BOAT_RAMPS_DATA from '../../data/boat_ramps.geojson';

export const fetchBoatRamps = (payload: any): FetchBoatRampsDataAction => ({
  type: actionType.FETCH_BOAT_RAMPS_DATA,
  payload,
});

export const fetchBoatRampsData = ({ _sw, _ne }: any) => {
  return async (dispatch: any) => {
    try {
      const response = await fetch(BOAT_RAMPS_DATA, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      const result = await response.json();
      const filteredBoatRampsData: Array<Feature> = filterBoatRampsData(
        result?.features,
        _ne,
        _sw
      );
      dispatch({
        type: actionType.FETCH_BOAT_RAMPS_DATA,
        payload: filteredBoatRampsData,
      });
    } catch (error) {
      dispatch({
        type: actionType.FETCH_BOAT_RAMPS_DATA_FAILURE,
        payload: error,
      });
    }
  };
};

export const setBoatRampsMapViewPort = (
  viewPortData: BoatRampsViewPortState
) => {
  return {
    type: actionType.SET_BOAT_RAMPS_MAP_VIEWPORT,
    payload: viewPortData,
  };
};

export const setBoatRampsMapFilter = (filter: boolean) => {
  return {
    type: actionType.SET_BOAT_RAMPS_MAP_FILTER,
    payload: {
      isFiltered: filter,
    },
  };
};

export const setBoatRampsMapFeaturesFilter = (
  boatRampsMapFeatures: Array<Feature>
) => {
  return {
    type: actionType.SET_BOAT_RAMPS_MAP_FEATURES_FILTER,
    payload: boatRampsMapFeatures,
  };
};

export const setBoatRampsMapChartsColors = (colors: {
  materialsColors: Array<string>;
  areasColors: Array<string>;
}) => {
  return {
    type: actionType.SET_BOAT_RAMPS_MAP_CHARTS_COLORS,
    payload: {
      colors,
    },
  };
};
