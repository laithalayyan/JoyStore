import React from "react";

interface ProductShortDescriptionProps {
  description?: string;
}

export const ProductShortDescription: React.FC<
  ProductShortDescriptionProps
> = ({ description }) => {
  if (!description) {
    return null;
  }

  return (
    <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm sm:text-base leading-relaxed">
      {description}
    </p>
  );
};
