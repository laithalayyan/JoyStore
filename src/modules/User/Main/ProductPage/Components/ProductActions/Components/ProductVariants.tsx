import React from "react";
import { Button } from "primereact/button";
import { ProductVariant } from "../../../../../../../api/user/productData"; // Adjust path

interface ProductVariantsProps {
  variants: ProductVariant[];
  selectedOptions: Record<string, string>; // e.g., { "Color": "Red", "Size": "M" }
  onOptionSelect: (variantName: string, optionValue: string) => void;
}

export const ProductVariants: React.FC<ProductVariantsProps> = ({
  variants,
  selectedOptions,
  onOptionSelect,
}) => {
  if (!variants || variants.length === 0) {
    return null;
  }

  return (
    <>
      {variants.map((variant) => (
        <div key={variant.id || variant.name} className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 text-right rtl:text-right">
            {variant.name}:
          </label>
          <div className="flex flex-wrap gap-2">
            {" "}
            {/* Changed to flex-wrap and gap for better layout */}
            {variant.options.map((option) => {
              const isSelected = selectedOptions[variant.name] === option;
              return (
                <Button
                  key={option}
                  label={option}
                  onClick={() => onOptionSelect(variant.name, option)}
                  className={`p-button-sm p-button-outlined 
                                ${
                                  isSelected
                                    ? "!border-orange-500 !bg-orange-500/10 !text-orange-600 dark:!border-orange-400 dark:!bg-orange-400/10 dark:!text-orange-300"
                                    : "!border-gray-300 dark:!border-gray-600 !text-gray-700 dark:!text-gray-300 hover:!bg-gray-100 dark:hover:!bg-gray-700"
                                }`}
                />
              );
            })}
          </div>
        </div>
      ))}
    </>
  );
};
