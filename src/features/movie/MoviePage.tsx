import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Slider from 'react-slick'; 
import { useGetMovieByIdQuery } from '../../services/movieApi';

import './MoviePage.css';
import Rating from './Rating';

interface Movie {
  id: number;
  title: string;
  description: string;
  rating: number;
  poster: string;
  genre: string;
  release_year: number;
  actors: { name: string; photo: string }[];
}

function MoviePage() {
  const { movieId } = useParams();
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Для примера, в реальности логин/аут - это separate component 

  const {
    data: movie, 
    isLoading,
    error,
  } = useGetMovieByIdQuery(Number(movieId)); 

let newRating=0;
  
  
  
  const settings = {
    dots: false,
    infinite: true, 
    speed: 10,
    slidesToShow: 3, 
    slidesToScroll: 1,
    arrows: true, 
  };

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>Ошибка:</div>;
  }

  if (movie) {
    const handleRatingChange = async (rating: number) => {
      // Пересчитываем рейтинг (умножаем на 2, затем усредняем)
       newRating = (movie.rating * movie.rating + rating * 2) / (movie.rating + 2);}
    return (
      <div className="movie-page">
        <img src={movie.poster} alt={movie.title} className="movie-poster" />
        <h1>{movie.title}</h1>
        <p>Жанр: {movie.genre}</p>
        <p>Год выпуска: {movie.release_year}</p>
        <p>Рэйтинг: {newRating !== 0 ? newRating : movie.rating}</p> 
        <Rating 
          movieId={movie.id} 
          initialRating={movie.rating} 
          onRatingChange={handleRatingChange} 
          isLoggedIn={isLoggedIn} 
        /> {/* Добавили Rating */}
        <p>Описание: {movie.description}</p>
        <h2>Актеры:</h2>
        <div className="actor-slider">
          <Slider {...settings}> 
            {movie.actors.map((actor) => (
              <div key={actor.name} className="actor-card">
                <img src={actor.photo} alt={actor.name} className="actor-photo" />
                <p>{actor.name}</p>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    );
  }

  return <div>Нет данных о фильме.</div>; 
}

export default MoviePage;
