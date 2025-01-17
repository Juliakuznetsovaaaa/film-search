### Особенности:

- Фильтр по годам: Пользователь может выбрать год выпуска фильма из выпадающего списка.
- Фильтр по жанру: Пользователь может выбрать жанр фильма из выпадающего списка.
- Поиск: Пользователь может искать фильмы по названию или актерам.
- Страницация: Список фильмов разбивается на страницы, чтобы избежать перегрузки.
- Рейтинг: Пользователь может оценить фильм, используя звезды.
- Авторизация: Пользователь должен авторизоваться, чтобы поставить оценку фильму.
- Модальное окно входа: Отображается при попытке поставить оценку без авторизации.
- Хранение данных: 
  - Выбранные фильтры сохраняются в localStorage.
  - Рейтинги пользователей хранятся в localStorage.

### Структура проекта:

- MovieList.js: Главный компонент списка фильмов.
- FilterYears.js: Компонент для фильтрации по годам.
- FilterGenres.js: Компонент для фильтрации по жанру.
- FilmSearch.js: Компонент для поиска фильмов.
- Header.js: Компонент для заголовка страницы.
- Rating.js: Компонент для отображения и изменения рейтинга.
- LoginModal.js: Компонент для модального окна входа.
- MovieCard.js: Компонент для отображения информации о фильме.

### Запуск приложения:

1. Запустите сервер командой npm start и npm run start:actors
2. Запустите команду npm run dev для запуска приложения.
