import React from "react";

interface ProductDescriptionProps {
  description: string;
}

export const ProductDescription: React.FC<ProductDescriptionProps> = ({
  description,
}) => {
  return (
    <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 text-right rtl:text-right">
        وصف المنتج
      </h2>
      <div
        className="prose prose-sm sm:prose-base dark:prose-invert max-w-none text-right rtl:text-right"
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </div>
  );
};
