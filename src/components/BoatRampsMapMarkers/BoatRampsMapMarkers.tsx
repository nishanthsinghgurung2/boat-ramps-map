import React from 'react';
import { Marker } from 'react-map-gl';
import styled from 'styled-components';
import { Feature } from '../../type';
import pin from './pin.png';

const PinImg = styled.img`
  width: 20px;
  height: 20px;
`;

type BoatRampsFeaturesProps = {
  boatRampsFeatures: Array<Feature>;
};

const BoatRampsMapMarkers = ({ boatRampsFeatures }: BoatRampsFeaturesProps) => {
  let longitude: number;
  let latitude: number;

  return (
    <div>
      {boatRampsFeatures &&
        Array.isArray(boatRampsFeatures) &&
        boatRampsFeatures.map(({ id, geometry }) => {
          longitude = geometry.coordinates[0][0][0][0];
          latitude = geometry.coordinates[0][0][0][1];

          return (
            <Marker
              key={id}
              longitude={longitude}
              latitude={latitude}
              captureClick={true}
            >
              <PinImg src={pin} alt="pin" />
            </Marker>
          );
        })}
    </div>
  );
};

export default BoatRampsMapMarkers;
