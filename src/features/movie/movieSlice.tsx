import { createSlice } from '@reduxjs/toolkit';

interface MovieState {
  selectedYear: string;
  selectedGenre: string;
  currentPage: number;
  isSearching: boolean;
  ratings: { [movieId: number]: number };
  isLoggedIn: boolean;
}

const initialState: MovieState = {
  selectedYear: '0',
  selectedGenre: '0',
  currentPage: 1,
  isSearching: false,
  ratings: {},
  isLoggedIn: false,
};

const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    setYear: (state, action) => {
      state.selectedYear = action.payload;
    },
    setGenre: (state, action) => {
      state.selectedGenre = action.payload;
    },
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setSearch: (state, action) => {
      state.isSearching = action.payload;
    },
    setRating: (state, action) => {
      const { movieId, rating } = action.payload;
      state.ratings[movieId] = rating;
    },
    setLogin: (state, action) => {
      state.isLoggedIn = action.payload;
    },
  },
});

export const {
  setYear,
  setGenre,
  setPage,
  setSearch,
  setRating,
  setLogin,
} = movieSlice.actions;

export const selectSelectedYear = (state: { movie: MovieState }) =>
  state.movie.selectedYear;
export const selectSelectedGenre = (state: { movie: MovieState }) =>
  state.movie.selectedGenre;
export const selectCurrentPage = (state: { movie: MovieState }) =>
  state.movie.currentPage;
export const selectIsSearching = (state: { movie: MovieState }) =>
  state.movie.isSearching;
export const selectRatings = (state: { movie: MovieState }) =>
  state.movie.ratings;
export const selectIsLoggedIn = (state: { movie: MovieState }) =>
  state.movie.isLoggedIn;

export default movieSlice.reducer;
