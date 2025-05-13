import React from "react";
import { Link } from "react-router-dom";

interface CategoryPageHeaderProps {
  categoryName: string;
}

export const CategoryPageHeader: React.FC<CategoryPageHeaderProps> = ({
  categoryName,
}) => {
  return (
    <div className="mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
      <nav className="text-sm mb-2" aria-label="Breadcrumb">
        <ol className="list-none p-0 inline-flex items-center space-x-2 rtl:space-x-reverse">
          <li className="flex items-center">
            <Link
              to="/"
              className="text-gray-500 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-500 transition-colors"
            >
              الرئيسية
            </Link>
          </li>
          <li className="flex items-center">
            <i className="pi pi-angle-left rtl:pi-angle-left mx-2 text-gray-400 text-xs"></i>
            <span className="text-gray-700 dark:text-gray-200 font-semibold">
              {categoryName}
            </span>
          </li>
        </ol>
      </nav>
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100">
        {categoryName}
      </h1>
    </div>
  );
};
