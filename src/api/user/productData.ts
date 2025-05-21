// src/api/user/productData.ts

// Interface for additional product images
export interface ProductImage {
  id: string | number;
  url: string;
  altText?: string;
}

// Example interface for product variants (like size or color)
export interface ProductVariant {
  id: string | number;
  name: string; // e.g., "المقاس", "اللون"
  options: string[]; // e.g., ["S", "M", "L"] or ["أحمر", "أزرق"]
}

// Enhanced Product interface for more details
export interface Product {
  id: string | number;
  name: string;
  price: number;
  originalPrice?: number; // For showing discounts (e.g., 159.99)
  imageUrl: string; // Main image for card views and default for product page
  images?: ProductImage[]; // Array of additional images for the product page gallery
  categoryId: string | number;
  categoryName?: string; // Denormalized category name for convenience
  description: string; // Full product description (can be HTML)
  shortDescription?: string; // A brief summary
  sku?: string;
  stock?: number; // Available stock
  rating?: number; // Average star rating (e.g., 4.5)
  numberOfReviews?: number; // Total number of reviews
  variants?: ProductVariant[]; // Product variants like size, color
  // Add any other fields you might need: brand, weight, dimensions, specifications_table, etc.
}

// Interface for categories that also holds its products (as you had)
export interface CategoryWithProducts {
  id: string | number;
  name: string;
  slug: string;
  icon?: string;
  products: Product[]; // Uses the enhanced Product interface
}


// --- DUMMY DATA ---

// More detailed product data for specific products, especially those you'll test on the Product Detail Page
const detailedProductsList: Product[] = [
  {
    id: 'p101', // Must match an ID from one of the category product lists if you want to navigate to it
    name: 'سماعات لاسلكية حديثة مع خاصية إلغاء الضوضاء الفائقة',
    price: 129.99,
    originalPrice: 159.99,
    imageUrl: 'https://picsum.photos/seed/p101main/600/800', // Main image, perhaps a portrait orientation
    images: [
      { id: 'p101_img1', url: 'https://picsum.photos/seed/p101a/800/1000', altText: 'عرض جانبي للسماعات' },
      { id: 'p101_img2', url: 'https://picsum.photos/seed/p101b/800/1000', altText: 'السماعات مع علبة الشحن' },
      { id: 'p101_img3', url: 'https://picsum.photos/seed/p101c/800/1000', altText: 'تفاصيل وسائد الأذن' },
      { id: 'p101_img4', url: 'https://picsum.photos/seed/p101d/800/1000', altText: 'مستخدم يستمتع بالسماعات' },
    ],
    categoryId: 1,
    categoryName: 'إلكترونيات',
    description: '<p>استمتع بتجربة صوتية لا مثيل لها مع سماعات الرأس اللاسلكية المتطورة هذه. مصممة لتقديم أنقى درجات الصوت مع خاصية إلغاء الضوضاء النشطة (ANC) التي تعزلك عن العالم الخارجي. بطارية تدوم حتى 30 ساعة من التشغيل المتواصل.</p><ul><li>تقنية Bluetooth 5.2 لاتصال ثابت وسريع.</li><li>وسائد أذن مريحة من الإسفنج الذكي.</li><li>ميكروفون مدمج عالي الوضوح للمكالمات.</li><li>تحكم باللمس سهل الاستخدام.</li></ul>',
    shortDescription: 'سماعات لاسلكية فاخرة بخاصية إلغاء الضوضاء النشطة وبطارية طويلة الأمد.',
    sku: 'HP-ANC-BLK-01',
    stock: 25,
    rating: 4.8,
    numberOfReviews: 250,
    variants: [
        {id: 'v_color_p101', name: 'اللون', options: ['أسود ملكي', 'فضي لامع', 'أزرق ليلي']}
    ]
  },
  {
    id: 'p201', // Must match an ID from one of the category product lists
    name: 'قميص رجالي كلاسيكي من الكتان الفاخر',
    price: 35.50,
    originalPrice: 45.00,
    imageUrl: 'https://picsum.photos/seed/p201main/600/800',
    images: [
      { id: 'p201_img1', url: 'https://picsum.photos/seed/p201a/800/1000', altText: 'عرض أمامي للقميص' },
      { id: 'p201_img2', url: 'https://picsum.photos/seed/p201b/800/1000', altText: 'تفاصيل ياقة القميص' },
      { id: 'p201_img3', url: 'https://picsum.photos/seed/p201c/800/1000', altText: 'القميص على موديل' },
    ],
    categoryId: 2,
    categoryName: 'ملابس رجالية',
    description: '<p>أضف لمسة من الأناقة إلى خزانة ملابسك مع هذا القميص الكلاسيكي المصنوع من الكتان النقي. مثالي للأجواء الحارة بفضل نسيجه المسامي والمريح. تصميم بسيط بأزرار أمامية وياقة تقليدية.</p><p>متوفر بعدة مقاسات لضمان أفضل ملاءمة.</p>',
    shortDescription: 'قميص كتان رجالي أنيق ومريح، مثالي للصيف.',
    sku: 'SHIRT-LIN-NAV-M',
    stock: 70,
    rating: 4.6,
    numberOfReviews: 115,
    variants: [
        {id: 'v_size_p201', name: 'المقاس', options: ['S', 'M', 'L', 'XL', 'XXL']},
        {id: 'v_color_p201', name: 'اللون', options: ['أبيض', 'أزرق سماوي', 'بيج']}
    ]
  },
  // Add at least one product from each category you want to test for Product Detail Page
  {
    id: 'p301', name: 'ماكينة صنع القهوة الإسبريسو الأوتوماتيكية', price: 165.00, imageUrl: 'https://picsum.photos/seed/p301main/600/800',
    images: [ { id: 'p301_img1', url: 'https://picsum.photos/seed/p301a/800/1000' } ],
    categoryId: 4, categoryName: 'المنزل والمطبخ',
    description: 'ابدأ يومك بكوب قهوة مثالي! هذه الماكينة الأوتوماتيكية تصنع الإسبريسو، الكابتشينو، واللاتيه بلمسة زر. سهلة التنظيف والاستخدام.',
    shortDescription: 'ماكينة قهوة أوتوماتيكية لتحضير مشروباتك المفضلة.',
    stock: 15, rating: 4.9, numberOfReviews: 92,
  },
];


