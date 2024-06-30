import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Определяем сервис с базовым URL и ожидаемыми точками доступа
export const movieApi = createApi({
  reducerPath: 'movieApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3030/api/v1' }),
  endpoints: (builder) => ({
    getMovies: builder.query({
      query: ({ page, title, genre, year }) => ({
        url: '/search',
        params: { page, title, genre, year },
      }),
      transformResponse: (response: any) => response.search_result,
    }),
    getMovieById: builder.query<Movie, number>({ // <Movie, number>
      query: (id: number) => `/movie/${id}`,
    }),
  }),
});

// Экспортируем хуки для использования в функциональных компонентах, например:
export const { useGetMoviesQuery, useGetMovieByIdQuery } = movieApi;

// Интерфейс для данных о фильме
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
