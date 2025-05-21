// src/modules/User/FavoritesPage/FavoritesPage.tsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../shared/hooks/AuthContext"; // Adjust path
import { Button } from "primereact/button";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog"; // For removal confirmation
import { Product } from "../../../../api/user/productData";
import { FavoriteItem, userDataApi } from "../../../../api/user/userDataApi";
import { Header } from "../Header/Header";
import { ProductCard } from "../MainPage/CategorySection/Components/ProductCard";

export const FavoritesPage: React.FC = () => {
  const { user } = useAuth();
  //const navigate = useNavigate();
  const [favoriteProducts, setFavoriteProducts] = useState<Product[]>([]); // Store full Product objects
  const [loading, setLoading] = useState(true);

  // For Header's mobile menu state (if your Header needs it)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  useEffect(() => {
    if (user?.email) {
      setLoading(true);
      userDataApi
        .getFavorites(user.email)
        .then((favItems: FavoriteItem[]) => {
          // Map FavoriteItem.product (ProductSummary) to the full Product type for ProductCard
          const productsForDisplay: Product[] = favItems.map((favItem) => {
            // These are the MANDATORY fields for your Product type (from productData.ts)
            // ProductSummary now provides id, name, price, imageUrl.
            // We need to provide defaults or placeholders for other required fields.
            return {
              ...favItem.product, // Spreads id, name, price, imageUrl, slug?
              categoryId: favItem.product.categoryId || 0, // Provide a default or fetch category if ProductSummary doesn't have it
              description: `وصف لـ ${favItem.product.name}`, // Default description
              // Add other required fields from your FULL Product interface with defaults:
              // originalPrice: favItem.product.originalPrice || favItem.product.price,
              // images: [{ id: 'main', url: favItem.product.imageUrl, altText: favItem.product.name }],
              // categoryName: 'مفضل',
              // sku: `SKU-${favItem.product.id}`,
              // stock: 10, // Default stock
              // rating: 4.0,
              // numberOfReviews: 0,
              // variants: [],
            } as Product; // Assert as Product to satisfy ProductCard
          });
          setFavoriteProducts(productsForDisplay);
        })
        .catch((error) => console.error("Error fetching favorites:", error))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [user]);

  const handleRemoveFromFavorites = async (productId: string | number) => {
    if (!user?.email) return;
    // Call your API to remove
    const response = await userDataApi.removeFavorite(user.email, productId);
    if (response.success) {
      setFavoriteProducts((prev) => prev.filter((p) => p.id !== productId));
      // Optionally, show a success toast
    } else {
      // Optionally, show an error toast
      console.error("Failed to remove from favorites");
    }
  };

  const confirmRemove = (productId: string | number, productName: string) => {
    confirmDialog({
      message: `هل أنت متأكد أنك تريد إزالة "${productName}" من المفضلة؟`,
      header: "تأكيد الإزالة",
      icon: "pi pi-info-circle",
      defaultFocus: "reject",
      acceptClassName: "p-button-danger",
      acceptLabel: "نعم، إزالة",
      rejectLabel: "إلغاء",
      accept: () => handleRemoveFromFavorites(productId),
      reject: () => {},
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        <Header
          onMobileMenuToggle={toggleMobileMenu}
          isMobileMenuOpen={isMobileMenuOpen}
        />
        <div className="container mx-auto p-6 text-center">
          <i className="pi pi-spin pi-spinner text-3xl text-orange-500 dark:text-orange-400"></i>
          <p className="mt-3 text-lg text-gray-700 dark:text-gray-300">
            جاري تحميل المفضلة...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Header
        onMobileMenuToggle={toggleMobileMenu}
        isMobileMenuOpen={isMobileMenuOpen}
      />
      <ConfirmDialog /> {/* Needed for confirmDialog to work */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 text-right rtl:text-right">
        <div className="mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">
            المنتجات المفضلة
          </h1>
        </div>

        {favoriteProducts.length === 0 ? (
          <div className="text-center py-12">
            <i className="pi pi-heart text-5xl text-gray-300 dark:text-gray-600 mb-4"></i>
            <p className="text-xl text-gray-700 dark:text-gray-300 mb-2">
              قائمة المفضلة فارغة.
            </p>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              ابدأ بإضافة المنتجات التي تعجبك!
            </p>
            <Link to="/">
              <Button
                label="تصفح المنتجات"
                icon="pi pi-search"
                className="p-button-orange"
              />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
            {favoriteProducts.map((product) => (
              <div key={product.id} className="relative group">
                <ProductCard product={product} />
                {/* Overlay Remove Button for Favorites Page */}
                <Button
                  icon="pi pi-times"
                  className="!absolute top-2 left-2 rtl:right-2 rtl:left-auto z-10 p-button-rounded p-button-danger p-button-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  onClick={() => confirmRemove(product.id, product.name)}
                  tooltip="إزالة من المفضلة"
                  aria-label={`إزالة ${product.name} من المفضلة`}
                />
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};
