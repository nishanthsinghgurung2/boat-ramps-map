import { Feature, Ramps } from "../type";

export const filterBoatRampsData = (data: Ramps, upperBound: any, lowerBound: any) => {
    let features: Array<Feature> = [...data.features];
    let filteredFeatures: Array<Feature> = [];

    filteredFeatures = features && features.filter(({ geometry })=> {
      return (
        geometry.coordinates[0][0][0][0] > lowerBound.lng &&
        geometry.coordinates[0][0][0][0] < upperBound.lng &&
        geometry.coordinates[0][0][0][1] > lowerBound.lat &&
        geometry.coordinates[0][0][0][1] < upperBound.lat
      )
    });

    data.features = filteredFeatures;
    return data;
  };