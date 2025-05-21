import { Product } from "./productData";
  
  export interface FavoriteItem {
    id: string | number; // Unique ID for the favorite entry itself
    userId: string; // User's email
    product: Product;
    addedAt: Date;
  }
  
  export interface CartItem {
    id: string | number; // Unique ID for the cart item entry
    userId: string; // User's email
    product: Product;
    quantity: number;
    addedAt: Date;
  }
  
  // --- In-memory Mock Database ---
  let mockUserFavoritesDb: FavoriteItem[] = [];
  let mockUserCartDb: CartItem[] = [];
  //let nextFavoriteId = 1;
  let nextCartItemId = 1;
  
  // Example initial data (optional)
  if (import.meta.env.MODE === 'development') {
    const user1Email = "user@example.com";

    // You'd need to have some full Product objects available for seeding
    // For this example, I'll create very minimal Product objects.
    // In a real setup, these would be complete.
    const product1ForFav: Product = {
        id: 'p101', name: 'سماعات لاسلكية حديثة', price: 129.99, imageUrl: 'https://picsum.photos/seed/p101/300/200', categoryId: 1, description: 'وصف كامل هنا',
        // Add ALL other required fields for Product type here with dummy values
        images: [{id: 'p101_main', url: 'https://picsum.photos/seed/p101/300/200', altText: 'سماعات لاسلكية حديثة'}],
        stock: 10,
        // etc.
    };
    const product3ForFav: Product = {
        id: 'p103', name: 'لوحة مفاتيح ميكانيكية', price: 89.00, imageUrl: 'https://picsum.photos/seed/p103/300/200', categoryId: 1, description: 'وصف كامل هنا',
        images: [{id: 'p103_main', url: 'https://picsum.photos/seed/p103/300/200', altText: 'لوحة مفاتيح'}],
        stock: 5,
        // etc.
    };

    if (!mockUserFavoritesDb.some(f => f.userId === user1Email && f.product.id === product1ForFav.id)) {
        mockUserFavoritesDb.push({
            id: product1ForFav.id, // Use product ID as favorite ID for simplicity here
            userId: user1Email,
            product: product1ForFav, // Store the full product
            addedAt: new Date()
        });
    }
    if (!mockUserFavoritesDb.some(f => f.userId === user1Email && f.product.id === product3ForFav.id)) {
        mockUserFavoritesDb.push({
            id: product3ForFav.id,
            userId: user1Email,
            product: product3ForFav,
            addedAt: new Date()
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
        }, 100);
      });
    },
  
    // addFavorite now expects a full Product object
    async addFavorite(userId: string, productToAdd: Product): Promise<{ success: boolean, item?: FavoriteItem, error?: string }> {
      return new Promise((resolve) => {
        setTimeout(() => {
          if (mockUserFavoritesDb.some(fav => fav.userId === userId && fav.product.id === productToAdd.id)) {
            resolve({ success: false, error: 'already-favorited' });
            return;
          }
          const newFavorite: FavoriteItem = {
            id: productToAdd.id, // Use product ID as favorite ID
            userId,
            product: productToAdd, // Store the full product object
            addedAt: new Date(),
          };
          mockUserFavoritesDb.push(newFavorite);
          console.log('Added to favorites DB:', newFavorite);
          resolve({ success: true, item: newFavorite });
        }, 100);
      });
    },
  
    async removeFavorite(userId: string, productId: string | number): Promise<{ success: boolean }> {
      return new Promise((resolve) => {
        setTimeout(() => {
          const initialLength = mockUserFavoritesDb.length;
          mockUserFavoritesDb = mockUserFavoritesDb.filter(
            fav => !(fav.userId === userId && fav.product.id.toString() === productId.toString())
          );
          console.log('Removed from favorites DB, new length:', mockUserFavoritesDb.length);
          resolve({ success: mockUserFavoritesDb.length < initialLength });
        }, 100);
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
  
    async addToCart(userId: string, product: Product, quantity: number = 1): Promise<{ success: boolean, item?: CartItem, error?: string }> {
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