import React, { useRef, useEffect } from 'react';
import ReactMapGL from 'react-map-gl';
import { useDispatch, useSelector } from "react-redux";
import styled from 'styled-components';
import { fetchBoatRampsData, setBoatRampsMapViewPort } from '../../redux/actions';
import { RootState } from '../../redux/reducers';
import { BoatRampsMapFeaturesFilterState, BoatRampsMapFeaturesState, BoatRampsViewPortState } from '../../type';
import BoatRampsMapMarkers from '../BoatRampsMapMarkers/BoatRampsMapMarkers';

const BoatRampsMapContainer = styled.div`
    height: 100vh;
`;

// Tried to give this token in env but doesn't seem to work
const MAPBOX_TOKEN = 'pk.eyJ1IjoibmlzaGFudGhndXJ1bmciLCJhIjoiY2tvYnE1OTNpMGo2cjJ2cGc3eWtxdGRhZSJ9.5EhLxO16tInw-W5HGfKFKQ';

const BoatRampsMap = () => {
    const boatRampsMapRef = useRef(null);
    const dispatch = useDispatch();
    const { features }: BoatRampsMapFeaturesState = useSelector((state: RootState) => state.boatRampsMapFeatures);
    const boatRampsMapViewPort: BoatRampsViewPortState = useSelector((state: RootState) => state.boatRampsMapViewPort);
    const { isFiltered }: BoatRampsMapFeaturesFilterState = useSelector((state: RootState) => state.boatRampsMapFeaturesFiltered);
    
    useEffect(() => {
        if(
            boatRampsMapRef && 
            boatRampsMapRef.current &&  // @ts-ignore: ts lint complaining at boatRampsMapRef.current
            boatRampsMapRef.current.getMap() && // @ts-ignore: ts lint complaining at boatRampsMapRef.current
            boatRampsMapRef.current.getMap().getBounds() &&
            !(isFiltered)
        ) {
            // @ts-ignore: ts lint complaining at boatRampsMapRef.current
            const {_sw, _ne } =  boatRampsMapRef.current.getMap().getBounds();
            dispatch(fetchBoatRampsData({ _sw, _ne }));
        }
    }, [dispatch, boatRampsMapViewPort, isFiltered]);
    
    return (
        <BoatRampsMapContainer>
            <ReactMapGL
                {...boatRampsMapViewPort}
                mapboxApiAccessToken={MAPBOX_TOKEN}
                width="100%"
                height="100%"
                ref={boatRampsMapRef}
                onViewportChange={
                    (boatRampsMapViewPort: BoatRampsViewPortState) => dispatch(setBoatRampsMapViewPort(boatRampsMapViewPort))
                }
            >
                <BoatRampsMapMarkers boatRampsFeatures={features} />                
            </ReactMapGL>
        </BoatRampsMapContainer>
    );
};

export default BoatRampsMap;