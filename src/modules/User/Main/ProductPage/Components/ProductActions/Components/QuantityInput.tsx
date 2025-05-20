// src/modules/User/ProductPage/components/ProductActions/QuantityInput.tsx
import React from "react";
import {
  InputNumber,
  InputNumberValueChangeEvent,
} from "primereact/inputnumber";

interface QuantityInputProps {
  productId: string | number;
  value: number;
  onValueChange: (newValue: number) => void;
  maxStock?: number;
}

export const QuantityInput: React.FC<QuantityInputProps> = ({
  productId,
  value,
  onValueChange,
  maxStock = 10,
}) => {
  const handleValueChange = (e: InputNumberValueChangeEvent) => {
    onValueChange(e.value ?? 1);
  };

  return (
    <div className="w-28 ml-4">
      <label htmlFor={`quantity-${productId}`} className="sr-only">
        الكمية
      </label>
      <InputNumber
        inputId={`quantity-${productId}`}
        value={value}
        onValueChange={handleValueChange}
        showButtons
        buttonLayout="horizontal"
        step={1}
        min={1}
        max={maxStock}
        disabled={maxStock === 0}
        decrementButtonClassName="p-button-secondary p-button-outlined !text-gray-600 dark:!text-gray-300 !border-gray-300 dark:!border-gray-600"
        incrementButtonClassName="p-button-secondary p-button-outlined !text-gray-600 dark:!text-gray-300 !border-gray-300 dark:!border-gray-600"
        incrementButtonIcon="pi pi-plus text-xs"
        decrementButtonIcon="pi pi-minus text-xs"
        inputClassName={
          "!text-center w-11 rounded-lg !text-gray-900 dark:!bg-gray-700 dark:!text-white !border-y-gray-300 dark:!border-y-gray-600" // Added !text-gray-900 for light mode
        }
        className="p-inputnumber-sm w-full"
      />
    </div>
  );
};
