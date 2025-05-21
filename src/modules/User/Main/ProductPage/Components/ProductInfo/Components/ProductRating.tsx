import React from "react";

interface ProductRatingProps {
  rating?: number;
  numberOfReviews?: number;
}

export const ProductRating: React.FC<ProductRatingProps> = ({
  rating,
  numberOfReviews,
}) => {
  if (!rating || !numberOfReviews) {
    return null; // Don't render if no rating or reviews
  }

  return (
    <div className="flex items-center mb-3 text-sm">
      <span className="text-gray-400 dark:text-gray-500">
        ( {numberOfReviews} مراجعات )
      </span>
      <i className="pi pi-star-fill text-yellow-400 mx-1"></i>
      <span className="text-gray-700 dark:text-gray-300 font-semibold">
        {rating.toFixed(1)}
      </span>
    </div>
  );
};
