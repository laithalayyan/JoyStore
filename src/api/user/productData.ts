// src/api/user/productData.ts

export interface Product {
    id: string | number;
    name: string;
    price: number;
    imageUrl: string;
    categoryId: string | number; // To link products to categories
    description?: string;
    // Add other relevant fields: rating, stock, variants etc.
  }
  
  export interface CategoryWithProducts {
    id: string | number;
    name: string;
    slug: string;
    icon?: string;
    products: Product[];
  }
  
  // --- DUMMY DATA ---
  
  const electronicsProducts: Product[] = [
    { id: 'p101', name: 'سماعات لاسلكية حديثة', price: 129.99, imageUrl: 'https://picsum.photos/seed/p101/400/300', categoryId: 1 },
    { id: 'p102', name: 'شاشة كمبيوتر 27 بوصة 4K', price: 349.50, imageUrl: 'https://picsum.photos/seed/p102/400/300', categoryId: 1 },
    { id: 'p103', name: 'لوحة مفاتيح ميكانيكية RGB', price: 89.00, imageUrl: 'https://picsum.photos/seed/p103/400/300', categoryId: 1 },
    { id: 'p104', name: 'ماوس ألعاب لاسلكي', price: 49.99, imageUrl: 'https://picsum.photos/seed/p104/400/300', categoryId: 1 },
    { id: 'p105', name: 'جهاز لوحي 10 بوصة', price: 199.00, imageUrl: 'https://picsum.photos/seed/p105/400/300', categoryId: 1 },
  ];
  
  const mensFashionProducts: Product[] = [
    { id: 'p201', name: 'قميص قطني كاجوال', price: 25.99, imageUrl: 'https://picsum.photos/seed/p201/400/300', categoryId: 2 },
    { id: 'p202', name: 'بنطلون جينز سليم فيت', price: 45.00, imageUrl: 'https://picsum.photos/seed/p202/400/300', categoryId: 2 },
    { id: 'p203', name: 'سترة رياضية بغطاء للرأس', price: 39.99, imageUrl: 'https://picsum.photos/seed/p203/400/300', categoryId: 2 },
    { id: 'p204', name: 'حذاء رياضي للجري', price: 79.50, imageUrl: 'https://picsum.photos/seed/p204/400/300', categoryId: 2 },
  ];
  
  const homeKitchenProducts: Product[] = [
    { id: 'p301', name: 'ماكينة صنع القهوة', price: 65.00, imageUrl: 'https://picsum.photos/seed/p301/400/300', categoryId: 4 },
    { id: 'p302', name: 'طقم أواني طهي غير لاصقة', price: 120.00, imageUrl: 'https://picsum.photos/seed/p302/400/300', categoryId: 4 },
    { id: 'p303', name: 'خلاط كهربائي متعدد السرعات', price: 55.99, imageUrl: 'https://picsum.photos/seed/p303/400/300', categoryId: 4 },
  ];
  
  
  export const dummyCategoriesWithProducts: CategoryWithProducts[] = [
    { id: 1, name: 'إلكترونيات', slug: 'electronics', icon: 'pi pi-desktop', products: electronicsProducts },
    { id: 2, name: 'ملابس رجالية', slug: 'mens-fashion', icon: 'pi pi-user', products: mensFashionProducts },
    { id: 3, name: 'ملابس نسائية', slug: 'womens-fashion', icon: 'pi pi-female', products: [] }, // Example: empty for now
    { id: 4, name: 'المنزل والمطبخ', slug: 'home-kitchen', icon: 'pi pi-home', products: homeKitchenProducts },
    { id: 5, name: 'الجمال والعناية الشخصية', slug: 'beauty-personal-care', icon: 'pi pi-heart', products: [] },
    { id: 6, name: 'كتب', slug: 'books', icon: 'pi pi-book', products: [] },
    { id: 7, name: 'ألعاب الفيديو', slug: 'video-games', icon: 'pi pi-prime', products: [] },
  ];
  
  // API-like function to get all products (for category page later)
  export const getProductsByCategoryId = async (categoryId: string | number): Promise<Product[]> => {
    return new Promise(resolve => {
      setTimeout(() => {
        const category = dummyCategoriesWithProducts.find(cat => cat.id.toString() === categoryId.toString());
        resolve(category ? category.products : []);
      }, 300); // Simulate API delay
    });
  };
  
  export const getCategoryDetailsBySlug = async (slug: string): Promise<CategoryWithProducts | undefined> => {
       return new Promise(resolve => {
          setTimeout(() => {
              resolve(dummyCategoriesWithProducts.find(cat => cat.slug === slug));
          }, 200);
      });
  }