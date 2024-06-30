// MovieCard.js
import React from 'react';
import Rating from './Rating';
import { useNavigate } from 'react-router-dom';
import './MovieCard.css'

interface MovieCardProps {
  movie: {
    id: number;
    title: string;
    description: string;
    poster: string;
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
    <div className='card-content'>
    <div className="movie-card-content">
    <img src={movie.poster} alt={movie.title} className="movie-post"></img>
    </div>
    <div>
        <div className='head'>
        <h3 className="movie-title">{movie.title}</h3>
      {isLoggedIn && (
        <Rating
        movieId={movie.id}
        initialRating={0}
        onRatingChange={onRatingChange}
        isLoggedIn={isLoggedIn}
        />
      )}
        </div>
      
      <div className="movie-card" onClick={handleMovieClick}>
        <div className="text-card">
          <span className="title-txt">Жанр:
          <span className="desc-txt">  {movie.genre}</span></span>
        </div>
        <div  className="text-card">
          <span className="title-txt">Год Выпуска:
          <span className="desc-txt">  {movie.release_year}</span></span>
        </div>
        <div  className="text-card">
          <span className="title-txt">Описание:
          <span className="desc-txt">{movie.description}</span></span>
        </div>
      </div>
        
    </div>
    </div>
  );
};

export default MovieCard;