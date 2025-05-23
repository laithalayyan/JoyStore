// src/modules/User/CartPage/CartPage.tsx
import React, { useEffect, useState } from "react";
import { Header } from "../../Main/Header/Header"; // Adjust path
import { CartSummary } from "./Components/CartSummary";

import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../../../store/store";
import { fetchCart, clearCartLocal } from "../../../../store/slices/cartSlice"; // Add clearCartLocal
import { useAuth } from "../../../shared/hooks/AuthContext";
import { userDataApi } from "../../../../api/user/userDataApi";
import MobileMenu from "../SideBarCategories/MobileMenu";
import CartPageHeader from "./Components/CartPageHeader";
import EmptyCartPage from "./Components/EmptyCartPage";
import CartItemsList from "./Components/CartItemsList";
// import { userDataApi } from '../../../api/user/userDataApi'; // For direct API clear, thunk is better

export const CartPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  //const navigate = useNavigate();
  const {
    items: cartItems,
    status: cartStatus,
    error: cartError,
  } = useSelector((state: RootState) => state.cart);
  const { user } = useAuth(); // To get user email for API calls if not handled in thunk

  // For Header's mobile menu state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  useEffect(() => {
    if (user?.email) {
      // Check if user is logged in
      dispatch(fetchCart());
    }
  }, [dispatch, user]);

  const handleClearCart = async () => {
    // In a real app, you'd call an API thunk: dispatch(clearCartThunk());
    // For this dummy version, we can dispatch a local clear or call the mock API directly
    if (user?.email) {
      await userDataApi.clearCart(user.email); // Call mock API directly
      dispatch(clearCartLocal()); // Dispatch local/synchronous action to update Redux state
    }
  };

  if (cartStatus === "loading") {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        <Header
          onMobileMenuToggle={toggleMobileMenu}
          isMobileMenuOpen={isMobileMenuOpen}
        />
        <div className="container mx-auto p-6 text-center">
          <i className="pi pi-spin pi-spinner text-3xl text-orange-500 dark:text-orange-400"></i>
          <p className="mt-3 text-lg text-gray-700 dark:text-gray-300">
            جاري تحميل السلة...
          </p>
        </div>
      </div>
    );
  }

  if (cartStatus === "failed") {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        <Header
          onMobileMenuToggle={toggleMobileMenu}
          isMobileMenuOpen={isMobileMenuOpen}
        />
        <div className="container mx-auto p-6 text-center text-red-500 dark:text-red-400">
          <i className="pi pi-exclamation-circle text-3xl mb-2"></i>
          <p>خطأ في تحميل السلة: {cartError || "الرجاء المحاولة مرة أخرى."}</p>
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

      <main className="container mx-auto px-2 sm:px-4 lg:px-8 py-8 text-right rtl:text-right">
        <CartPageHeader
          cartItems={cartItems}
          handleClearCart={handleClearCart}
        />

        {cartItems.length === 0 ? (
          <EmptyCartPage />
        ) : (
          <div className="lg:flex lg:gap-8 items-start">
            <CartItemsList cartItems={cartItems} />

            <div className="lg:w-1/3 lg:sticky lg:top-28">
              <CartSummary items={cartItems} />
            </div>
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
