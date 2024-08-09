import './ReviewOverlay.css';
import StarRatingInput from './StarRatingInput';
import { LocationDataProps, RestroomProps } from '../utils/types';
import { FormEvent, useState } from 'react';
import { postReview } from '../utils/toilets_api';

interface ReviewOverlayProps {
    location: LocationDataProps | undefined,
    restroom: RestroomProps | undefined,
    closeReview: () => void,
    updateReviews: (id: number) => void,
}


function ReviewOverlay({ location, restroom, closeReview, updateReviews }: ReviewOverlayProps) {
    const [starRating, setStarRating] = useState<number>(0);
    const [reviewText, setReviewText] = useState<string>("");

    function exitOverlay() {
        closeReview();
    }
    
    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if(location && restroom && restroom.restroom_id) {
            postReview(location?.location_id, restroom.restroom_id, starRating, reviewText)
            .then(() => {
                updateReviews(location.location_id);
            })
            .catch((err) => console.error(err));
        }
        exitOverlay();
    }

    return (
        <>
            <div className="overlay-box">   
                    <div className="overlay-name">
                        Add Review
                    </div>
                    <button type="button" className="close-overlay-button" onClick={exitOverlay}>X</button>
                    <div className="location-name">
                        {location?.location_name + " - " + restroom?.gender}
                    </div>
                    <form onSubmit={handleSubmit}>
                        <StarRatingInput 
                            setStarRating={setStarRating} 
                        />
                        <div className="review-text">
                            <label htmlFor="review">Your Review</label>
                            <textarea 
                                id="review" 
                                name="review" 
                                rows={8}
                                placeholder="Enter your review here..."
                                onChange={(e) => setReviewText(e.target.value)}
                            />
                        </div>
                        <button type="submit">Submit</button>
                    </form>
            </div>
        </>
    );
}

export default ReviewOverlay;