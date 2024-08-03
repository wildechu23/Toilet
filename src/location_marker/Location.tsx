import { Fragment } from 'react';

import './Location.css';
import Rating from './Rating.tsx';

import restrooms from '../assets/restroom.json';


interface LocationProps {
    id: number,
    name: string,
}

enum BathroomGender {
    Men, Women, Unisex
}

function getGenders(current_location_id: number) {
    const genders: BathroomGender[] = [];
    for(var {location_id, gender} of restrooms) {
        if(current_location_id == location_id) {
            genders.push(BathroomGender[gender as keyof typeof BathroomGender])
        }
    }
    return genders;
}

function Location({id, name}: LocationProps) {
    const genders = getGenders(id);

    return (
        <>
            <div className="popupNameRatingWrapper">
                <div className="popupName">
                    {name}
                </div>
                <Rating rating={3.6}/>
            </div>
            <div className="popupGenders">
            {genders.map((gender, index) => (
                <Fragment key={index}>
                    { BathroomGender[gender] }
                </Fragment>
            ))}
            </div>
        </>
    );
}

export default Location;