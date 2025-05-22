// src/store/slices/cartSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../api/user/productData'; // Path to YOUR FULL Product interface
import { CartItem as ApiCartItem, userDataApi } from '../../api/user/userDataApi'; // Your mock API and its CartItem type

// Define the CartItem structure for the Redux store
// It will store full Product objects for easy display
export interface CartItem {
  product: Product; // Store the full Product object
  quantity: number;
}

interface CartState {
  items: CartItem[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: CartState = {
  items: [],
  status: 'idle',
  error: null,
};

// Placeholder for user ID - in a real app, get this from auth state
const MOCK_USER_ID = "user@example.com"; // Replace with actual user ID logic

// --- Async Thunks ---
export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (_, { rejectWithValue }) => {
    if (!MOCK_USER_ID) return rejectWithValue('User not authenticated');
    try {
      const apiCartItems: ApiCartItem[] = await userDataApi.getCart(MOCK_USER_ID);
      // Map ApiCartItem to our Redux CartItem (which includes full Product)
      // This requires an additional fetch or smarter data storage if ApiCartItem.product is just ProductSummary
      const cartItemsPromises = apiCartItems.map(async (item) => {
        // For demo, if item.product is ProductSummary, we fetch full details
        // In a real app, userDataApi.getCart might return richer product data or Product IDs to fetch
        let productDetails: Product;
        if ((item.product as Product).description === undefined) { // Heuristic: if it's just summary
          // This import is tricky inside thunk, better to pass getProductById or have it in userDataApi
          // For simplicity here, assuming item.product could be enriched Product or we adapt
          const { getProductById } = await import('../../api/user/productData'); // Dynamic import
          const p = await getProductById(item.product.id);
          if (!p) throw new Error(`Product ${item.product.id} not found`);
          productDetails = p;
        } else {
          productDetails = item.product as Product;
        }
        return { product: productDetails, quantity: item.quantity };
      });
      const resolvedCartItems = await Promise.all(cartItemsPromises);
      return resolvedCartItems;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Failed to fetch cart');
    }
  }
);

export const addProductToCart = createAsyncThunk(
  'cart/addProductToCart',
  async ({ product, quantity }: { product: Product; quantity: number }, { rejectWithValue }) => {
    if (!MOCK_USER_ID) return rejectWithValue('User not authenticated');
    try {
      // Call API: userDataApi.addToCart expects ProductSummary.
      // We have full Product, so we create a ProductSummary from it.
      const productSummary = { id: product.id, name: product.name, price: product.price, imageUrl: product.imageUrl, categoryId: product.categoryId, slug: 'slug' in product ? product.slug : undefined, description: product.description };
      const response = await userDataApi.addToCart(MOCK_USER_ID, productSummary, quantity);
      if (response.success && response.item) {
        // Return data needed to update the Redux store
        return { product, quantity }; // Return the full product for Redux store
      }
      return rejectWithValue(response.error || 'Failed to add product to cart API');
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unknown error occurred');
    }
  }
);

export const updateCartItemQuantity = createAsyncThunk(
  'cart/updateItemQuantity',
  async ({ productId, quantity }: { productId: string | number; quantity: number }, { rejectWithValue }) => {
    if (!MOCK_USER_ID) return rejectWithValue('User not authenticated');
    try {
      const response = await userDataApi.updateCartItemQuantity(MOCK_USER_ID, productId, quantity);
      if (response.success) {
        return { productId, quantity };
      }
      return rejectWithValue(response.error || 'Failed to update quantity API');
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unknown error occurred');
    }
  }
);

export const removeProductFromCart = createAsyncThunk(
  'cart/removeProductFromCart',
  async (productId: string | number, { rejectWithValue }) => {
    if (!MOCK_USER_ID) return rejectWithValue('User not authenticated');
    try {
      const response = await userDataApi.removeCartItem(MOCK_USER_ID, productId);
      if (response.success) {
        return productId;
      }
      return rejectWithValue('Failed to remove product from cart API');
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unknown error occurred');
    }
  }
);


const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Example: clear cart synchronously if needed (e.g., after successful order)
    clearCartLocal(state) {
      state.items = [];
      state.status = 'succeeded'; // Or 'idle'
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Cart
      .addCase(fetchCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCart.fulfilled, (state, action: PayloadAction<CartItem[]>) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      // Add Product to Cart
      .addCase(addProductToCart.fulfilled, (state, action: PayloadAction<{ product: Product; quantity: number }>) => {
        state.status = 'succeeded'; // Or keep 'idle' if no specific loading for add
        const { product, quantity } = action.payload;
        const existingItem = state.items.find(item => item.product.id === product.id);
        if (existingItem) {
          existingItem.quantity += quantity;
        } else {
          state.items.push({ product, quantity });
        }
      })
      .addCase(addProductToCart.rejected, (state, action) => { // Handle rejection if API call fails
        state.status = 'failed'; // Or don't change status, just log error
        state.error = action.payload as string;
        // Optimistic update would need reverting here
      })
      // Update Cart Item Quantity
      .addCase(updateCartItemQuantity.fulfilled, (state, action: PayloadAction<{ productId: string | number; quantity: number }>) => {
        state.status = 'succeeded';
        const { productId, quantity } = action.payload;
        const itemIndex = state.items.findIndex(item => item.product.id === productId);
        if (itemIndex !== -1) {
          if (quantity > 0) {
            state.items[itemIndex].quantity = quantity;
          } else {
            state.items.splice(itemIndex, 1); // Remove if quantity is 0 or less
          }
        }
      })
      // Remove Product from Cart
      .addCase(removeProductFromCart.fulfilled, (state, action: PayloadAction<string | number>) => {
        state.status = 'succeeded';
        state.items = state.items.filter(item => item.product.id !== action.payload);
      });
    // Add .pending and .rejected handlers for add, update, remove as needed for more robust error/loading UI
  },
});

export const { clearCartLocal } = cartSlice.actions;
export default cartSlice.reducer;