import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IconWithBadge } from "./IconWithBadge";
import { useAuth } from "../../../../shared/hooks/AuthContext";
import { Button } from "primereact/button";
import { ThemeToggle } from "../../../../shared/components/ThemeToggle2";
import { useDispatch, useSelector } from "react-redux";
import { fetchFavorites } from "../../../../../store/slices/favoriteSlice";
import { AppDispatch, RootState } from "../../../../../store/store";
import { fetchCart } from "../../../../../store/slices/cartSlice";

export const ActionIcons: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const favoriteItems = useSelector(
    (state: RootState) => state.favorites.items
  );

  const favoriteCount = favoriteItems.length;
  const cartItems = useSelector((state: RootState) => state.cart.items); // Get cart items

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0); 
  useEffect(() => {
    if (user?.email) {
      // Fetch initial favorites (and cart items) when user logs in or on mount
      dispatch(fetchFavorites());
      dispatch(fetchCart());
    }
  }, [user, dispatch]);

  const handleFavoritesClick = () => navigate("/favorites");
  const handleCartClick = () => navigate("/cart");
  const handleLogout = () => {
    logout();
    navigate("/signin");
  };

  // if (loading && user) {
  //   return (
  //     <div className="flex items-center space-x-3 md:space-x-5">
  //       <div className="p-link relative w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
  //       <div className="p-link relative w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
  //       <div className="p-link relative w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
  //       <div className="p-link relative w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
  //     </div>
  //   );
  // }

  return (
    <div className="flex items-center justify-around md:justify-start w-full md-w-auto pr-0 space-x-3 md:space-x-5">
      {user && (
        <Button
          icon="pi pi-sign-out"
          onClick={handleLogout}
          className="p-button-rounded pl-1 p-button-text p-button-plain text-gray-600 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400"
          tooltip="تسجيل الخروج"
          tooltipOptions={{ position: "bottom" }}
          aria-label="Sign out"
        />
      )}
      <ThemeToggle />
      <IconWithBadge
        icon="pi pi-heart"
        count={favoriteCount}
        onClick={handleFavoritesClick}
        ariaLabel="View your favorites"
        text="المفضلة"
      />
      <IconWithBadge
        icon="pi pi-shopping-cart"
        count={cartCount}
        onClick={handleCartClick}
        ariaLabel="View your shopping cart"
        badgeSeverity="success"
        text="السلة"
      />
    </div>
  );
};
