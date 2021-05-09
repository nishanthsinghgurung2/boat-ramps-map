export type BoatRampsMapAction = {
    type: string,
    payload: Array<Feature>
};

export type BoatRampsMapFeaturesState = {
    features: Array<Feature>,
    error: any
 };

export type FetchBoatRampsDataAction = {
    type: string;
    payload: any;
  };


export type FetchBoatRampsDataErrorAction = {
    type: string,
    payload: Error
};

export type BoatRampsViewPortAction = {
    type: string,
    payload: BoatRampsViewPortState
};

export type FetchBoatRampsDataFilterAction = {
    type: string,
    payload: BoatRampsMapFeaturesFilterState
};


export type BoatRampsViewPortState= {
    latitude: number,
    longitude: number,
    zoom: number
};

type FeatureGeometry = {
    type: string,
    coordinates: Array<Array<Array<[double, double]>>>
};

type FeatureProperties = {
    rec_id: number,
    status: string,
    asset_numb: string,
    type: string,
    material: string,
    number_lan: number,
    add_improv: string,
    top_rl: number,
    toe_rl: number,
    area_: number,
    comments: string,
    documents: string,
    inspectors: string | null,
    inspection: string,
    constructi: string | null,
    record_cre: string,
    last_updat: string | null,
    update_dat: string,
    disposal_d: string | null,
    positional: string,
    level_accu: string | null,
    owner: string,
    project_nu: string | null,
    file_numbe: string | null,
    folder_num: string | null,
    drawing_nu: string | null,
    survey_num: string | null,
    condition: number,
    historic_c: number,
    funding_ba: string,
    mi_symbolo: string,
    mi_prinx: number,
    createuser: string | null,
    createdate: string | null,
    updateuser: string | null,
    updatedate: string | null,
    shape_leng: number,
    shape_area: number
};

type Feature = {
    type: string,
    id: string,
    geometry: FeatureGeometry,
    geometry_name: string,
    properties: FeatureProperties
}

type Ramps = {
    type: string,
    totalFeatures: number,
    features: Array<Feature>
};

export type BoatRampsMapFeaturesFilterState = {
    isFiltered: boolean,
    colors: {
        materialsColors: Array<string>,
        areasColors: Array<string>
    }
}