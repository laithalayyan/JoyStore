// src/modules/User/ProductPage/components/ProductActions/AddToCartButton.tsx
import React from "react";
import { Button } from "primereact/button";

interface AddToCartButtonProps {
  onClick: () => void;
  disabled?: boolean;
  label?: string;
}

export const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  onClick,
  disabled = false,
  label = "أضف إلى السلة",
}) => {
  return (
    <Button
      label={label}
      icon="pi pi-shopping-cart"
      className="p-button-orange !bg-orange-500 py-2 text-white !border-orange-500 hover:!bg-orange-600 flex-grow justify-center p-button-lg text-sm sm:text-base"
      onClick={onClick}
      disabled={disabled}
    />
  );
};
