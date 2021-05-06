import React from 'react';
import { Marker } from 'react-map-gl';
import { Feature } from '../type';
import pin from '../../src/assets/images/pin.png';

type BoatRampsFeaturesProps = {
    boatRampsFeatures: Array<Feature>;
}

const BoatRampsMapMarkers = ( { boatRampsFeatures } : BoatRampsFeaturesProps) => {
    let longitude: number;
    let latitude: number;

    return (
        <div>
            {boatRampsFeatures && Array.isArray(boatRampsFeatures) && boatRampsFeatures.map(({ id, geometry }) => {
                longitude = geometry.coordinates[0][0][0][0];
                latitude = geometry.coordinates[0][0][0][1];
                  
                return (
                    <Marker 
                        key={id}
                        longitude={longitude}
                        latitude={latitude}
                        captureClick={true}
                    >
                        <img 
                            src={pin}
                            alt='pin'
                            style={{
                                borderRadius: '50%',
                                width: '15px',
                                height: '15px'}}
                        />
                    </Marker> 
                );
                }
            )}
        </div>
    );
};

export default BoatRampsMapMarkers;