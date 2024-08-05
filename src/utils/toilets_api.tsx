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
        return res.data;
    } catch (err) {
        console.error(`Error fetching restrooms for location ${location_id}:`, err);
    }
}


export async function postLocation(locationName: string, center: LatLngTuple, inputFields: RestroomProps[]) {
    axios.post('//localhost:3000/locations', {
        "name": locationName,
        "lat": center[0],
        "lng": center[1],
        "restrooms": inputFields,
    })
    .then((res) => {
        console.log(res);
        fetchLocations();
    })
    .catch((err) => console.log(err));
}