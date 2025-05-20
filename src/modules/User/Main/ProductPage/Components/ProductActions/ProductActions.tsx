// src/modules/User/ProductPage/components/ProductActions.tsx
import React, { useState } from "react";
import { Product } from "../../../../../../api/user/productData"; // Adjust path
import { AddToCartButton } from "./Components/AddToCartButton";
import { FavoriteToggleButton } from "./Components/FavoriteToggleButton";
//import { ProductVariants } from "./Components/ProductVariants";
import { QuantityInput } from "./Components/QuantityInput";

interface ProductActionsProps {
  product: Product;
  // isFavoriteInitial?: boolean; // For real favorite state
  // onToggleFavorite?: (productId: string | number) => void; // For real favorite action
  // onAddToCart?: (productId: string | number, quantity: number, selectedVariants: Record<string, string>) => void; // For real cart action
}

export const ProductActions: React.FC<ProductActionsProps> = ({
  product,
  // isFavoriteInitial = false, // Example
  // onToggleFavorite,
  // onAddToCart
}) => {
  const [quantity, setQuantity] = useState(1);
  // Demo favorite state. In a real app, this would come from props or context.
  const [isFavorite, setIsFavorite] = useState(false); // useState(isFavoriteInitial);
  // Demo selected variants state.
  // const [selectedVariantOptions, setSelectedVariantOptions] = useState<
  //   Record<string, string>
  // >({});

  // const handleOptionSelect = (variantName: string, optionValue: string) => {
  //   setSelectedVariantOptions((prev) => ({
  //     ...prev,
  //     [variantName]: optionValue,
  //   }));
  //   // Potentially reset quantity or check stock for new variant combination here
  // };

  const handleAddToCart = () => {
    console.log(
      `Add ${quantity} of ${product.name} to cart. Selected:`
      //selectedVariantOptions
    );
    // onAddToCart?.(product.id, quantity, selectedVariantOptions);
  };

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
    console.log("Toggle favorite for product:", product.id);
    // onToggleFavorite?.(product.id);
  };

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity);
  };

  const canAddToCart = product.stock !== undefined && product.stock > 0;

  return (
    <div className="mt-6 space-y-6">
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
        <AddToCartButton onClick={handleAddToCart} disabled={!canAddToCart} />
        <FavoriteToggleButton
          isFavorite={isFavorite}
          onClick={handleToggleFavorite}
        />
      </div>
      {/* <ProductShippingInfoTable /> */}
    </div>
  );
};
