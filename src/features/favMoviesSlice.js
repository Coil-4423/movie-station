import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    movies: [],
    total: 0
}

const getIndex = (arr, id) => {
    return arr.findIndex(movie => movie.id === id)
}

export const favMoviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        addMovies: (state, action) => {

            state.movies = [...state.movies, action.payload];
            state.total = state.total + action.payload.price
        },
        deleteMovies: (state, action) => {

            state.movies.splice(getIndex(state.movies, action.payload), 1);
            state.total = state.total - action.payload.price;
        },
    },
});

// action creators are generated for each case reducer function
export const { addMovies, deleteMovies } = favMoviesSlice.actions;

export default favMoviesSlice.reducer;
