import React, { useState } from 'react';
import './Rating.css';

interface RatingProps {
  movieId: number;
  initialRating: number;
  onRatingChange: (movieId: number, rating: number) => void;
}

const Rating: React.FC<RatingProps> = ({ movieId, initialRating, onRatingChange }) => {
  const [selectedRating, setSelectedRating] = useState(initialRating);

  const handleRatingClick = (rating: number) => {
    setSelectedRating(rating);
    onRatingChange(movieId, rating); // Вызываем onRatingChange
  };

  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <span
        key={i}
        className={`star ${i <= selectedRating ? 'filled' : ''}`}
        onClick={() => handleRatingClick(i)}
      >
        ★
      </span>
    );
  }

  // Return the JSX for the Rating component
  return (
    <div className="rating">
      {stars}
    </div>
  );
};

export default Rating;
