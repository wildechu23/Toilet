import axios from 'axios';
import { LatLngTuple } from 'leaflet';
import { LocationDataProps, RestroomProps, ReviewProps } from './types';

export async function fetchRating(id: number) {
    const currentReviews = await fetchReviews(id);
    if(currentReviews.length === 0) return 0;
    return currentReviews.reduce((total: number, next: ReviewProps) => total + next.rating, 0) / currentReviews.length;
}

export async function fetchLocations(): Promise<LocationDataProps[]> {
    try {
        const res = await axios.get('//localhost:3000/locations');
        return res.data;
    } catch (err) {
        console.error(err);
        return [];
    }
};


export async function fetchRestrooms(location_id: number) {
    try {
        const res = await axios.get(`//localhost:3000/restrooms/${location_id}`);
        return res.data;
    } catch (err) {
        console.error(`Error fetching restrooms for location ${location_id}:`, err);
    }
}


export async function postLocation(locationName: string, center: LatLngTuple, inputFields: RestroomProps[]) {
    const locationData = {
        "name": locationName,
        "lat": center[0],
        "lng": center[1],
        "restrooms": inputFields,
    }
    return axios.post('//localhost:3000/locations', locationData)
        .then((res) => {
            console.log(res);
        })
        .catch((err) => console.log(err));
}

export async function putLocation(locationName: string, id: number, center: LatLngTuple, inputFields: RestroomProps[]) {
    const locationData = {
        "name": locationName,
        "lat": center[0],
        "lng": center[1],
        "restrooms": inputFields,
    }
    return axios.put(`//localhost:3000/locations/${id}`, locationData)
        .then((res) => {
            console.log(res);
        })
        .catch((err) => console.log(err));
}

export async function postReview(locationId: number, restroomId: number, starRating: number, reviewText: string) {
    const reviewData = {
        location_id: locationId,
        restroom_id: restroomId,
        rating: starRating,
        review_text: reviewText
    }

    return axios.post("//localhost:3000/reviews", reviewData)
        .then((res) => console.log(res))
        .catch((err) => console.error(err) );
}

export async function fetchReviews(location_id: number) {
    try {
        const res = await axios.get(`//localhost:3000/reviews/location/${location_id}`);
        return res.data;
    } catch (err) {
        console.error(`Error fetching restrooms for location ${location_id}:`, err);
    }
}