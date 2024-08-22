// import {configureStore} from '@reduxjs/toolkit'
// import {persistReducer, persistStore} from 'redux-persist'
// import favMovieReducer from '../features/favMoviesSlice'

// export const store = configureStore({
//     reducer: {
//         favMovie:favMovieReducer,
//     },
// })

import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import favMovieReducer from '../features/favMoviesSlice';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  favMovie: favMovieReducer,
  // Add other reducers if needed
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types to prevent warnings in the console
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);
