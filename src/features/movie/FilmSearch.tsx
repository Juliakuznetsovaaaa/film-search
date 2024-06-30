import React, { useState, useEffect } from 'react';

import MovieCard from './MovieCard'; // Импортируем MovieCard
import './FilmSearch.css';
interface Movie {
  id: number;
  title: string;
  description: string;
  rating: number;
  poster: string;
  genre: string;
  release_year: number;
}

interface Props {
  setIsSearching: React.Dispatch<React.SetStateAction<boolean>>;
  isLoggedIn: boolean; // Добавляем isLoggedIn в props
  onRatingChange: (movieId: number, rating: number) => void; // Добавляем onRatingChange в props
}

const FilmSearch: React.FC<Props> = ({ setIsSearching, isLoggedIn, onRatingChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    setIsLoading(true);
    setError(null);
    setIsSearching(true); // Устанавливаем isSearching в true при начале поиска

    try {
      const response = await fetch(
        `http://localhost:3030/api/v1/search?title=${searchTerm}`
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setSearchResults(data.search_result);
    
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    // Запускаем поиск, если значение searchTerm меняется
    if (searchTerm.length >= 3) {
      handleSearch();
    } else {
      setSearchResults([]); // Очищаем результаты, если поиск короткий
      setIsSearching(false); // Устанавливаем isSearching в false, если поле поиска пустое
    }
  }, [searchTerm]);

  return (
    <div className="film-search">

      <div>
        <input
          type="text"
           className="search-bar"
          placeholder="Название фильма"
          value={searchTerm}
          onChange={handleChange}
        />
        
      </div>
      
      {!isLoading && searchResults.length > 0 && (
        <div className="search-results">
          {searchResults.map((movie) => (
            <MovieCard 
              key={movie.id} 
              movie={movie}
              isLoggedIn={isLoggedIn} // Передаем isLoggedIn в MovieCard
              onRatingChange={onRatingChange} // Передаем onRatingChange в MovieCard
            />
          ))}
        </div>
      )}
      {!isLoading && searchResults.length === 0 && searchTerm.length>=3 && (
        <p className="no-results">Фильмы не найдены</p>
      )}
    </div>
  );
};

export default FilmSearch;