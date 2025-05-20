import React from "react";

interface ProductStockAndSkuProps {
  sku?: string;
  stock?: number; // Changed from stock !== undefined to allow 0 as a valid value
}

export const ProductStockAndSku: React.FC<ProductStockAndSkuProps> = ({
  sku,
  stock,
}) => {
  const hasSku = !!sku;
  const hasStockInfo = typeof stock === "number"; // More robust check for stock

  if (!hasSku && !hasStockInfo) {
    return null;
  }

  return (
    <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1 mb-6">
      {sku && <div>SKU: {sku}</div>}
      {hasStockInfo && ( // Use the boolean flag
        <div>
          التوفر:{" "}
          {stock! > 0 ? ( // stock is now guaranteed to be a number here
            <span className="text-green-600 dark:text-green-400">
              متوفر ({stock} قطعة)
            </span>
          ) : (
            <span className="text-red-600 dark:text-red-400">
              غير متوفر حالياً
            </span>
          )}
        </div>
      )}
    </div>
  );
};
