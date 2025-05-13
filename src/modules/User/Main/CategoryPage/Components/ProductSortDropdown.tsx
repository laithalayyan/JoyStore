import React from "react";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";

interface SortOption {
  label: string;
  value: string;
}

interface ProductSortDropdownProps {
  sortOrder: string;
  onSortOrderChange: (order: string) => void;
  options: SortOption[];
  placeholder?: string;
  className?: string;
}

export const ProductSortDropdown: React.FC<ProductSortDropdownProps> = ({
  sortOrder,
  onSortOrderChange,
  options,
  placeholder = "ترتيب حسب",
  className = "",
}) => {
  return (
    <div className={`w-full ${className}`}>
      <Dropdown
        value={sortOrder}
        options={options}
        onChange={(e: DropdownChangeEvent) => onSortOrderChange(e.value)}
        placeholder={placeholder}
        className="w-full p-dropdown-sm"
        pt={{
          root: {
            className: "rounded-md shadow-sm w-full",
          },
          input: {
            className: `
              w-full p-inputtext-sm !py-2.5 !px-3 /* Consistent padding like InputText */
              border border-gray-300 dark:border-gray-600 /* Default border */
              bg-white dark:bg-gray-700 /* Background */
              text-gray-900 dark:text-white /* Text color */
              placeholder-gray-400 dark:placeholder-gray-500 /* Placeholder color */
              rounded-l-none !rounded-r-md /* Rounded corners for the input part itself */
              focus:ring-2 focus:ring-orange-500 focus:border-orange-500 dark:focus:border-orange-400 /* Focus styles */
              [&_.p-dropdown-label]:text-right rtl:[&_.p-dropdown-label]:text-right /* Ensure label text aligns right */
                            font-alexandria /* Apply Alexandria to selected item text */

              `,
          },
          trigger: {
            className: `
              border border-gray-300 dark:border-gray-600 /* Default border */
              bg-white dark:bg-gray-700 /* Background */
              text-gray-500 dark:text-gray-400 
              bg-gray-50 dark:bg-gray-700 
              hover:bg-gray-100 dark:hover:bg-gray-600
              !rounded-r-none rtl:!rounded-l-md rtl:!rounded-r-none /* Adjust rounding for RTL if arrow is on left */
            `,
          },
          panel: {
            className:
              "bg-white dark:bg-gray-700 dark:border-gray-600 shadow-lg rounded-md",
          },
          item: {
            className: `
              p-dropdown-item text-right rtl:text-right 
              text-gray-700 dark:text-gray-200 
              hover:bg-orange-100 dark:hover:bg-gray-600 
              focus:bg-orange-100 dark:focus:bg-gray-600
              dark:focus:text-orange-300 dark:hover:text-orange-300
                            font-alexandria /* Apply Alexandria to selected item text */

            `,
          },
          itemGroup: {
            className: "dark:bg-gray-800 dark:text-gray-300",
          },
          header: {
            className: "dark:bg-gray-700 dark:border-gray-600",
          },
          filterInput: {
            className: "dark:bg-gray-600 dark:border-gray-500 dark:text-white",
          },
          emptyMessage: {
            className: "dark:text-gray-400",
          },
        }}
      />
    </div>
  );
};
