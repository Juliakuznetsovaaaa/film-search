import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MovieList from './features/movie/MovieList';
import MoviePage from './features/movie/MoviePage';
import LoginModal from './features/auth/LoginModal';
import {
  selectIsLoggedIn,
  setLogin,
} from './features/movie/movieSlice';

import { Provider } from 'react-redux';
import { store } from './app/store'; 

const App: React.FC = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    // Проверяем наличие токена при инициализации
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(setLogin(true));
    }
  }, [dispatch]);

  const handleLoginSuccess = () => {
    // Функция для успешной авторизации
    dispatch(setLogin(true));
  };
  const handleClose = () => {
    // Логика для закрытия модального окна
  };

  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<MovieList />} />
            <Route path="/movie/:movieId" element={<MoviePage />} />
          </Routes>

          
        </div>
      </Router>
    </Provider>
  );
};

export default App;
