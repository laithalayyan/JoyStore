// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from './slices/favoriteSlice';
// Import other reducers here if you have them (e.g., cart, auth)

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    // cart: cartReducer,
    // auth: authReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;