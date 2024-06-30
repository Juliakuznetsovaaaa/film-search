import React, { useState } from 'react';

const GENRES: Record<string, string> = { 
  '0': 'Не выбран',
  comedy: 'Комедия',
  drama: 'Драма',
  action: 'Боевик',
  thriller: 'Триллер',
  horror: 'Ужасы',
  family: 'Семейный',
  cartoon: 'Анимированный',
  fantasy: 'Фэнтези',
  romance: 'Романтика',
  adventure: 'Приключения',
  musical: 'Мьюзикл',
  war: 'Военный',
};

function FilterGenres({ onGenreChange }: { onGenreChange: (genre: string) => void   }) {
  const [selectedGenre, setSelectedGenre] = useState('0');

  return (
    <div className="year">
      <h3 className="year__title">Жанр</h3>
      <select value={selectedGenre} onChange={(e) => {
        setSelectedGenre(e.target.value);
        const selectedGenreKey = e.target.value;
        const genreValue = GENRES[selectedGenreKey];
        onGenreChange(genreValue);
      }}>
        {Object.entries(GENRES).map(([key, value]) => (
          <option key={key} value={key}>
            {value}
          </option>
        ))}
      </select>
    </div>
  );
}

export default FilterGenres;
