import axios from 'axios';
import { LatLngTuple } from 'leaflet';
import { RestroomProps } from './types';

export async function fetchLocations() {
    try {
        const res = await axios.get('//localhost:3000/locations');
        return res.data;
    } catch (err) {
        console.error('Error fetching locations:', err);
    }
};


export async function fetchRestrooms(location_id: number) {
    try {
        const res = await axios.get(`//localhost:3000/restrooms/${location_id}`);
        console.log(res.data);
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
        console.log(res.data);
        return res.data;
    } catch (err) {
        console.error(`Error fetching restrooms for location ${location_id}:`, err);
    }
}