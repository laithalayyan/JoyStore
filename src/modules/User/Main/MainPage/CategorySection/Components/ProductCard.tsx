import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "primereact/button";
import { Product } from "../../../../../../api/user/productData";
import { useDispatch, useSelector } from "react-redux";
import { removeProductFromFavorites, addProductToFavorites } from "../../../../../../store/slices/favoriteSlice";
import { AppDispatch, RootState } from "../../../../../../store/store";
import { addProductToCart } from "../../../../../../store/slices/cartSlice";
import { Toast } from "primereact/toast";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
}) => {
  // const [isFavorite, setIsFavorite] = React.useState(false);

  const dispatch = useDispatch<AppDispatch>();
  // Get all favorite items from Redux store to check if this product is a favorite
  const favoriteItems = useSelector((state: RootState) => state.favorites.items);
  const isCurrentlyFavorite = favoriteItems.some(favProduct => favProduct.id === product.id);
  const toastRef = useRef<Toast>(null); // For local toast if not using global

  const handleActualAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addProductToCart({ product, quantity: 1 })) // Add 1 quantity by default
      .unwrap()
      .then(() => {
        toastRef.current?.show({severity:'success', summary: 'تمت الإضافة', detail: `${product.name} أضيف إلى السلة.`, life: 2000});
      })
      .catch((err) => {
        toastRef.current?.show({severity:'error', summary: 'خطأ', detail: err.message || 'فشل في إضافة المنتج للسلة.', life: 3000});
      });
  };

  const handleActualToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isCurrentlyFavorite) {
      dispatch(removeProductFromFavorites(product.id));
    } else {
      dispatch(addProductToFavorites(product)); // Pass the full product object
    }
  };

  const favoriteIconBase = isCurrentlyFavorite
    ? "pi pi-heart-fill text-sm lg:text-lg"
    : "pi pi-heart text-sm lg:text-lg";

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl group border border-transparent hover:border-orange-300 dark:hover:border-orange-600 flex flex-col h-full">
      <Toast ref={toastRef} />
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
          onClick={handleActualToggleFavorite}
          className={`!absolute top-2 right-2 rtl:right-auto rtl:left-2 
            !rounded-full !shadow-md 
            !w-8 !h-8 lg:!w-12 lg:!h-12  /* Fixed width and height */
            flex items-center justify-center /* Center the icon */
            transition-colors duration-200 product-card-favorite-btn 
            ${
              isCurrentlyFavorite
                ? "!bg-red-500/80 hover:!bg-red-600/90 !text-white"
                : "!bg-white/70 hover:!bg-white/90 dark:!bg-gray-700/70 dark:hover:!bg-gray-600/90 !text-gray-600 dark:!text-gray-300 hover:!text-red-500 dark:hover:!text-red-400"
            }`}
          aria-pressed={isCurrentlyFavorite}
          aria-label={isCurrentlyFavorite ? "إزالة من المفضلة" : "أضف للمفضلة"}
          tooltip={isCurrentlyFavorite ? "إزالة من المفضلة" : "أضف للمفضلة"}
          tooltipOptions={{ position: "top", showDelay: 300 }}
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
            onClick={handleActualAddToCart}
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
