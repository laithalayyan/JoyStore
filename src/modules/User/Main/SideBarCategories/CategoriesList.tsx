import React from "react";
import { Link } from "react-router-dom";

interface Category {
  id: string | number;
  name: string;
  slug: string;
  icon?: string;
}

const dummyCategories: Category[] = [
  { id: 1, name: "إلكترونيات", slug: "electronics", icon: "pi pi-desktop" },
  { id: 2, name: "ملابس رجالية", slug: "mens-fashion", icon: "pi pi-user" },
  { id: 3, name: "ملابس نسائية", slug: "womens-fashion", icon: "pi pi-female" },
  { id: 4, name: "المنزل والمطبخ", slug: "home-kitchen", icon: "pi pi-home" },
  {
    id: 5,
    name: "الجمال والعناية الشخصية",
    slug: "beauty-personal-care",
    icon: "pi pi-heart",
  },
  { id: 6, name: "كتب", slug: "books", icon: "pi pi-book" },
  { id: 7, name: "ألعاب الفيديو", slug: "video-games", icon: "pi pi-prime" },
];

interface CategoriesListProps {
  onCategoryClick?: () => void;
  className?: string;
}

export const CategoriesList: React.FC<CategoriesListProps> = ({
  onCategoryClick,
  className = "",
}) => {
  return (
    <div
      className={`bg-white dark:bg-gray-800 ${className} rounded-lg lg:p-4 md:p-4 lg:shadow-lg md:shadow-lg sm:shadow-none`}
    >
      <h3 className="hidden sm:block text-lg text-right font-semibold mb-3 text-gray-800 dark:text-gray-100 border-b pb-2 dark:border-gray-700">
        الفئات
      </h3>
      <nav>
        <ul className="space-y-1 text-right">
          {dummyCategories.map((category) => (
            <li key={category.id}>
              <Link
                to={`/category/${category.slug}`}
                onClick={onCategoryClick}
                className="flex text-right items-center lg:px-3 md:px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-orange-100 dark:hover:bg-gray-700 hover:text-orange-600 dark:hover:text-orange-400 rounded-md transition-colors duration-150"
              >
                {category.icon && (
                  <i
                    className={`${category.icon} mr-3 text-right text-lg opacity-75`}
                  ></i>
                )}
                <span>{category.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};
