import React, { useEffect, useState } from "react";

import { ConfirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import { useRef } from "react";
import { Product } from "../../../../api/user/productData";

import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../../store/store";
import { Header } from "../Header/Header";
import { ProductCard } from "../MainPage/CategorySection/Components/ProductCard";
import { fetchFavorites } from "../../../../store/slices/favoriteSlice";
import MobileMenu from "../SideBarCategories/MobileMenu";
import EmptyFav from "./Components/EmptyFav";
import HeaderFav from "./Components/HeaderFav";

export const FavoritesPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items: favoriteProducts, status: favoritesStatus } = useSelector(
    (state: RootState) => state.favorites
  );
  const toast = useRef<Toast>(null);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  useEffect(() => {
    dispatch(fetchFavorites());
  }, [dispatch]);

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
    return <div></div>;
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
        <HeaderFav />
        {favoriteProducts.length === 0 ? (
          <EmptyFav />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
            {favoriteProducts.map((product: Product) => (
              <ProductCard key={product.id} product={product} />
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
