import React, { useState, useEffect } from 'react';
import FilterYears from './FilterYears';
import FilterGenres from './FilterGenres';
import './MovieList.css';
import FilmSearch from './FilmSearch';
import Header from './Header';

interface Movie {
  id: number;
  title: string;
  description: string;
  rating: number;
  poster: string;
  genre: string;
  release_year: number;
}

function MovieList() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedYear, setSelectedYear] = useState(
    localStorage.getItem('selectedYear') || '0'
  ); // Получаем из localStorage
  const [selectedGenre, setSelectedGenre] = useState(
    localStorage.getItem('selectedGenre') || '0'
  ); // Получаем из localStorage
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage] = useState(10); 
  const [isSearching, setIsSearching] = useState(false); // Отслеживаем, идет ли поиск

  useEffect(() => {
    const fetchAllMovies = async () => {
      try {
        const allMovies: Movie[] = [];
        let currentPage = 1;
        let totalPages = 1;

        do {
          const response = await fetch(
            `http://localhost:3030/api/v1/search?page=${currentPage}`
          );
          const data = await response.json();
          allMovies.push(...data.search_result);
          totalPages = data.total_pages;
          currentPage++;
        } while (currentPage <= totalPages);

        setMovies(allMovies);
      } catch (error) {
        console.error('Ошибка при получении данных о фильмах:', error);
      }
    };

    fetchAllMovies();
  }, []);

  // Фильтрация должна запускаться после изменения фильмов, года или жанра
  useEffect(() => {
    // Фильтруем список по году и жанру
    const filtered = movies.filter((movie) => {
      if (selectedYear !== '0') {
        if (selectedYear.includes('-')) {
          const [fromYear, toYear] = selectedYear.split('-').map(Number);
          if (!(movie.release_year >= fromYear && movie.release_year <= toYear)) {
            return false; 
          }
        } else {
          if (movie.release_year !== parseInt(selectedYear, 10)) {
            return false; 
          }
        }
      }

      if (selectedGenre !== '0' && selectedGenre !== 'Не выбран' && movie.genre.toLowerCase() !== selectedGenre.toLowerCase()) {
        return false; 
      }

      return true; 
    });
    setFilteredMovies(filtered);
  }, [movies, selectedYear, selectedGenre]);

  // Обновляем currentPage при изменении фильмов, года или жанра
  useEffect(() => {
    setCurrentPage(1); // Сбрасываем на первую страницу при фильтрации
  }, [filteredMovies]); // Зависимость от filteredMovies

  // Сохраняем выбранный год и жанр в localStorage
  useEffect(() => {
    localStorage.setItem('selectedYear', selectedYear);
    localStorage.setItem('selectedGenre', selectedGenre);
  }, [selectedYear, selectedGenre]);

  const handleYearChange = (year: string) => {
    setSelectedYear(year); 
  };

  const handleGenreChange = (genre: string) => {
    setSelectedGenre(genre); 
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = filteredMovies.slice(indexOfFirstMovie, indexOfLastMovie);

  const pageNumbers = [];
  const totalPages = Math.ceil(filteredMovies.length / moviesPerPage);
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <Header/>
      <div className='main'>
      <FilterYears onYearChange={handleYearChange} /> {/* Передаем selectedYear */}
      <FilterGenres onGenreChange={handleGenreChange}  /> {/* Передаем selectedGenre */}
      <FilmSearch setIsSearching={setIsSearching}/> 
      {/* Передаем функцию для изменения isSearching */}
      
      {isSearching ? ( 
        <div className='search-results'> 
        </div>
      ) : (
        <div > 
          {currentMovies.map((movie) => (
            <div key={movie.id} className="movie-card">
              <h3 className='movie-title'>{movie.title}</h3>
              <div>
                <div>
                  <p className='title-txt'>Жанр:</p>
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
          ))}
        </div>
      )}

      <div>
        <button 
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Предыдущая
        </button>

        {pageNumbers.map((number) => (
          <button 
            key={number} 
            onClick={() => handlePageChange(number)}
            className={currentPage === number ? 'active' : ''}
          >
            {number}
          </button>
        ))}

        <button 
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Следующая
        </button>
      </div>
      </div>
      
    </div>
  );
}

export default MovieList;
