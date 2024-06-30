import React, { useState, useEffect } from 'react';
import FilterYears from './FilterYears';
import FilterGenres from './FilterGenres';
import './MovieList.css';
import FilmSearch from './FilmSearch';
import Header from './Header';
import Rating from './Rating'; 
import LoginModal from './LoginModal';
import { useNavigate } from 'react-router-dom'; // Импортируем useNavigate

interface Movie {
  id: number;
  title: string;
  description: string;
  rating: number;
  poster: string;
  genre: string;
  release_year: number;
  actors: { name: string; photo: string }[]; // Добавляем поле для актеров
}

function MovieList() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedYear, setSelectedYear] = useState(
    localStorage.getItem('selectedYear') || '0'
  ); 
  const [selectedGenre, setSelectedGenre] = useState(
    localStorage.getItem('selectedGenre') || '0'
  ); 
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage] = useState(10); 
  const [isSearching, setIsSearching] = useState(false); 
  const [ratings, setRatings] = useState({}); // Состояние для хранения рейтингов
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const navigate = useNavigate(); // Инициализируем useNavigate

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
        // Загружаем рейтинги из localStorage
        const storedRatings = localStorage.getItem('ratings');
        if (storedRatings) {
          setRatings(JSON.parse(storedRatings));
        }
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
    setCurrentPage(1); 
  }, [filteredMovies]); 

  // Сохраняем выбранный год и жанр в localStorage
  useEffect(() => {
    localStorage.setItem('selectedYear', selectedYear);
    localStorage.setItem('selectedGenre', selectedGenre);
    // Сохраняем рейтинги в localStorage
    localStorage.setItem('ratings', JSON.stringify(ratings));
  }, [selectedYear, selectedGenre, ratings]);

  useEffect(() => {
    // Проверяем наличие токена при инициализации
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    // Удаляем токен и отключаем авторизацию
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  const handleLoginSuccess = (token: string) => {
    // Функция для успешной авторизации
    setIsLoggedIn(true);
  };

  const handleYearChange = (year: string) => {
    setSelectedYear(year); 
  };

  const handleGenreChange = (genre: string) => {
    setSelectedGenre(genre); 
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleRatingChange = (movieId: number, rating: number) => {
    if (!isLoggedIn) {
      // Если пользователь не авторизован, показываем модальное окно
      setShowLoginModal(true);
      return; // Выходим из функции
    }

    // Если авторизован, обновляем рейтинги
    setRatings({ ...ratings, [movieId]: rating });
  };

  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = filteredMovies.slice(indexOfFirstMovie, indexOfLastMovie);

  const pageNumbers = [];
  const totalPages = Math.ceil(filteredMovies.length / moviesPerPage);
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handleMovieClick = (movieId: number) => {
    navigate(`/movie/${movieId}`);
  }

  return (
    <div>
      <Header />
      
      {isLoggedIn ? (
        <div>
          {/* Кнопка "Выйти" */}
          <button onClick={handleLogout}>Выйти</button>
        </div>
      ) : (
        <div>
          {/* Кнопка "Войти" */}
          <button onClick={() => setShowLoginModal(true)}>Войти</button>
          {showLoginModal && (
            <LoginModal
              onClose={() => setShowLoginModal(false)}
              onSuccessLogin={handleLoginSuccess}
            />
          )}
        </div>
      )}
      
      <FilterYears onYearChange={handleYearChange} /> 
      <FilterGenres onGenreChange={handleGenreChange}  /> 
      <FilmSearch setIsSearching={setIsSearching}/> 

      {isSearching ? ( 
        <div className='search-results'> 
        </div>
      ) : (
        <div>
          {currentMovies.map((movie) => (
            <div 
              key={movie.id} 
              className="movie-card"
              onClick={() => handleMovieClick(movie.id)} // Добавляем обработчик клика
            >
              <div className="movie-card-content">
              <h3 className='movie-title'>{movie.title}</h3>
                <div>
                  <div>
                    <p className='title-txt'>Жанр:</p>
                    <p>{movie.genre}</p>
                  </div>
                  <div>
                    <p>Год Выпуска:</p>
                    <p>{movie.release_year
                    }</p>
                  </div>
                  <div>
                    <p>Описание:</p>
                    <p>{movie.description}</p>
                  </div>
                  
                </div>
              </div>
              {isLoggedIn && (
              <Rating
                movieId={movie.id}
                initialRating={0} // Передаем начальный рейтинг
                onRatingChange={handleRatingChange} // Передаем handleRatingChange
              />
              )}
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
      
 
  );
}

export default MovieList;