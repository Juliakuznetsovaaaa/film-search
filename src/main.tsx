import ReactDOM from "react-dom/client";
import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Импортируем компоненты маршрутизации
import MovieList from "./features/movie/MovieList";
import MoviePage from "./features/movie/MoviePage";
import { Provider } from 'react-redux';

import { store } from "./app/store"; // Импортируйте ваш магазин Redux
import App from './App';

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <Provider store={store}> 
      <App /> 
    </Provider>
  );
} else {
  console.error("Не удалось найти корневой элемент с id 'root'.");
}