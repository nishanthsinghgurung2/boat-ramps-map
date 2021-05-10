import React, { useRef } from 'react';
import ReactMapGL from 'react-map-gl';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { setBoatRampsMapViewPort } from '../../redux/actions';
import { BoatRampsViewPortState } from '../../type';
import BoatRampsMapMarkers from '../BoatRampsMapMarkers/BoatRampsMapMarkers';
import useBoatRampsMap from './useBoatRampsMap';

const BoatRampsMapContainer = styled.div`
  height: 100vh;
`;

const BoatRampsMap = () => {
  const dispatch = useDispatch();
  const boatRampsMapRef = useRef(null);
  const { boatRampsMapViewPort, MAPBOX_TOKEN, features } = useBoatRampsMap({
    boatRampsMapRef,
  });

  return (
    <BoatRampsMapContainer>
      <ReactMapGL
        {...boatRampsMapViewPort}
        mapboxApiAccessToken={MAPBOX_TOKEN}
        width="100%"
        height="100%"
        ref={boatRampsMapRef}
        aria-label="Boat ramps map"
        onViewportChange={(boatRampsMapViewPort: BoatRampsViewPortState) =>
          dispatch(setBoatRampsMapViewPort(boatRampsMapViewPort))
        }
      >
        <BoatRampsMapMarkers boatRampsFeatures={features} />
      </ReactMapGL>
    </BoatRampsMapContainer>
  );
};

export default BoatRampsMap;
