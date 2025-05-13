import React from "react";
import { Product } from "../../../../../api/user/productData";
import { ProductCard } from "../../MainPage/Components/ProductCard";

interface ProductGridProps {
  products: Product[];
  searchTerm?: string;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  searchTerm,
}) => {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <i className="pi pi-search text-4xl text-gray-400 dark:text-gray-500 mb-4"></i>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          {searchTerm
            ? "عذراً، لم يتم العثور على منتجات تطابق بحثك."
            : "لا توجد منتجات في هذه الفئة حاليًا."}
        </p>
        {searchTerm && (
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
            حاول تعديل مصطلحات البحث أو تصفح فئات أخرى.
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 xxs:grid-cols-2 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
