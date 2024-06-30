import ReactDOM from "react-dom/client";
import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Импортируем компоненты маршрутизации
import MovieList from "./MovieList";
import MoviePage from './MoviePage'; // Импортируем MoviePage

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <BrowserRouter> {/* Оборачиваем наше приложение в BrowserRouter */}
      <Routes>
        <Route path="/" element={<MovieList />} /> {/* Маршрут для корневого компонента */}
        <Route path="/movie/:id" element={<MoviePage />} /> {/* Маршрут для MoviePage с параметром id */}
      </Routes>
    </BrowserRouter>
  );
} else {
  console.error("Could not find root element with id 'root'.");
}

