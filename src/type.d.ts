type BoatRampsAction = {
    type: string,
    payload: any
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
    inspectors: string,
    inspection: string,
    constructi: string,
    record_cre: string,
    last_updat: string,
    update_dat: string,
    disposal_d: string,
    positional: string,
    level_accu: string,
    owner: string,
    project_nu: string,
    file_numbe: string,
    folder_num: string,
    drawing_nu: string,
    survey_num: string,
    condition: number,
    historic_c: number,
    funding_ba: string,
    mi_symbolo: string,
    mi_prinx: number,
    createuser: string,
    createdate: string,
    updateuser: string,
    updatedate: string,
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