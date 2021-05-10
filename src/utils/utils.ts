import { Feature } from '../type';

export const filterBoatRampsData = (
  features: Array<Feature>,
  upperBound: any,
  lowerBound: any
) => {
  return (
    features &&
    features.filter(({ geometry }) => {
      return (
        geometry.coordinates[0][0][0][0] > lowerBound.lng &&
        geometry.coordinates[0][0][0][0] < upperBound.lng &&
        geometry.coordinates[0][0][0][1] > lowerBound.lat &&
        geometry.coordinates[0][0][0][1] < upperBound.lat
      );
    })
  );
};

const sortMaterialsCount = (materialsCount: { [key: string]: any }) => {
  const materialCountKeys = Object.keys(materialsCount);
  const sortedMaterialsCount: any = {};
  materialCountKeys.sort((a, b) => materialsCount[b] - materialsCount[a]);

  materialCountKeys.forEach((key) => {
    sortedMaterialsCount[key] = materialsCount[key];
  });
  return sortedMaterialsCount;
};

export const getBoatRampsFeatureMaterialsCount = (
  boatRampMapFeatures: Array<Feature>
) => {
  const propertiesMaterialCount: { [index: string]: number } = {};
  const boatRampsMapRangeCount: Array<{ [index: string]: number }> = [
    { '<50': 0 },
    { '50-200': 0 },
    { '>200': 0 },
  ];

  boatRampMapFeatures &&
    Array.isArray(boatRampMapFeatures) &&
    boatRampMapFeatures.forEach(({ properties }) => {
      const propertiesMaterial: string = properties?.material;
      const propertiesArea: number = properties?.area_;

      if (
        Object.prototype.hasOwnProperty.call(
          propertiesMaterialCount,
          propertiesMaterial
        ) &&
        propertiesMaterial &&
        typeof propertiesMaterial === 'string'
      ) {
        propertiesMaterialCount[propertiesMaterial] += 1;
      } else {
        propertiesMaterialCount[propertiesMaterial] = 1;
      }

      if (propertiesArea < 50) {
        boatRampsMapRangeCount[0]['<50'] += 1;
      } else if (propertiesArea >= 50 && propertiesArea < 200) {
        boatRampsMapRangeCount[1]['50-200'] += 1;
      } else if (propertiesArea >= 200) {
        boatRampsMapRangeCount[2]['>200'] += 1;
      }
    });

  const sortedMaterialsCount = sortMaterialsCount(propertiesMaterialCount);

  return { boatRampsMapRangeCount, sortedMaterialsCount };
};
