import { ChangeEvent } from 'react';
import './StarRatingInput.css';

interface StarRatingInputProps {
    setStarRating: (n: number) => void,
}

function StarRatingInput({ setStarRating }: StarRatingInputProps) {
    const handleRatingChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStarRating(Number(e.target.value));
    };
    return (
        <div className="rating">
            <input type="radio" id="star5" name="rating" value="5" onChange={handleRatingChange}/>
            <label htmlFor="star5">&#9733;</label>
            <input type="radio" id="star4" name="rating" value="4" onChange={handleRatingChange}/>
            <label htmlFor="star4">&#9733;</label>
            <input type="radio" id="star3" name="rating" value="3" onChange={handleRatingChange}/>
            <label htmlFor="star3">&#9733;</label>
            <input type="radio" id="star2" name="rating" value="2" onChange={handleRatingChange}/>
            <label htmlFor="star2">&#9733;</label>
            <input type="radio" id="star1" name="rating" value="1" onChange={handleRatingChange}/>
            <label htmlFor="star1">&#9733;</label>
        </div>
    )
}

export default StarRatingInput;