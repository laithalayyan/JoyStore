import React from "react";

interface ProductPriceDisplayProps {
  price: number;
  originalPrice?: number;
}

export const ProductPriceDisplay: React.FC<ProductPriceDisplayProps> = ({
  price,
  originalPrice,
}) => {
  //const hasDiscount = originalPrice && originalPrice > price;
  const hasDiscount = false;

  return (
    <div className="mb-4">
      {hasDiscount && (
        <span className="text-lg text-gray-400 dark:text-gray-500 line-through mr-2 rtl:ml-2 rtl:mr-0">
          <span className="font-sans">₪</span>
          {originalPrice!.toFixed(2)}
        </span>
      )}
      <span className="text-2xl sm:text-3xl font-bold text-orange-600 dark:text-orange-400">
        <span className="font-sans">₪</span>
        {price.toFixed(2)}
      </span>
      {hasDiscount && (
        <span className="ml-2 rtl:mr-2 rtl:ml-0 px-2 py-0.5 bg-red-100 text-red-700 dark:bg-red-700 dark:text-red-100 text-xs font-semibold rounded">
          خصم {Math.round(((originalPrice! - price) / originalPrice!) * 100)}%
        </span>
      )}
    </div>
  );
};
