// src/modules/User/Main/components/CategorySection.tsx
import React from "react";
import { Link } from "react-router-dom";
import { ProductsSlider } from "./ProductsSlider";
import { CategoryWithProducts } from "../../../../../api/user/productData";

interface CategorySectionProps {
  category: CategoryWithProducts;
}

export const CategorySection: React.FC<CategorySectionProps> = ({
  category,
}) => {
  return (
    <section className="mb-10">
      <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100">
          {category.name}
        </h2>
        <Link
          to={`/category/${category.slug}`}
          className="text-sm font-medium text-orange-600 hover:text-orange-500 dark:text-orange-400 dark:hover:text-orange-300 flex items-center"
        >
          <span>{"عرض الكل"}</span> {/* Example using t or fallback */}
          <i className="pi pi-angle-left rtl:pi-angle-right ml-1 rtl:mr-1 rtl:ml-0 text-xs"></i>{" "}
          {/* Arrow flips for RTL */}
        </Link>
      </div>
      <ProductsSlider products={category.products} />
    </section>
  );
};
