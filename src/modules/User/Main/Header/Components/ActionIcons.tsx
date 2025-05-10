// src/modules/User/Main/components/ActionIcons.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // For navigation on logout
import { IconWithBadge } from "./IconWithBadge";
import { useAuth } from "../../../../shared/hooks/AuthContext"; // Adjust path
import { Button } from "primereact/button"; // For the logout button
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
    // Example: Navigate to favorites page or open favorites modal
    // if (user?.email) {
    //     const sampleProduct = { id: `prod-${Date.now()}`, name: "Random Favorite" };
    //     userDataApi.addFavorite(user.email, sampleProduct).then(res => {
    //         if(res.success) userDataApi.getFavorites(user.email!).then(favs => setFavoriteCount(favs.length));
    //         console.log("Add favorite attempt:", res);
    //     });
    // }
  };

  const handleCartClick = () => {
    console.log("Cart clicked");
    // Example: Navigate to cart page or open cart modal/sidebar
    // if (user?.email) {
    //    const sampleProduct = { id: `prod-cart-${Date.now()}`, name: "Random Cart Item" };
    //    userDataApi.addToCart(user.email, sampleProduct, 1).then(res => {
    //        if(res.success) userDataApi.getCart(user.email!).then(cartItems => setCartCount(cartItems.reduce((sum, item) => sum + item.quantity, 0)));
    //        console.log("Add to cart attempt:", res);
    //    });
    // }
  };

  const handleLogout = () => {
    logout(); // Call the logout function from AuthContext
    navigate("/signin"); // Redirect to sign-in page after logout
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
    <div className="flex items-center space-x-3 md:space-x-5">
      <ThemeToggle /> {/* Add ThemeToggle here */}
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
      {user && ( // Only show logout if user is logged in
        <Button
          icon="pi pi-sign-out"
          onClick={handleLogout}
          className="p-button-rounded p-button-text p-button-plain text-gray-600 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400"
          // tooltip="Sign Out"
          tooltipOptions={{ position: "bottom" }}
          // aria-label="Sign out"
        />
      )}
    </div>
  );
};
