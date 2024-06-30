// MovieCard.js
import React from 'react';
import Rating from './Rating';
import { useNavigate } from 'react-router-dom';

interface MovieCardProps {
  movie: {
    id: number;
    title: string;
    description: string;
    genre: string;
    release_year: number;
  };
  isLoggedIn: boolean;
  onRatingChange: (movieId: number, rating: number) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, isLoggedIn, onRatingChange }) => {
  const navigate = useNavigate();

  const handleMovieClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  return (
    <div className="movie-card-content">
      <h3 className="movie-title">{movie.title}</h3>
      {isLoggedIn && (
        <Rating
        movieId={movie.id}
        initialRating={0}
        onRatingChange={onRatingChange}
        isLoggedIn={isLoggedIn}
        />
      )}
      <div className="movie-card" onClick={handleMovieClick}>
        <div>
          <p className="title-txt">Жанр:</p>
          <p>{movie.genre}</p>
        </div>
        <div>
          <p>Год Выпуска:</p>
          <p>{movie.release_year}</p>
        </div>
        <div>
          <p>Описание:</p>
          <p>{movie.description}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;