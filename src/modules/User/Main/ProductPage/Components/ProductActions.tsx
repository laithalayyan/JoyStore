// src/modules/User/ProductPage/components/ProductActions.tsx
import React, { useState } from "react";
import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber"; // For quantity
import { Product } from "../../../../../api/user/productData"; // Adjust path

interface ProductActionsProps {
  product: Product;
  // Add props for actual favorite state and cart actions
  // isFavorite: boolean;
  // onToggleFavorite: () => void;
  // onAddToCart: (quantity: number) => void;
}

export const ProductActions: React.FC<ProductActionsProps> = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false); // Demo state

  const handleAddToCart = () => {
    console.log(`Add ${quantity} of ${product.name} to cart.`);
    // onAddToCart(quantity);
  };

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
    console.log("Toggle favorite on product page");
    // onToggleFavorite();
  };

  return (
    <div className="mt-6 space-y-6">
      {/* Placeholder for Variants if product.variants exists */}
      {product.variants &&
        product.variants.length > 0 &&
        product.variants.map((variant) => (
          <div key={variant.id} className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 text-right rtl:text-right">
              {variant.name}:
            </label>
            <div className="flex space-x-2 rtl:space-x-reverse">
              {variant.options.map((option) => (
                <Button
                  key={option}
                  label={option}
                  // Add selected state and onClick to handle variant selection
                  className="p-button-sm p-button-outlined !border-gray-300 dark:!border-gray-600 !text-gray-700 dark:!text-gray-300 hover:!bg-gray-100 dark:hover:!bg-gray-700"
                  // selected={selectedVariantOption === option}
                />
              ))}
            </div>
          </div>
        ))}

      <div className="flex items-center space-x-3 rtl:space-x-reverse">
        <div className="w-24">
          {" "}
          {/* Fixed width for quantity input */}
          <label htmlFor={`quantity-${product.id}`} className="sr-only">
            الكمية
          </label>
          <InputNumber
            inputId={`quantity-${product.id}`}
            value={quantity}
            onValueChange={(e) => setQuantity(e.value ?? 1)}
            showButtons
            buttonLayout="horizontal"
            step={1}
            min={1}
            max={product.stock || 10} // Max based on stock or a default
            decrementButtonClassName="p-button-secondary p-button-outlined !text-gray-600 dark:!text-gray-300 !border-gray-300 dark:!border-gray-600"
            incrementButtonClassName="p-button-secondary p-button-outlined !text-gray-600 dark:!text-gray-300 !border-gray-300 dark:!border-gray-600"
            incrementButtonIcon="pi pi-plus text-xs"
            decrementButtonIcon="pi pi-minus text-xs"
            inputClassName="!text-center w-12 dark:!bg-gray-700 dark:!text-white !border-y-gray-300 dark:!border-y-gray-600"
            className="p-inputnumber-sm" // Makes the whole component smaller
          />
        </div>
        <Button
          label="أضف إلى السلة"
          icon="pi pi-shopping-cart"
          className="p-button-orange !bg-orange-500 py-2 text-white !border-orange-500 hover:!bg-orange-600 flex-grow justify-center p-button-lg text-sm sm:text-base"
          onClick={handleAddToCart}
          disabled={product.stock === 0}
        />
        <Button
          icon={isFavorite ? "pi pi-heart-fill" : "pi pi-heart"}
          className={`p-button-lg p-button-text p-button-rounded focus:ring-0
                      ${
                        isFavorite
                          ? "text-red-500 hover:!bg-red-500/10"
                          : "text-gray-400 dark:text-gray-500 hover:!bg-gray-400/10 hover:!text-red-500"
                      }`}
          onClick={handleToggleFavorite}
          tooltip={isFavorite ? "إزالة من المفضلة" : "أضف للمفضلة"}
          tooltipOptions={{ position: "top" }}
          aria-pressed={isFavorite}
        />
      </div>
    </div>
  );
};
