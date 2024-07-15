import { configureStore } from '@reduxjs/toolkit';
import selectedMoviesReducer from "./reducer/selectedMoviesSlice";

export const store = configureStore({
  reducer: {
    selectedMovies: selectedMoviesReducer,
  },
});
