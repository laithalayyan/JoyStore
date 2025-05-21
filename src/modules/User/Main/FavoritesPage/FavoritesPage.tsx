// src/modules/User/FavoritesPage/FavoritesPage.tsx
import React, { useEffect, useState } from "react";

import { ConfirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import { useRef } from "react";
import { Product } from "../../../../api/user/productData";

// Redux hooks and actions
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../../store/store";
import { Header } from "../Header/Header";
import { ProductCard } from "../MainPage/CategorySection/Components/ProductCard";
import {
  fetchFavorites,
} from "../../../../store/slices/favoriteSlice";
import MobileMenu from "../SideBarCategories/MobileMenu";

export const FavoritesPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    items: favoriteProducts,
    status: favoritesStatus,
  } = useSelector((state: RootState) => state.favorites);
  const toast = useRef<Toast>(null);

  // For Header's mobile menu state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  useEffect(() => {
    // Fetch favorites when component mounts or user changes (if you tie it to auth user)
    dispatch(fetchFavorites());
  }, [dispatch]); // Add user ID dependency if fetchFavorites uses it

//   const handleToggleFavoriteOnPage = (
//     productId: string | number,
//     productName: string
//   ) => {
//     // On this page, toggling always means remove
//     confirmDialog({
//       message: `هل أنت متأكد أنك تريد إزالة "${productName}" من المفضلة؟`,
//       header: "تأكيد الإزالة",
//       icon: "pi pi-exclamation-triangle",
//       acceptClassName: "p-button-danger",
//       acceptLabel: "نعم، إزالة",
//       rejectLabel: "إلغاء",
//       accept: () => {
//         dispatch(removeProductFromFavorites(productId))
//           .then(() => {
//             toast.current?.show({
//               severity: "success",
//               summary: "تم بنجاح",
//               detail: `تمت إزالة "${productName}" من المفضلة.`,
//               life: 3000,
//             });
//           })
//           .catch(() => {
//             // Thunk might not reject promise, check slice error state
//             toast.current?.show({
//               severity: "error",
//               summary: "خطأ",
//               detail: "فشل في إزالة المنتج من المفضلة.",
//               life: 3000,
//             });
//           });
//       },
//     });
//   };

  if (favoritesStatus === "loading") {
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

  if (favoritesStatus === "failed") {
    return (
      /* ... error UI, use favoritesError ... */
      <div></div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Header
        onMobileMenuToggle={toggleMobileMenu}
        isMobileMenuOpen={isMobileMenuOpen}
      />
      <Toast ref={toast} />
      <ConfirmDialog />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 text-right rtl:text-right">
        <div className="mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">
            المنتجات المفضلة
          </h1>
        </div>

        {favoriteProducts.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
              لا توجد منتجات مفضلة حالياً
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              يمكنك إضافة المنتجات إلى المفضلة لتظهر هنا.
            </p>
            <button
              onClick={() => window.location.href = "/"}
              className="mt-6 px-6 py-3 bg-orange-500 text-white font-medium rounded-lg shadow hover:bg-orange-600 transition"
            >
              تصفح المنتجات
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
            {favoriteProducts.map((product: Product) => (
              <ProductCard
                key={product.id}
                product={product} // ProductCard receives a full Product object from Redux state
                //isCurrentlyFavorite={true} // All items on this page are favorites
                //onToggleFavorite={handleToggleFavoriteOnPage}
              />
            ))}
          </div>
        )}
      </main>
      {isMobileMenuOpen && (
        <MobileMenu
          isMobileMenuOpen={true}
          toggleMobileMenu={toggleMobileMenu}
        />
      )}
    </div>
  );
};
