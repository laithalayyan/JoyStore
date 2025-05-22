// src/modules/User/CartPage/CartPage.tsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "../../Main/Header/Header"; // Adjust path
import { Button } from "primereact/button";
import { CartItemRow } from "./Components/CartItemRow";
import { CartSummary } from "./Components/CartSummary";

import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../../../store/store";
import { fetchCart, clearCartLocal } from "../../../../store/slices/cartSlice"; // Add clearCartLocal
import { useAuth } from "../../../shared/hooks/AuthContext";
import { userDataApi } from "../../../../api/user/userDataApi";
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
      {/* Mobile Menu Logic ... */}

      <main className="container mx-auto px-2 sm:px-4 lg:px-8 py-8 text-right rtl:text-right">
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">
            سلة التسوق
          </h1>
          {cartItems.length > 0 && (
            <Button
              label="إفراغ السلة"
              icon="pi pi-trash"
              className="p-button-danger p-button-outlined p-button-sm"
              onClick={handleClearCart}
            />
          )}
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <i className="pi pi-shopping-cart text-6xl text-gray-300 dark:text-gray-600 mb-4"></i>
            <p className="text-xl text-gray-700 dark:text-gray-300 mb-2">
              سلة التسوق فارغة.
            </p>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              لم تقم بإضافة أي منتجات إلى السلة بعد.
            </p>
            <Link to="/">
              <Button
                label="ابدأ التسوق"
                icon="pi pi-arrow-left rtl:pi-arrow-right"
                className="p-button-orange"
              />
            </Link>
          </div>
        ) : (
          <div className="lg:flex lg:gap-8 items-start">
            {/* Cart Items List */}
            <div className="lg:w-2/3 bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
              {/* Table Header (Optional) */}
              <div className="hidden sm:flex px-2 py-3 bg-gray-50 dark:bg-gray-700 text-xs font-semibold text-gray-600 dark:text-gray-300 border-b dark:border-gray-600">
                <div className="w-24 flex-shrink-0 mr-4 rtl:ml-4 rtl:mr-0">
                  المنتج
                </div>
                <div className="flex-grow">الوصف</div>
                <div className="w-32 text-center">الكمية</div>
                <div className="w-24 text-center">الإجمالي</div>
                <div className="w-12 text-center"></div>{" "}
                {/* For remove button */}
              </div>
              {cartItems.map((item) => (
                <CartItemRow key={item.product.id} item={item} />
              ))}
            </div>

            {/* Cart Summary (Sidebar on larger screens) */}
            <div className="lg:w-1/3 lg:sticky lg:top-28">
              {" "}
              {/* top-28 assumes header height of 5rem + some space */}
              <CartSummary items={cartItems} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
