// src/modules/User/ProductPage/components/ProductActions/FavoriteToggleButton.tsx
import React from "react";
import { Button } from "primereact/button";

interface FavoriteToggleButtonProps {
  isFavorite: boolean;
  onClick: () => void;
  tooltipAdd?: string;
  tooltipRemove?: string;
}

export const FavoriteToggleButton: React.FC<FavoriteToggleButtonProps> = ({
  isFavorite,
  onClick,
  tooltipAdd = "أضف للمفضلة",
  tooltipRemove = "إزالة من المفضلة",
}) => {
  return (
    <Button
      icon={isFavorite ? "pi pi-heart-fill" : "pi pi-heart"}
      className={`p-button-lg p-button-text p-button-rounded focus:ring-0
                  ${
                    isFavorite
                      ? "text-red-500 hover:!bg-red-500/10"
                      : "text-gray-400 dark:text-gray-500 hover:!bg-gray-400/10 hover:!text-red-500"
                  }`}
      onClick={onClick}
      tooltip={isFavorite ? tooltipRemove : tooltipAdd}
      tooltipOptions={{ position: "top" }}
      aria-pressed={isFavorite}
    />
  );
};
