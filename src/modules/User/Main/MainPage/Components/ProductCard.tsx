// src/modules/User/Main/components/ProductCard.tsx
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "primereact/button";
import { Product } from "../../../../../api/user/productData";
// import { useCart } from '../../../../shared/hooks/useCart'; // Future
// import { useFavorites } from '../../../../shared/hooks/useFavorites'; // Future

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  // const { addToCart } = useCart(); // Example for future
  // const { toggleFavorite, isFavorite } = useFavorites(); // Example

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent link navigation if button is inside Link
    console.log("Add to cart:", product.name);
    // addToCart(product, 1);
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log("Toggle favorite:", product.name);
    // toggleFavorite(product);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl group">
      <Link to={`/product/${product.id}`} className="block">
        {" "}
        {/* Link to product detail page */}
        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-4 text-right rtl:text-right">
          {" "}
          {/* Ensure text aligns right */}
          <h3 className="text-md sm:text-lg font-semibold text-gray-800 dark:text-gray-100 truncate group-hover:text-orange-600 dark:group-hover:text-orange-400">
            {product.name}
          </h3>
          <p className="mt-1 text-lg font-bold text-orange-600 dark:text-orange-400">
            ${product.price.toFixed(2)} {/* Format price */}
          </p>
        </div>
      </Link>
      <div className="p-4 pt-0 flex justify-between items-center border-t border-gray-200 dark:border-gray-700">
        <Button
          icon="pi pi-cart-plus"
          className="p-button-sm p-button-orange !bg-orange-500 !border-orange-500 hover:!bg-orange-600" // Explicit orange button
          onClick={handleAddToCart}
          tooltip="أضف إلى السلة"
          tooltipOptions={{ position: "top" }}
        />
        <Button
          icon="pi pi-heart" // Could be pi-heart-fill if favorited
          // eslint-disable-next-line no-constant-condition
          className={`p-button-sm p-button-text ${ false ? "text-red-500" : "text-gray-400 dark:text-gray-500"
          } hover:!text-red-500 dark:hover:!text-red-400`} // Example favorite state
          onClick={handleToggleFavorite}
          tooltip="أضف للمفضلة"
          tooltipOptions={{ position: "top" }}
        />
      </div>
    </div>
  );
};
