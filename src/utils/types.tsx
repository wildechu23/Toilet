export interface LocationDataProps {
    location_id: number,
    location_name: string,
    latitude: number,
    longitude: number,
}

export interface RestroomProps {
    gender: string,
    single_stall: boolean,
    wheelchair_stall: boolean,
    mirrors: boolean,
    hand_dryers: boolean,
    paper_towels: boolean,
}
