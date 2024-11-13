// import { createSlice } from '@reduxjs/toolkit';
// import { appStorageName } from '../globals/globalVariables';

// function getMoviesFromLocalStorage() {
//   const favMoviesFromStorage = localStorage.getItem(appStorageName);
//   console.log(favMoviesFromStorage);
//   if (favMoviesFromStorage === null) {
//     return {
//       movies: [],
//       total: 0
//     };
//   }

//   return JSON.parse(favMoviesFromStorage);
// }

// const favMoviesFromStorage = getMoviesFromLocalStorage();

// const initialState = {
//   movies: favMoviesFromStorage.movies,
//   total: favMoviesFromStorage.total
// };

// const getIndex = (arr, id) => {
//   return arr.findIndex(movie => movie.id === id);
// };

// export const favMoviesSlice = createSlice({
//   name: 'detailed',
//   initialState,
//   reducers: {
//     addMovies: (state, action) => {
//       const existingIndex = getIndex(state.movies, action.payload.id);
//       if (existingIndex === -1) {
//         state.movies = [...state.movies, action.payload];
//         state.total += 1;
//       }
//     },
//     deleteMovies: (state, action) => {
//       const index = getIndex(state.movies, action.payload.id);
//       if (index !== -1) {
//         state.total -= 1;
//         state.movies.splice(index, 1);
//       }
//     }
//   },
// });

// export const { addMovies, deleteMovies } = favMoviesSlice.actions;

// export default favMoviesSlice.reducer;