// --- Your existing category-specific product lists can remain for the main page sliders ---
// Ensure IDs here match IDs in detailedProductsList if you want full details on click

const electronicsProducts: Product[] = [
  // Use the detailed p101 for consistency, or simplified version for sliders
  detailedProductsList.find(p => p.id === 'p101')!, // Use ! if you are sure it exists
  { id: 'p102', name: 'شاشة كمبيوتر 27 بوصة 4K', price: 349.50, imageUrl: 'https://picsum.photos/seed/p102/400/300', categoryId: 1, description: 'وصف مختصر لشاشة الكمبيوتر.' },
  { id: 'p103', name: 'لوحة مفاتيح ميكانيكية RGB', price: 89.00, imageUrl: 'https://picsum.photos/seed/p103/400/300', categoryId: 1, description: 'وصف مختصر للوحة المفاتيح.' },
  { id: 'p104', name: 'ماوس ألعاب لاسلكي', price: 49.99, imageUrl: 'https://picsum.photos/seed/p104/400/300', categoryId: 1, description: 'وصف مختصر للماوس.' },
  { id: 'p105', name: 'جهاز لوحي 10 بوصة', price: 199.00, imageUrl: 'https://picsum.photos/seed/p105/400/300', categoryId: 1, description: 'وصف مختصر للجهاز اللوحي.' },
];

const mensFashionProducts: Product[] = [
  detailedProductsList.find(p => p.id === 'p201')!,
  { id: 'p202', name: 'بنطلون جينز سليم فيت', price: 45.00, imageUrl: 'https://picsum.photos/seed/p202/400/300', categoryId: 2, description: 'وصف مختصر للبنطلون.' },
  { id: 'p203', name: 'سترة رياضية بغطاء للرأس', price: 39.99, imageUrl: 'https://picsum.photos/seed/p203/400/300', categoryId: 2, description: 'وصف مختصر للسترة.' },
  { id: 'p204', name: 'حذاء رياضي للجري', price: 79.50, imageUrl: 'https://picsum.photos/seed/p204/400/300', categoryId: 2, description: 'وصف مختصر للحذاء.' },
];

