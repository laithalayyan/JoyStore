// src/api/user/userDataApi.ts

// --- Types ---
export interface ProductSummary {
    id: string | number;
    name: string;
    price: number;       // ADDED
  imageUrl: string;    // ADDED
  slug?: string; 
  categoryId: string | number; // Category ID for the product
    // Add other relevant product summary fields like image, price if needed
  }
  
  export interface FavoriteItem {
    id: string | number; // Unique ID for the favorite entry itself
    userId: string; // User's email
    product: ProductSummary;
    addedAt: Date;
  }
  
  export interface CartItem {
    id: string | number; // Unique ID for the cart item entry
    userId: string; // User's email
    product: ProductSummary;
    quantity: number;
    addedAt: Date;
  }
  
  // --- In-memory Mock Database ---
  let mockUserFavoritesDb: FavoriteItem[] = [];
  let mockUserCartDb: CartItem[] = [];
  let nextFavoriteId = 1;
  let nextCartItemId = 1;
  
  // Example initial data (optional)
  if (import.meta.env.MODE === 'development') {
    const user1Email = "user@example.com";
    // Example: If you have full product data elsewhere, reference it.
    // Otherwise, add dummy price/imageUrl here.
    const product1Summary: ProductSummary = {
      id: 'p101',
      name: 'سماعات لاسلكية حديثة',
      price: 129.99,
      imageUrl: 'https://picsum.photos/seed/p101/300/200',
      categoryId: 1, // Assign a category ID
      slug: 'headphones-xyz'
    };
    const product2Summary: ProductSummary = {
      id: 'p201',
      name: 'قميص قطني كاجوال',
      price: 25.99,
      imageUrl: 'https://picsum.photos/seed/p201/300/200',
      categoryId: 2, // Assign a category ID
      slug: 'cotton-shirt-abc'
    };
    const product3Summary: ProductSummary = {
      id: 'p103',
      name: 'لوحة مفاتيح ميكانيكية',
      price: 89.00,
      imageUrl: 'https://picsum.photos/seed/p103/300/200',
      categoryId: 1, // Assign a category ID
      slug: 'keyboard-rgb'
    };

    // Update seeding for favorites
    if (!mockUserFavoritesDb.some(f => f.userId === user1Email && f.product.id === product1Summary.id)) {
        mockUserFavoritesDb.push({
            id: nextFavoriteId++, userId: user1Email, product: product1Summary, addedAt: new Date()
        });
    }
    if (!mockUserFavoritesDb.some(f => f.userId === user1Email && f.product.id === product3Summary.id)) {
         mockUserFavoritesDb.push({
            id: nextFavoriteId++, userId: user1Email, product: product3Summary, addedAt: new Date()
        });
    }

    // Update seeding for cart
    if (!mockUserCartDb.some(c => c.userId === user1Email && c.product.id === product2Summary.id)) {
        mockUserCartDb.push({
            id: nextCartItemId++, userId: user1Email, product: product2Summary, quantity: 1, addedAt: new Date()
        });
    }
}
  
  
  // --- API Functions ---
  export const userDataApi = {
    // --- Favorites ---
    async getFavorites(userId: string): Promise<FavoriteItem[]> {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(mockUserFavoritesDb.filter(fav => fav.userId === userId));
        }, 300);
      });
    },
  
    async addFavorite(userId: string, productData: ProductSummary): Promise<{ success: boolean, item?: FavoriteItem, error?: string }> {
      return new Promise((resolve) => {
        setTimeout(() => {
          if (mockUserFavoritesDb.some(fav => fav.userId === userId && fav.product.id === productData.id)) {
            resolve({ success: false, error: 'already-favorited' });
            return;
          }
          const newFavorite: FavoriteItem = {
            id: `fav-${nextFavoriteId++}`,
            userId,
            product: productData, // Store the ProductSummary
            addedAt: new Date(),
          };
          mockUserFavoritesDb.push(newFavorite);
          resolve({ success: true, item: newFavorite });
        }, 300);
      });
    },
  
    async removeFavorite(userId: string, productId: string | number): Promise<{ success: boolean }> {
      return new Promise((resolve) => {
        setTimeout(() => {
          const initialLength = mockUserFavoritesDb.length;
          mockUserFavoritesDb = mockUserFavoritesDb.filter(
            fav => !(fav.userId === userId && fav.product.id === productId)
          );
          resolve({ success: mockUserFavoritesDb.length < initialLength });
        }, 300);
      });
    },
  
    // --- Cart ---
    async getCart(userId: string): Promise<CartItem[]> {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(mockUserCartDb.filter(item => item.userId === userId));
        }, 300);
      });
    },
  
    async addToCart(userId: string, product: ProductSummary, quantity: number = 1): Promise<{ success: boolean, item?: CartItem, error?: string }> {
      return new Promise((resolve) => {
        setTimeout(() => {
          const existingItemIndex = mockUserCartDb.findIndex(
            item => item.userId === userId && item.product.id === product.id
          );
  
          if (existingItemIndex > -1) {
            // Update quantity if item already in cart
            mockUserCartDb[existingItemIndex].quantity += quantity;
            resolve({ success: true, item: mockUserCartDb[existingItemIndex] });
          } else {
            // Add new item to cart
            const newCartItem: CartItem = {
              id: `cart-${nextCartItemId++}`,
              userId,
              product,
              quantity,
              addedAt: new Date(),
            };
            mockUserCartDb.push(newCartItem);
            resolve({ success: true, item: newCartItem });
          }
        }, 300);
      });
    },
  
    async updateCartItemQuantity(userId: string, productId: string | number, newQuantity: number): Promise<{ success: boolean, item?: CartItem, error?: string }> {
      return new Promise((resolve) => {
        setTimeout(() => {
          const itemIndex = mockUserCartDb.findIndex(
            item => item.userId === userId && item.product.id === productId
          );
          if (itemIndex > -1) {
            if (newQuantity <= 0) {
              // Remove item if quantity is 0 or less
              mockUserCartDb.splice(itemIndex, 1);
              resolve({ success: true });
            } else {
              mockUserCartDb[itemIndex].quantity = newQuantity;
              resolve({ success: true, item: mockUserCartDb[itemIndex] });
            }
          } else {
            resolve({ success: false, error: 'item-not-found' });
          }
        }, 300);
      });
    },
  
    async removeCartItem(userId: string, productId: string | number): Promise<{ success: boolean }> {
      return new Promise((resolve) => {
        setTimeout(() => {
          const initialLength = mockUserCartDb.length;
          mockUserCartDb = mockUserCartDb.filter(
            item => !(item.userId === userId && item.product.id === productId)
          );
          resolve({ success: mockUserCartDb.length < initialLength });
        }, 300);
      });
    },
  
    async clearCart(userId: string): Promise<{ success: boolean }> {
      return new Promise((resolve) => {
          setTimeout(() => {
              mockUserCartDb = mockUserCartDb.filter(item => item.userId !== userId);
              resolve({ success: true });
          }, 300);
      });
    }
  };