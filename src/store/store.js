import {configureStore} from '@reduxjs/toolkit'
import favMovieReducer from '../features/favMoviesSlice'

export const store = configureStore({
    reducer: {
        favMovie:favMovieReducer,
    },
})