const homeKitchenProducts: Product[] = [
  detailedProductsList.find(p => p.id === 'p301')!,
  { id: 'p302', name: 'طقم أواني طهي غير لاصقة', price: 120.00, imageUrl: 'https://picsum.photos/seed/p302/400/300', categoryId: 4, description: 'وصف مختصر لأواني الطهي.' },
  { id: 'p303', name: 'خلاط كهربائي متعدد السرعات', price: 55.99, imageUrl: 'https://picsum.photos/seed/p303/400/300', categoryId: 4, description: 'وصف مختصر للخلاط.' },
];


export const dummyCategoriesWithProducts: CategoryWithProducts[] = [
  { id: 1, name: 'إلكترونيات', slug: 'electronics', icon: 'pi pi-desktop', products: electronicsProducts },
  { id: 2, name: 'ملابس رجالية', slug: 'mens-fashion', icon: 'pi pi-user', products: mensFashionProducts },
  { id: 3, name: 'ملابس نسائية', slug: 'womens-fashion', icon: 'pi pi-female', products: [ /* Add detailed or simple products */ ] },
  { id: 4, name: 'المنزل والمطبخ', slug: 'home-kitchen', icon: 'pi pi-home', products: homeKitchenProducts },
  { id: 5, name: 'الجمال والعناية الشخصية', slug: 'beauty-personal-care', icon: 'pi pi-heart', products: [ /* ... */ ] },
  { id: 6, name: 'كتب', slug: 'books', icon: 'pi pi-book', products: [ /* ... */ ] },
  { id: 7, name: 'ألعاب الفيديو', slug: 'video-games', icon: 'pi pi-prime', products: [ /* ... */ ] },
];

// --- API-like Functions ---

// Get products for a category (used by CategoryPage and MainPage sliders)
export const getProductsByCategoryId = async (categoryId: string | number): Promise<Product[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      const category = dummyCategoriesWithProducts.find(cat => cat.id.toString() === categoryId.toString());
      resolve(category ? category.products : []);
    }, 200); // Simulate API delay
  });
};

// Get category details by slug (used by CategoryPage)
export const getCategoryDetailsBySlug = async (slug: string): Promise<CategoryWithProducts | undefined> => {
     return new Promise(resolve => {
        setTimeout(() => {
            resolve(dummyCategoriesWithProducts.find(cat => cat.slug === slug));
        }, 150);
    });
};

// NEW: Get a single product by its ID (used by ProductDetailPage)
export const getProductById = async (productId: string | number): Promise<Product | undefined> => {
  return new Promise(resolve => {
    setTimeout(() => {
      // Search in our more detailed list first
      let product = detailedProductsList.find(p => p.id.toString() === productId.toString());

      // If not found, search in the products nested under categories (less detailed versions)
      if (!product) {
        for (const category of dummyCategoriesWithProducts) {
          const foundProduct = category.products.find(p => p.id.toString() === productId.toString());
          if (foundProduct) {
            // If found in basic products, enrich it slightly for demo on product page if not already detailed
            product = {
                ...foundProduct, // Spread basic product info
                images: foundProduct.images || [{id: `${foundProduct.id}_main`, url: foundProduct.imageUrl, altText: foundProduct.name}],
                description: foundProduct.description || `وصف تفصيلي للمنتج ${foundProduct.name}. يرجى إضافة المزيد من التفاصيل هنا.`,
                shortDescription: foundProduct.shortDescription || foundProduct.name,
                categoryName: foundProduct.categoryName || category.name, // Add category name
                // Add other default detailed fields if missing
                stock: foundProduct.stock !== undefined ? foundProduct.stock : Math.floor(Math.random() * 100),
                rating: foundProduct.rating || parseFloat((Math.random() * 1.5 + 3.5).toFixed(1)), // Random rating between 3.5-5.0
                numberOfReviews: foundProduct.numberOfReviews || Math.floor(Math.random() * 200 + 10),
            };
            break;
          }
        }
      }
      resolve(product);
    }, 250); // Simulate API delay
  });
};