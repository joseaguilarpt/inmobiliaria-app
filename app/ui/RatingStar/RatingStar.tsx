import React, { useState } from 'react';
import './RatingStar.scss';

interface RatingStarProps {
  totalStars?: number;
  initialRating?: string;
  onChange?: (rating: number) => void;
}

const RatingStar: React.FC<RatingStarProps> = ({
  totalStars = 5,
  initialRating ='0',
  onChange
}) => {
  const [rating, setRating] = useState(parseFloat(initialRating));

  const handleClick = (selectedRating: number) => {
    if (onChange) {
      onChange(selectedRating);
    }
    setRating(selectedRating);
  };

  return (
    <div className="rating-star">
      {[...Array(totalStars)].map((_, index) => {
        const starValue = index + 1;
        return (
          <span
            key={starValue}
            className={`rating-star__icon ${
              starValue <= rating ? 'rating-star__icon--active' : ''
            }`}
            onClick={() => handleClick(starValue)}
            role="button"
            aria-label={`Star ${starValue}`}
          >
            ★
          </span>
        );
      })}
    </div>
  );
};

export default RatingStar;
