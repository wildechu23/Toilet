import { useState, useEffect } from 'react';
import { LocationDataProps, LocationProps } from './utils/types.tsx';
import { fetchLocations, fetchRating } from './utils/toilets_api';

const useLocations = () => {
    const [locations, setLocations] = useState<LocationProps[]>([]);

    const updateLocations = async () => {
        const data = await fetchLocations();
        
        const locationPromises = data.map(async (data: LocationDataProps) => {
            const rating = await fetchRating(data.location_id);
            const convert: LocationProps = { ...data, rating };
            return convert;
        });
        
        const locations = await Promise.all(locationPromises);
        
        setLocations(locations);
    };

    async function updateRating(id: number) {
        const rating = await fetchRating(id);
        const updatedLocations = locations.map(location => 
            location.location_id === id ? { ...location, rating: rating } : location
        );

        setLocations(updatedLocations);

    }

    useEffect(() => {
        updateLocations();
    }, []);

    return { locations, updateLocations, updateRating };
};

export default useLocations;
