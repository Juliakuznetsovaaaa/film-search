import React, { useState, useEffect } from 'react';


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
}

const FilmSearch: React.FC<Props> = ({ setIsSearching }) => {
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
      <h2>Поиск фильма</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Введите название фильма"
          value={searchTerm}
          onChange={handleChange}
        />
        <button onClick={handleSearch} disabled={isLoading}>
          {isLoading ? 'Поиск...' : 'Искать'}
        </button>
      </div>
      
      {isLoading && <p className="loading">Поиск...</p>}
      {!isLoading && searchResults.length > 0 && (
        <ul className="search-results">
          {searchResults.map((movie) => (
            <li key={movie.id} className="search-result">
              <div>
                <h3>{movie.title}</h3>
                <p>Рейтинг: {movie.rating}</p>
                <p>Жанр: {movie.genre}</p>
                <p>Год: {movie.release_year}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
      {!isLoading && searchResults.length === 0 && searchTerm.length!=0 && (
        <p className="no-results">Фильмы не найдены</p>
      )}
    </div>
  );
};

export default FilmSearch;
