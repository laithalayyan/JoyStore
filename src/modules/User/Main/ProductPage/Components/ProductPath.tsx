import React from "react";
import { Link } from "react-router-dom";

interface ProductPathProps {
  productName: string;
  categoryId?: string | number; // Optional, as product might not have a category
  categoryName?: string; // Optional
}

const BreadcrumbSeparator: React.FC = () => (
  <li>
    <i className="pi pi-angle-left rtl:pi-angle-left text-xs"></i>
  </li>
);

export const ProductPath: React.FC<ProductPathProps> = ({
  productName,
  categoryId,
  categoryName,
}) => {
  return (
    <nav className="text-sm mb-4" aria-label="Breadcrumb">
      <ol className="list-none p-0 inline-flex items-center space-x-2 rtl:space-x-reverse text-gray-500 dark:text-gray-400">
        <li>
          <Link to="/" className="hover:text-orange-600">
            الرئيسية
          </Link>
        </li>
        <BreadcrumbSeparator />
        {categoryName && categoryId && (
          <>
            <li>
              <Link
                to={`/category/${categoryId}`}
                className="hover:text-orange-600"
              >
                {categoryName}
              </Link>
            </li>
            <BreadcrumbSeparator />
          </>
        )}
        <li className="text-gray-700 dark:text-gray-200 font-medium">
          <span className="block md:hidden">
            {productName.length > 20
              ? `${productName.substring(0, 20)}...`
              : productName}
          </span>
          <span className="hidden md:block">{productName}</span>
        </li>
      </ol>
    </nav>
  );
};
