import { useDispatch } from 'react-redux';
import { Pie } from 'react-chartjs-2';
import styled from 'styled-components';
import {
  setBoatRampsMapChartsColors,
  setBoatRampsMapFilter,
} from '../../redux/actions';
import { INIT_COLORS } from '../../styles/colors';
import useBoatRampsCharts from './useBoatRampsCharts';

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
  const {
    isFiltered,
    boatRampsMapFeatureMaterialData,
    featureMaterialOptions,
    boatRampsMapFeatureAreasData,
    featureAreaOptions,
  } = useBoatRampsCharts();
  return (
    <BoatRampsMapChartsContainer>
      {isFiltered ? (
        <RemoveFilterButton
          aria-label="Remove filters"
          onClick={() => {
            dispatch(setBoatRampsMapFilter(false));
            dispatch(
              setBoatRampsMapChartsColors({
                materialsColors: INIT_COLORS,
                areasColors: INIT_COLORS,
              })
            );
          }}
        >
          Remove Filters
        </RemoveFilterButton>
      ) : null}
      <BoatRampsChart>
        <Pie
          data={boatRampsMapFeatureMaterialData}
          type="pie"
          options={featureMaterialOptions}
          aria-label="Materials Charts"
        />

        <Pie
          data={boatRampsMapFeatureAreasData}
          type="pie"
          options={featureAreaOptions}
          aria-label="Areas Charts"
        />
      </BoatRampsChart>
    </BoatRampsMapChartsContainer>
  );
};

export default BoatRampsCharts;
