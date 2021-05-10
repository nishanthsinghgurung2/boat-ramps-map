import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBoatRampsData } from '../../redux/actions';
import { RootState } from '../../redux/reducers';
import {
  BoatRampsMapFeaturesFilterState,
  BoatRampsMapFeaturesState,
  BoatRampsViewPortState,
} from '../../type';

// Tried to give this token in env but doesn't seem to work
const MAPBOX_TOKEN =
  'pk.eyJ1IjoibmlzaGFudGhndXJ1bmciLCJhIjoiY2tvYnE1OTNpMGo2cjJ2cGc3eWtxdGRhZSJ9.5EhLxO16tInw-W5HGfKFKQ';

const useBoatRampsMap = ({ boatRampsMapRef }: any) => {
  const dispatch = useDispatch();
  const { features }: BoatRampsMapFeaturesState = useSelector(
    (state: RootState) => state.boatRampsMapFeatures
  );
  const boatRampsMapViewPort: BoatRampsViewPortState = useSelector(
    (state: RootState) => state.boatRampsMapViewPort
  );
  const { isFiltered }: BoatRampsMapFeaturesFilterState = useSelector(
    (state: RootState) => state.boatRampsMapFeaturesFiltered
  );

  useEffect(() => {
    if (
      boatRampsMapRef &&
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      boatRampsMapRef.current && // @ts-ignore: ts lint complaining at boatRampsMapRef.current
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      boatRampsMapRef.current.getMap() && // @ts-ignore: ts lint complaining at boatRampsMapRef.current
      boatRampsMapRef.current.getMap().getBounds() &&
      !isFiltered
    ) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore: ts lint complaining at boatRampsMapRef.current
      const { _sw, _ne } = boatRampsMapRef.current.getMap().getBounds();
      dispatch(fetchBoatRampsData({ _sw, _ne }));
    }
  }, [dispatch, boatRampsMapViewPort, isFiltered]);

  return {
    boatRampsMapViewPort,
    MAPBOX_TOKEN,
    features,
  };
};

export default useBoatRampsMap;
