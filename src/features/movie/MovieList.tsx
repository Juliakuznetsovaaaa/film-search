import React, { useState, useEffect } from 'react';
import FilterYears from './FilterYears';
import FilterGenres from './FilterGenres';
import './MovieList.css';
import FilmSearch from './FilmSearch';
import Header from './Header';
import Rating from './Rating'; 
import LoginModal from '../auth/LoginModal';
import { useNavigate } from 'react-router-dom'; 
import MovieCard from './MovieCard';

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
  const [ratings, setRatings] = useState({}); 
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const navigate = useNavigate();

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

  useEffect(() => {
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

  useEffect(() => {
    setCurrentPage(1); 
  }, [filteredMovies]); 

  useEffect(() => {
    localStorage.setItem('selectedYear', selectedYear);
    localStorage.setItem('selectedGenre', selectedGenre);
    localStorage.setItem('ratings', JSON.stringify(ratings));
  }, [selectedYear, selectedGenre, ratings]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  const handleLoginSuccess = (token: string) => {
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

  // Функция для отправки рейтинга на сервер
  const handleRatingChange = async (movieId: number, rating: number) => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }

 
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
    <div className='global-content'>
      <Header />
      <div className='main'>
      {isLoggedIn ? (
        <div>
          <button className='logout-btn' onClick={handleLogout}>Выйти</button>
        </div>
      ) : (
        <div>
          <button className='login-btn' onClick={() => setShowLoginModal(true)}>Войти</button>
          {showLoginModal && (
            <LoginModal
              onClose={() => setShowLoginModal(false)}
              onSuccessLogin={handleLoginSuccess}
            />
          )}
        </div>
      )}
      <div className='main-content'>
      <div>
        <FilterYears onYearChange={handleYearChange} /> 
        <FilterGenres onGenreChange={handleGenreChange}  /> 
      </div>
      <div>
      <FilmSearch setIsSearching={setIsSearching} isLoggedIn={isLoggedIn} onRatingChange={handleRatingChange}/> 

{isSearching ? (
  <div className='search-results'>
  </div>
) : (
  <div>
    {currentMovies.map((movie) => (
      <MovieCard
        key={movie.id}
        movie={movie}
        isLoggedIn={isLoggedIn}
        onRatingChange={handleRatingChange}
      />
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
      </div>
      </div>
      
 
  );
}

export default MovieList;