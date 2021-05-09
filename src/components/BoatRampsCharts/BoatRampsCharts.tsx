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
    const { sortedMaterialsCount } = getBoatRampsFeatureMaterialsCount(features);
    let materialColor: Array<string> = [];

    const pieOptions = {
        onClick: (event: any, elems: any) => handleBoatRampsMapFeatureMaterialClick(event, elems[0]?.index),
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
                backgroundColor: colors,
                hoverBackgroundColor: colors
            }
        ]
    };

    const handleBoatRampsMapFeatureMaterialClick = (materials: any, index: number) => {
        const materialIndex = index? index : -1;
        const materialLabel = materials?.chart?.config?.data?.labels[materialIndex];
        materialColor = [materials?.chart?.config?._config?.data?.datasets[0]?.backgroundColor[index]];
        if(materialLabel) {
            const featuresWithMaterial: Array<Feature> = features.filter(({ properties }) =>
                properties.material === materialLabel
            );
            dispatch(setBoatRampsMapFeaturesFilter(featuresWithMaterial));
            dispatch(setBoatRampsMapChartsColors(materialColor));
            dispatch(setBoatRampsMapFilter(true));
        }
    };

    return (
        <BoatRampsMapChartsContainer>
            {isFiltered? (
            <RemoveFilterButton onClick={() => {
                dispatch(setBoatRampsMapFilter(false))
                dispatch(setBoatRampsMapChartsColors(INIT_COLORS));
            }}
            >Remove Filters</RemoveFilterButton>): null}
            <BoatRampsChart>
                <Pie
                    className=''
                    data={boatRampsMapFeatureMaterialData}
                    type='pie'
                    options={pieOptions}
                />
            </BoatRampsChart>
        </BoatRampsMapChartsContainer>
    );
};

export default BoatRampsCharts;