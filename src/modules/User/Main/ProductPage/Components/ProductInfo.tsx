// src/modules/User/ProductPage/components/ProductInfo.tsx
import React from "react";
import { Product } from "../../../../../api/user/productData";
// import { Rating } from 'primereact/rating'; // For star ratings

interface ProductInfoProps {
  product: Product;
}

export const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  return (
    <div className="text-right rtl:text-right">
      {" "}
      {/* Ensure RTL text alignment */}
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">
        {product.name}
      </h1>
      {/* Placeholder for Rating */}
      {product.rating && product.numberOfReviews && (
        <div className="flex items-center mb-3 text-sm">
          {/* <Rating value={product.rating} readOnly cancel={false} stars={5} className="mr-2 rtl:ml-2 rtl:mr-0" /> */}
          <span className="text-gray-400 dark:text-gray-500">
            ( {product.numberOfReviews} مراجعات )
          </span>
          <i className="pi pi-star-fill text-yellow-400 mx-1"></i>
          <span className="text-gray-700 dark:text-gray-300 font-semibold">
            {product.rating.toFixed(1)}
          </span>
        </div>
      )}
      <div className="mb-4">
        {product.originalPrice && product.originalPrice > product.price && (
          <span className="text-lg text-gray-400 dark:text-gray-500 line-through mr-2 rtl:ml-2 rtl:mr-0">
            <span className="font-sans">₪</span>
            {product.originalPrice.toFixed(2)}
          </span>
        )}
        <span className="text-2xl sm:text-3xl font-bold text-orange-600 dark:text-orange-400">
          <span className="font-sans">₪</span>
          {product.price.toFixed(2)}
        </span>
        {product.originalPrice && product.originalPrice > product.price && (
          <span className="ml-2 rtl:mr-2 rtl:ml-0 px-2 py-0.5 bg-red-100 text-red-700 dark:bg-red-700 dark:text-red-100 text-xs font-semibold rounded">
            خصم{" "}
            {Math.round(
              ((product.originalPrice - product.price) /
                product.originalPrice) *
                100
            )}
            %
          </span>
        )}
      </div>
      {product.shortDescription && (
        <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm sm:text-base leading-relaxed">
          {product.shortDescription}
        </p>
      )}
      {/* Placeholder for SKU and Stock */}
      <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1 mb-6">
        {product.sku && <div>SKU: {product.sku}</div>}
        {product.stock !== undefined && (
          <div>
            التوفر:{" "}
            {product.stock > 0 ? (
              <span className="text-green-600 dark:text-green-400">
                متوفر ({product.stock} قطعة)
              </span>
            ) : (
              <span className="text-red-600 dark:text-red-400">
                غير متوفر حالياً
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
