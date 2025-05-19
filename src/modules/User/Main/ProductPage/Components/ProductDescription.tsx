// src/modules/User/ProductPage/components/ProductDescription.tsx
import React from "react";

interface ProductDescriptionProps {
  description: string;
}

export const ProductDescription: React.FC<ProductDescriptionProps> = ({
  description,
}) => {
  // In a real app, you might parse HTML description or handle markdown
  return (
    <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 text-right rtl:text-right">
        وصف المنتج
      </h2>
      <div
        className="prose prose-sm sm:prose-base dark:prose-invert max-w-none text-right rtl:text-right"
        // prose classes from @tailwindcss/typography for nice text styling
        dangerouslySetInnerHTML={{ __html: description }} // Assuming description might be HTML
        // If description is plain text: <p>{description}</p>
      />
    </div>
  );
};
