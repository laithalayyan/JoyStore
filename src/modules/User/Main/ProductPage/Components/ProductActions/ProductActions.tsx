// src/modules/User/ProductPage/components/ProductActions.tsx
import React, { useRef, useState } from "react";
import { Product } from "../../../../../../api/user/productData"; // Adjust path
import { AddToCartButton } from "./Components/AddToCartButton";
import { FavoriteToggleButton } from "./Components/FavoriteToggleButton";
//import { ProductVariants } from "./Components/ProductVariants";
import { QuantityInput } from "./Components/QuantityInput";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../../../store/store";
import { Toast } from "primereact/toast";
import { addProductToCart } from "../../../../../../store/slices/cartSlice";
import { addProductToFavorites, removeProductFromFavorites } from "../../../../../../store/slices/favoriteSlice";

interface ProductActionsProps {
  product: Product;
  // isFavoriteInitial?: boolean; // For real favorite state
  // onToggleFavorite?: (productId: string | number) => void; // For real favorite action
  // onAddToCart?: (productId: string | number, quantity: number, selectedVariants: Record<string, string>) => void; // For real cart action
}

export const ProductActions: React.FC<ProductActionsProps> = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  // const [isFavorite, setIsFavorite] = useState(false); // useState(isFavoriteInitial);
  const dispatch = useDispatch<AppDispatch>();
  const toastRef = useRef<Toast>(null);
  const favoriteItems = useSelector((state: RootState) => state.favorites.items);

  const isCurrentlyFavorite = favoriteItems.some(favProduct => favProduct.id === product.id);


  const handleActualAddToCart = () => {
    dispatch(addProductToCart({ product, quantity }))
      .unwrap()
      .then(() => {
        toastRef.current?.show({
          severity: "success",
          summary: "تمت الإضافة",
          detail: `${product.name} (x${quantity}) أضيف إلى السلة.`,
          life: 2000,
        });
      })
      .catch((err) => {
        toastRef.current?.show({
          severity: "error",
          summary: "خطأ",
          detail: err.message || "فشل في إضافة المنتج للسلة.",
          life: 3000,
        });
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

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity);
  };

  const canAddToCart = product.stock !== undefined && product.stock > 0;

  

  return (
    <div className="mt-6 space-y-6">
      <Toast ref={toastRef} />
      {/* {product.variants && product.variants.length > 0 && (
        <ProductVariants
          variants={product.variants}
          selectedOptions={selectedVariantOptions}
          onOptionSelect={handleOptionSelect}
        />
      )} */}

      <div className="flex items-end sm:items-center space-x-3 rtl:space-x-reverse">
        {" "}
        {/* items-end for small screens if quantity input label existed */}
        <QuantityInput
          productId={product.id}
          value={quantity}
          onValueChange={handleQuantityChange}
          maxStock={product.stock}
        />
        <AddToCartButton
          onClick={handleActualAddToCart}
          disabled={!canAddToCart}
        />
        <FavoriteToggleButton
          isFavorite={isCurrentlyFavorite}
          onClick={handleActualToggleFavorite}
        />
      </div>
      {/* <ProductShippingInfoTable /> */}
    </div>
  );
};
