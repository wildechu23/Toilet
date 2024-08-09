export interface LocationDataProps {
    location_id: number,
    location_name: string,
    latitude: number,
    longitude: number,
}

export interface RestroomProps {
    restroom_id?: number
    gender: string,
    single_stall: boolean,
    wheelchair_stall: boolean,
    mirrors: boolean,
    hand_dryers: boolean,
    paper_towels: boolean,
}

export interface ReviewProps {
    location_id: number,
    restroom_id: number,
    rating: number,
    review_text: string,
    review_date: string
}
