import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedMovies: [],
};

export const selectedMoviesSlice = createSlice({
  name: 'selectedMovies',
  initialState,
  reducers: {
    addSelectedMovie: (state, action) => {
      state.selectedMovies.push(action.payload);
    }
  },
});

export const { addSelectedMovie } = selectedMoviesSlice.actions;

export default selectedMoviesSlice.reducer;
