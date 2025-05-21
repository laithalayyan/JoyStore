// src/store/slices/favoritesSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../api/user/productData'; // Path to YOUR Product interface
import { userDataApi } from '../../api/user/userDataApi'; // Your mock API

interface FavoritesState {
  items: Product[]; // Store an array of full Product objects
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: FavoritesState = {
  items: [],
  status: 'idle',
  error: null,
};

// Placeholder for user ID - in a real app, get this from auth state
const MOCK_USER_ID = "user@example.com"; // Replace with actual user ID logic

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    // Reducer to directly set favorites (e.g., after fetching)
    setFavorites(state, action: PayloadAction<Product[]>) {
      state.items = action.payload;
      state.status = 'succeeded';
    },
    // Reducer for adding a favorite (optimistic update)
    addFavoriteOptimistic(state, action: PayloadAction<Product>) {
      const existing = state.items.find(item => item.id === action.payload.id);
      if (!existing) {
        state.items.push(action.payload);
      }
    },
    // Reducer for removing a favorite (optimistic update)
    removeFavoriteOptimistic(state, action: PayloadAction<string | number>) {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    setFavoritesLoading(state) {
        state.status = 'loading';
    },
    setFavoritesError(state, action: PayloadAction<string>) {
        state.status = 'failed';
        state.error = action.payload;
    }
  },
});

export const {
    setFavorites,
    addFavoriteOptimistic,
    removeFavoriteOptimistic,
    setFavoritesLoading,
    setFavoritesError
} = favoritesSlice.actions;

// Thunks for async operations
import { AppDispatch } from '../store'; // Adjust the path to your store file

export const fetchFavorites = () => async (dispatch: AppDispatch) => { // Use AppDispatch type
  if (!MOCK_USER_ID) return; // Or get user from auth state
  dispatch(setFavoritesLoading());
  try {
    const favItems = await userDataApi.getFavorites(MOCK_USER_ID);
    dispatch(setFavorites(favItems.map(item => item.product))); // Extract product objects
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    dispatch(setFavoritesError(errorMessage));
  }
};

export const addProductToFavorites = (product: Product) => async (dispatch: AppDispatch) => {
  if (!MOCK_USER_ID) return;
  dispatch(addFavoriteOptimistic(product)); // Optimistic update
  try {
    const response = await userDataApi.addFavorite(MOCK_USER_ID, product);
    if (!response.success) {
      // Revert optimistic update or show error
      dispatch(removeFavoriteOptimistic(product.id)); // Revert
      dispatch(setFavoritesError(response.error || 'Failed to add favorite'));
      // console.error("Failed to add favorite to API:", response.error);
    }
  } catch (error: unknown) {
    dispatch(removeFavoriteOptimistic(product.id)); // Revert on any error
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    dispatch(setFavoritesError(errorMessage));
  }
};

export const removeProductFromFavorites = (productId: string | number) => async (dispatch: AppDispatch, getState: () => { favorites: FavoritesState }) => {
    if (!MOCK_USER_ID) return;
    const originalItems = getState().favorites.items;
    const productToRemove = originalItems.find((p: Product) => p.id === productId);

    dispatch(removeFavoriteOptimistic(productId)); // Optimistic update
    try {
        const response = await userDataApi.removeFavorite(MOCK_USER_ID, productId);
        if (!response.success) {
            if (productToRemove) dispatch(addFavoriteOptimistic(productToRemove)); // Revert
            dispatch(setFavoritesError('Failed to remove favorite'));
            // console.error("Failed to remove favorite from API");
        }
    } catch (error: unknown) {
        if (productToRemove) dispatch(addFavoriteOptimistic(productToRemove)); // Revert
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        dispatch(setFavoritesError(errorMessage));
    }
};


export default favoritesSlice.reducer;