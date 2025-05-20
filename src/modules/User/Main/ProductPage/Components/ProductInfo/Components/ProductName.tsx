import React from "react";

interface ProductNameProps {
  name: string;
}

export const ProductName: React.FC<ProductNameProps> = ({ name }) => {
  return (
    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">
      {name}
    </h1>
  );
};
