import ReactDOM from "react-dom/client";
import React from "react";
import MovieList from "./MovieList";
import FilterGenres from "./FilterGenres"
import FilterYears from "./FilterYears";

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <div>
      
      <MovieList />
    </div>
  );
} else {
  console.error("Could not find root element with id 'root'.");
}