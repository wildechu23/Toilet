import { Fragment, useState, useEffect } from 'react';

import './LocationMarker.css';
import Rating from './Rating.tsx';

import { fetchRestrooms } from '../utils/toilets_api.tsx';
import { LocationProps, RestroomProps } from '../utils/types.tsx';


interface LocationMarkerProps {
    id: number,
    name: string,
    rating: number,
    updateTrigger: LocationProps | undefined
}

enum BathroomGender {
    Men, Women, Unisex
}

function getGenders(current_location_id: number): Promise<BathroomGender[]> {
    const genders: BathroomGender[] = [];
    return fetchRestrooms(current_location_id)
        .then((restrooms: RestroomProps[]) => {
            for (var { gender } of restrooms) {
                genders.push(BathroomGender[gender as keyof typeof BathroomGender]);
            }
            return genders;
        })
        .catch((err) => {
            console.log(err);
            return genders;
        });
}

function LocationMarker({ id, name, rating, updateTrigger }: LocationMarkerProps) {
    const [genders, setGenders] = useState([] as BathroomGender[]);

    useEffect(() => {
        async function fetchGenders() {
            const fetchedGenders = await getGenders(id);
            setGenders(fetchedGenders);
        }
        fetchGenders();
    }, [updateTrigger]);


    return (
        <>
            <div className="popupNameRatingWrapper">
                <div className="popupName">
                    {name}
                </div>
                <Rating rating={rating}/>
            </div>
            <div className="popupGenders">
            {genders.map((gender, index) => (
                <Fragment key={index}>
                    <span title="Hand Dryers" className={`gender-icon ${BathroomGender[gender]}` }/>
                </Fragment>
            ))}
            </div>
        </>
    );
}

export default LocationMarker;