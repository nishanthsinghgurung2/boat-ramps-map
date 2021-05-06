import React, { useRef, useEffect } from 'react';
import ReactMapGL from 'react-map-gl';
import { useDispatch, useSelector } from "react-redux";
import { fetchBoatRampsData, setBoatRampsMapViewPort } from '../redux/actions';
import { RootState } from '../redux/reducers';
import { BoatRampsViewPortPayload } from '../type';
import BoatRampsMapMarkers from './BoatRampsMapMarkers';
import './BoatRampsMap.css'

// Tried to give this token in env but doesn't seem to work
const MAPBOX_TOKEN = 'pk.eyJ1IjoibmlzaGFudGhndXJ1bmciLCJhIjoiY2tvYnE1OTNpMGo2cjJ2cGc3eWtxdGRhZSJ9.5EhLxO16tInw-W5HGfKFKQ';

const BoatRampsMap = () => {
    const boatRampsMapRef = useRef(null);
    const dispatch = useDispatch();
    const boatRampsFeatures = useSelector((state: RootState) => state.boatRampsMapFeatures);
    const boatRampsMapViewPort = useSelector((state: RootState) => state.boatRampsMapViewPort);
    
    useEffect(() => {
        if(
            boatRampsMapRef && 
            boatRampsMapRef.current &&  // @ts-ignore: ts lint complaining at boatRampsMapRef.current
            boatRampsMapRef.current.getMap() && // @ts-ignore: ts lint complaining at boatRampsMapRef.current
            boatRampsMapRef.current.getMap().getBounds()
        ) {
            // @ts-ignore: ts lint complaining at boatRampsMapRef.current
            const {_sw, _ne } =  boatRampsMapRef.current.getMap().getBounds();
            dispatch(fetchBoatRampsData({ _sw, _ne }));
        }
    }, [dispatch, boatRampsMapViewPort]);
    
    return (
        <div className='boatRampsMapConatainer'>
            <ReactMapGL
                {...boatRampsMapViewPort}
                mapboxApiAccessToken={MAPBOX_TOKEN}
                width="100%"
                height="100%"
                ref={boatRampsMapRef}
                onViewportChange={
                    (boatRampsMapViewPort: BoatRampsViewPortPayload) => dispatch(setBoatRampsMapViewPort(boatRampsMapViewPort))
                }
            >
                <BoatRampsMapMarkers boatRampsFeatures={boatRampsFeatures} />                
            </ReactMapGL>
        </div>
    );
};

export default BoatRampsMap;