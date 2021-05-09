import { useDispatch, useSelector } from "react-redux";
import { Pie } from 'react-chartjs-2';
import styled from "styled-components";
import { 
    setBoatRampsMapChartsColors,
    setBoatRampsMapFeaturesFilter,
    setBoatRampsMapFilter
} from "../../redux/actions";
import { RootState } from "../../redux/reducers";
import { BoatRampsMapFeaturesFilterState, BoatRampsMapFeaturesState, Feature } from "../../type";
import { getBoatRampsFeatureMaterialsCount } from "../../utils/utils";
import { INIT_COLORS } from "../../styles/colors";


const BoatRampsMapChartsContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    position: absolute;
    top: 20px;
`;

const RemoveFilterButton = styled.button`
    width: 100%;
`;

const BoatRampsChart = styled.div`
    align-items: center;
    position: relative;
    height: 50%;
`;

const BoatRampsCharts = () => {

    const dispatch = useDispatch();
    const { features }: BoatRampsMapFeaturesState = useSelector((state: RootState) => state.boatRampsMapFeatures);
    const { isFiltered, colors }: BoatRampsMapFeaturesFilterState = useSelector((state: RootState) => state.boatRampsMapFeaturesFiltered);
    const { sortedMaterialsCount, boatRampsMapRangeCount } = getBoatRampsFeatureMaterialsCount(features);
    let materialColor: Array<string> = [];
    let areaColor: Array<string> = [];

    const featureMaterialOptions = {
        onClick: (event: any, elems: any) => handleBoatRampsMapFeatureMaterialClick(event, elems[0]?.index),
        elements: {
          arc: {
            borderWidth: 0
          }
        }
    };

    const featureAreaOptions = {
        onClick: (event: any, elems: any) => handleBoatRampsMapFeatureAreaClick(event, elems[0]?.index),
        elements: {
          arc: {
            borderWidth: 0
          }
        }
    };

    const boatRampsMapFeatureMaterialData = {
        maintainAspectRatio: false,
        responsive: false,
        labels: Object.keys(sortedMaterialsCount),
        datasets: [
            {
                data: Object.values(sortedMaterialsCount),
                backgroundColor: colors?.materialsColors,
                hoverBackgroundColor: colors?.materialsColors
            }
        ]
    };

    const boatRampsMapFeatureAreasData = {
        maintainAspectRatio: false,
        responsive: false,
        labels: boatRampsMapRangeCount.map(range => Object.keys(range)),
        datasets:[
          {
            label: 'Range',
            backgroundColor: colors?.areasColors,
            hoverBackgroundColor: colors?.areasColors,
            data: boatRampsMapRangeCount.map(element => Object.values(element))
          }
        ]
      };

    const handleBoatRampsMapFeatureMaterialClick = (mapData: any, index: number) => {
        const materialIndex = index >=0 ? index : -1;
        const materialLabel = mapData?.chart?.config?.data?.labels[materialIndex];
        materialColor = [mapData?.chart?.config?._config?.data?.datasets[0]?.backgroundColor[index]];
        
        if(materialLabel) {
            const featuresWithMaterial: Array<Feature> = features.filter(({ properties }) =>
                properties.material === materialLabel
            );
            dispatch(setBoatRampsMapFeaturesFilter(featuresWithMaterial));
            dispatch(setBoatRampsMapChartsColors({...colors, materialsColors: materialColor}));
            dispatch(setBoatRampsMapFilter(true));
        }
    };

    const handleBoatRampsMapFeatureAreaClick = (mapData: any, index: number) => {
        const areaIndex = index >=0 ? index : -1;
        const areaLabel = mapData?.chart?.config?.data?.labels[index][0];
        areaColor = [mapData?.chart?.config?._config?.data?.datasets[0]?.backgroundColor[areaIndex]];
        if(areaLabel){
          const filterByAreaFeatures = features.filter(({ properties }) => {
            if(
                (areaLabel === '<50' && properties.area_ < 50 ) ||
                (areaLabel === '50-200' && (properties.area_ > 50 && properties.area_ < 200) ) ||
                (areaLabel === '>200' && properties.area_ >= 200 )
            ) return true;
          });
          dispatch(setBoatRampsMapFilter(true));
          dispatch(setBoatRampsMapFeaturesFilter(filterByAreaFeatures))
          dispatch(setBoatRampsMapChartsColors({...colors, areasColors: areaColor}));
            
        }
    };

    return (
        <BoatRampsMapChartsContainer>
            {isFiltered? (
            <RemoveFilterButton onClick={() => {
                dispatch(setBoatRampsMapFilter(false))
                dispatch(setBoatRampsMapChartsColors({ materialsColors: INIT_COLORS, areasColors: INIT_COLORS }));
            }}
            >Remove Filters</RemoveFilterButton>): null}
            <BoatRampsChart>
                <Pie
                    data={boatRampsMapFeatureMaterialData}
                    type='pie'
                    options={featureMaterialOptions}
                />

                <Pie
                    data={boatRampsMapFeatureAreasData}
                    type='pie'
                    options={featureAreaOptions}
                />
            </BoatRampsChart>
        </BoatRampsMapChartsContainer>
    );
};

export default BoatRampsCharts;