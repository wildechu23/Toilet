import './ReviewElement.css';

import { ReviewProps } from '../utils/types';
import Rating from '../location_marker/Rating';

interface ReviewElementProps {
    review: ReviewProps
}

function ReviewElement({ review }: ReviewElementProps) {
    const date = new Date(review.review_date)
    const dateString = date.toLocaleDateString();
    return (
        <div className="review-entry">
            <div className="review-header">
                <div className="review-rating-wrapper">
                    <Rating rating={review.rating} />
                </div>
                <div className="review-date">
                    {dateString}
                </div>
            </div>
            <div className="review-text">
                {review.review_text}
            </div>
        </div>
    );
}

export default ReviewElement;