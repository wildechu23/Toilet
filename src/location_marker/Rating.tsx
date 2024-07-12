import './Rating.css';

interface RatingProps {
    rating: number
}


function getStars(rating: number) {
    const rounded = Math.round(rating * 2) / 2;
    const fullStars = Math.floor(rounded);
    const halfStars =  rounded % 1 == 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStars;

    return [
        ...Array(fullStars).fill('full'),
        ...Array(halfStars).fill('half'),
        ...Array(emptyStars).fill('empty')
    ];
}


function Rating({rating}: RatingProps) {
    const stars = getStars(rating);
    return (
        <>
            {stars.map((type, index) => (
                <span key={index} className={`star ${type}`} />
            ))}
        </>
    );
}

export default Rating;