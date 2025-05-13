import React from "react";
import { Link } from "react-router-dom";
import { Button } from "primereact/button";
import { Product } from "../../../../../api/user/productData";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isFavorite, setIsFavorite] = React.useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log("Add to cart:", product.name, product.id);
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
    console.log("Toggle favorite:", product.name, product.id);
  };

  const favoriteIconBase = isFavorite
    ? "pi pi-heart-fill text-sm lg:text-lg"
    : "pi pi-heart text-sm lg:text-lg";

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl group border border-transparent hover:border-orange-300 dark:hover:border-orange-600 flex flex-col h-full">
      <div className="relative">
        <Link to={`/product/${product.id}`} className="block group/link">
          <div className="aspect-w-11 aspect-h-12 w-full overflow-hidden bg-gray-100 dark:bg-gray-700">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover object-center group-hover/link:scale-105 transition-transform duration-300 ease-in-out"
            />
          </div>
        </Link>
        <Button
          icon={favoriteIconBase}
          onClick={handleToggleFavorite}
          className={`!absolute top-2 right-2 rtl:right-auto rtl:left-2 
            !rounded-full !shadow-md 
            !w-8 !h-8 lg:!w-12 lg:!h-12  /* Fixed width and height */
            flex items-center justify-center /* Center the icon */
            transition-colors duration-200 product-card-favorite-btn 
            ${
              isFavorite
                ? "!bg-red-500/80 hover:!bg-red-600/90 !text-white"
                : "!bg-white/70 hover:!bg-white/90 dark:!bg-gray-700/70 dark:hover:!bg-gray-600/90 !text-gray-600 dark:!text-gray-300 hover:!text-red-500 dark:hover:!text-red-400"
            }`}
          aria-pressed={isFavorite}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        />
      </div>

      <div className="p-3 sm:p-4 flex-grow flex flex-col">
        <Link
          to={`/product/${product.id}`}
          className="block group/link mb-auto"
        >
          <h3
            className="
            text-xs xxs:text-sm xs:text-base sm:text-sm md:text-base lg:text-sm text-center
            font-semibold text-gray-800 dark:text-gray-100 
            group-hover/link:text-orange-600 dark:group-hover/link:text-orange-400 
            transition-colors duration-200 truncate leading-tight
          "
          >
            {product.name}
          </h3>
          <p className="mt-1 text-sm sm:text-base md:text-lg font-bold text-orange-500 dark:text-orange-400 text-center">
            <span className="font-sans">₪</span>
            {product.price.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
        </Link>

        <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-200 dark:border-gray-700">
          <Button
            icon="pi pi-cart-plus"
            className="p-button-sm py-2 !bg-orange-500 !border-orange-500 hover:!bg-orange-600 dark:hover:!bg-orange-700 !text-white w-full justify-center text-xs xxs:text-sm xs:text-base sm:text-xs md:text-sm"
            onClick={handleAddToCart}
          >
            <span className="hidden md:inline ml-2 rtl:mr-2 rtl:ml-0">
              أضف للسلة
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};
