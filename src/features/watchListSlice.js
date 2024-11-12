import { createSlice } from '@reduxjs/toolkit';
import { appStorageName } from '../globals/globalVariables';

function getMoviesFromLocalStorage() {
  const WatchListFromStorage = localStorage.getItem(appStorageName);
  console.log(WatchListFromStorage);
  if (WatchListFromStorage === null) {
    return {
      movies: [],
      total: 0
    };
  }

  return JSON.parse(WatchListFromStorage);
}

const WatchListFromStorage = getMoviesFromLocalStorage();

const initialState = {
  movies: WatchListFromStorage.movies,
  total: WatchListFromStorage.total
};

const getIndex = (arr, id) => {
  return arr.findIndex(movie => movie.id === id);
};

export const WatchListSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    addToWatchList: (state, action) => {
      const existingIndex = getIndex(state.movies, action.payload.id);
      if (existingIndex === -1) {
        state.movies = [...state.movies, action.payload];
        state.total += 1;
      }
    },
    deleteFromWatchList: (state, action) => {
      const index = getIndex(state.movies, action.payload.id);
      if (index !== -1) {
        state.total -= 1;
        state.movies.splice(index, 1);
      }
    }
  },
});

export const { addToWatchList, deleteFromWatchList } = WatchListSlice.actions;

export default WatchListSlice.reducer;