import React from "react";
import { ProductSearchInput } from "./ProductSearchInput";
import { ProductSortDropdown } from "./ProductSortDropdown";

interface SortOption {
  // Re-define or import if shared
  label: string;
  value: string;
}
interface FilterSortControlsProps {
  searchTerm: string;
  onSearchTermChange: (term: string) => void;
  sortOrder: string;
  onSortOrderChange: (order: string) => void;
  sortOptions: SortOption[];
}

export const FilterSortControls: React.FC<FilterSortControlsProps> = ({
  searchTerm,
  onSearchTermChange,
  sortOrder,
  onSortOrderChange,
  sortOptions,
}) => {
  return (
    <div className="mb-8 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
      <div className="w-full sm:w-auto sm:flex-grow">
        <ProductSearchInput
          searchTerm={searchTerm}
          onSearchTermChange={onSearchTermChange}
          placeholder="ابحث داخل الفئة..."
        />
      </div>
      <div className="w-full sm:w-auto sm:min-w-[220px] md:min-w-[250px]">
        <ProductSortDropdown
          sortOrder={sortOrder}
          onSortOrderChange={onSortOrderChange}
          options={sortOptions}
        />
      </div>
    </div>
  );
};
