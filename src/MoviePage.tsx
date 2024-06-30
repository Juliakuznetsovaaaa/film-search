import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Slider from 'react-slick'; // Import Slider component from 'react-slick'

import './MoviePage.css';

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
  const { id } = useParams();
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(`http://localhost:3030/api/v1/movie/${id}`);
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error('Ошибка при получении данных о фильме:', error);
      }
    };

    fetchMovie();
  }, [id]);

  if (!movie) {
    return <div>Загрузка...</div>;
  }

  const settings = {
    dots: false,
    infinite: true, 
    speed: 10,
    slidesToShow: 3, 
    slidesToScroll: 1,
    arrows: true, 
  };

  return (
    <div className="movie-page">
      <img src={movie.poster} alt={movie.title} className="movie-poster" />
      <h1>{movie.title}</h1>
      <p>Жанр: {movie.genre}</p>
      <p>Год выпуска: {movie.release_year}</p>
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

export default MoviePage;
