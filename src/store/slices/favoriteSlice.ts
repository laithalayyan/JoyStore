import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../api/user/productData';
import { userDataApi } from '../../api/user/userDataApi';

interface FavoritesState {
  items: Product[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: FavoritesState = {
  items: [],
  status: 'idle',
  error: null,
};

const MOCK_USER_ID = "user@example.com";

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    setFavorites(state, action: PayloadAction<Product[]>) {
      state.items = action.payload;
      state.status = 'succeeded';
    },
    addFavoriteOptimistic(state, action: PayloadAction<Product>) {
      const existing = state.items.find(item => item.id === action.payload.id);
      if (!existing) {
        state.items.push(action.payload);
      }
    },
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

import { AppDispatch } from '../store';

export const fetchFavorites = () => async (dispatch: AppDispatch) => {
  if (!MOCK_USER_ID) return;
  dispatch(setFavoritesLoading());
  try {
    const favItems = await userDataApi.getFavorites(MOCK_USER_ID);
    dispatch(setFavorites(favItems.map(item => item.product)));
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    dispatch(setFavoritesError(errorMessage));
  }
};

export const addProductToFavorites = (product: Product) => async (dispatch: AppDispatch) => {
  if (!MOCK_USER_ID) return;
  dispatch(addFavoriteOptimistic(product));
  try {
    const response = await userDataApi.addFavorite(MOCK_USER_ID, product);
    if (!response.success) {
      dispatch(removeFavoriteOptimistic(product.id));
      dispatch(setFavoritesError(response.error || 'Failed to add favorite'));
    }
  } catch (error: unknown) {
    dispatch(removeFavoriteOptimistic(product.id));
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    dispatch(setFavoritesError(errorMessage));
  }
};

export const removeProductFromFavorites = (productId: string | number) => async (dispatch: AppDispatch, getState: () => { favorites: FavoritesState }) => {
  if (!MOCK_USER_ID) return;
  const originalItems = getState().favorites.items;
  const productToRemove = originalItems.find((p: Product) => p.id === productId);

  dispatch(removeFavoriteOptimistic(productId));
  try {
    const response = await userDataApi.removeFavorite(MOCK_USER_ID, productId);
    if (!response.success) {
      if (productToRemove) dispatch(addFavoriteOptimistic(productToRemove));
      dispatch(setFavoritesError('Failed to remove favorite'));
    }
  } catch (error: unknown) {
    if (productToRemove) dispatch(addFavoriteOptimistic(productToRemove));
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    dispatch(setFavoritesError(errorMessage));
  }
};

export default favoritesSlice.reducer;
