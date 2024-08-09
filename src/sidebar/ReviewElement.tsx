import './ReviewElement.css';

import { ReviewProps } from '../utils/types';
import Rating from '../location_marker/Rating';

interface ReviewElementProps {
    review: ReviewProps,
    gender: string | undefined,
}

function ReviewElement({ review, gender }: ReviewElementProps) {
    const date = new Date(review.review_date)
    const dateString = date.toLocaleDateString();
    // const reviewClass = review.review_text === "" ? "review-entry" : "review-entry text-review"
    return (
        <div className={"review-entry"}>
            <div className="review-header">
                <div className="review-rating-wrapper">
                    <Rating rating={review.rating} />
                </div>
                {gender}
                <div className="review-date">
                    {dateString}
                </div>
            </div>
            {review.review_text !== "" &&
            <div className="review-text">
                {review.review_text}
            </div>}
        </div>
    );
}

export default ReviewElement;