import { Fragment, useState, useEffect } from 'react';

import './Location.css';
import Rating from './Rating.tsx';

import { fetchRestrooms } from '../utils/toilets_api.tsx';
import { RestroomProps } from '../utils/types.tsx';


interface LocationProps {
    id: number,
    name: string,
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

function Location({ id, name }: LocationProps) {
    const [genders, setGenders] = useState([] as BathroomGender[]);

    useEffect(() => {
        async function fetchGenders() {
            const fetchedGenders = await getGenders(id);
            setGenders(fetchedGenders);
        }
        fetchGenders();
    }, [id]);

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