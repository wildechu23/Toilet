import { useState, useEffect } from 'react';
import { LocationDataProps } from './utils/types.tsx';
import { fetchLocations } from './utils/toilets_api';

export const useLocations = () => {
    const [locations, setLocations] = useState<LocationDataProps[]>([]);

    const updateLocations = async () => {
        const data = await fetchLocations();
        setLocations(data);
    };

    useEffect(() => {
        updateLocations();
    }, []);

    return { locations, updateLocations };
};
