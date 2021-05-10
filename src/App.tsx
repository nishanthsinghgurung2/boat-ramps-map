import React from 'react';
import BoatRampsCharts from './components/BoatRampsCharts/BoatRampsCharts';
import BoatRampsMap from './components/BoatRampsMap/BoatRampsMap';

const App = () => {
  return (
    <div className="App">
      <div className="BoatRampsMapContainer">
        <BoatRampsMap />
        <BoatRampsCharts />
      </div>
    </div>
  );
};

export default App;
