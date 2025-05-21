import React from "react";
import { InputText } from "primereact/inputtext";

interface ProductSearchInputProps {
  searchTerm: string;
  onSearchTermChange: (term: string) => void;
  placeholder?: string;
  className?: string;
}

export const ProductSearchInput: React.FC<ProductSearchInputProps> = ({
  searchTerm,
  onSearchTermChange,
  placeholder = "ابحث...",
  className = "",
}) => {
  return (
    <div className={`w-full ${className}`}>
      <span className="p-input-icon-left rtl:p-input-icon-right w-full">
        <i className="pi pi-search pr-3 text-gray-400 dark:text-gray-500" />
        <InputText
          value={searchTerm}
          onChange={(e) => onSearchTermChange(e.target.value)}
          placeholder={placeholder}
          className="w-full pr-9 p-inputtext-sm rounded-md shadow-sm border-gray-300 dark:bg-gray-700 dark:border-gray-600 !dark:text-white focus:ring-orange-500 focus:border-orange-500"
          pt={{
            root: {
              className: `
                
                text-gray-900 dark:text-white /* Color for typed text */
                /* === PT Approach for Placeholder Color === */
                /* Tailwind's placeholder utilities target the ::placeholder pseudo-element */
                /* Ensure these are specific enough */
                placeholder:text-gray-500 dark:placeholder:!text-gray-200 /* Lighter gray for dark placeholder */
                /* You could also try placeholder-opacity-75 dark:placeholder-opacity-100 if it's an opacity issue */
                rounded-md shadow-sm
                focus:ring-2 focus:ring-orange-500 focus:border-orange-500 dark:focus:border-orange-400
              `,
            },
          }}
        />
      </span>
    </div>
  );
};
