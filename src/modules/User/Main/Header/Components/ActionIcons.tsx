import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import { IconWithBadge } from "./IconWithBadge";
import { useAuth } from "../../../../shared/hooks/AuthContext";
import { Button } from "primereact/button";
import { userDataApi } from "../../../../../api/user/userDataApi";
import { ThemeToggle } from "../../../../shared/components/ThemeToggle2";

export const ActionIcons: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [favoriteCount, setFavoriteCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      setLoading(true);
      const fetchCounts = async () => {
        try {
          const [favResponse, cartResponse] = await Promise.all([
            userDataApi.getFavorites(user.email),
            userDataApi.getCart(user.email),
          ]);
          setFavoriteCount(favResponse.length);
          setCartCount(
            cartResponse.reduce((sum, item) => sum + item.quantity, 0)
          );
        } catch (error) {
          console.error("Error fetching user data counts:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchCounts();
    } else {
      setFavoriteCount(0);
      setCartCount(0);
      setLoading(false);
    }
  }, [user]);

  const handleFavoritesClick = () => {
    console.log("Favorites clicked");
  };

  const handleCartClick = () => {
    console.log("Cart clicked");
  };

  const handleLogout = () => {
    logout();
    navigate("/signin");
  };

  if (loading && user) {
    return (
      <div className="flex items-center space-x-3 md:space-x-5">
        <div className="p-link relative w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
        <div className="p-link relative w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
        <div className="p-link relative w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
        <div className="p-link relative w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
      </div>
    );
  }

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
