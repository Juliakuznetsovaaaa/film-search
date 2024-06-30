import React, { useState } from 'react';
import './Rating.css';

interface RatingProps {
  movieId: number;
  initialRating: number;
  onRatingChange: (movieId: number, rating: number) => void;
  isLoggedIn: boolean; // Добавляем isLoggedIn в props
}

const Rating: React.FC<RatingProps> = ({ movieId, initialRating, onRatingChange, isLoggedIn }) => {
  const [selectedRating, setSelectedRating] = useState(initialRating);

  const handleRatingClick = (rating: number) => {
    setSelectedRating(rating);
    if (isLoggedIn) {
      onRatingChange(movieId, rating); // Вызываем onRatingChange только если пользователь авторизован
    }
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

  return (
    <div className="rating">
      {isLoggedIn ? stars : ""} {/* Показывать звезды только если пользователь авторизован */}
    </div>
  );
};

export default Rating;
