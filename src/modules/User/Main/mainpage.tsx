import React, { useState, useEffect } from "react";
import { Header } from "./Header/Header";
import { CategoriesList } from "./SideBarCategories/CategoriesList";
import { dummyCategoriesWithProducts } from "../../../api/user/productData";
import { CategorySection } from "./MainPage/Components/CategorySection";

export const MainPage: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Header
        onMobileMenuToggle={toggleMobileMenu}
        isMobileMenuOpen={isMobileMenuOpen}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row md:space-x-6 rtl:md:space-x-reverse">
          <aside className="hidden md:block md:w-1/4 order-1 md:order-1 sticky top-7 h-fit">
            <CategoriesList />
          </aside>

          {/* Main Content Area */}
          <main className="w-full lg:w-3/4 order-2 lg:order-2">
            {/* Optional: Welcome message or banner */}
            <div className="mb-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
              <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-gray-800 dark:text-gray-100 text-right rtl:text-right">
                مرحباً بك في متجرنا!
              </h1>
              <p className="text-gray-600 dark:text-gray-300 text-right rtl:text-right">
                اكتشف أحدث المنتجات والعروض الحصرية.
              </p>
            </div>

            {/* Render sections for each category with products */}
            <div className="space-y-12">
              {dummyCategoriesWithProducts.map(
                (category) =>
                  category.products &&
                  category.products.length > 0 && ( // Only render if category has products
                    <CategorySection key={category.id} category={category} />
                  )
              )}
            </div>
          </main>
        </div>
      </div>

      {isMobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-60 z-[55] md:hidden transition-opacity duration-300 ease-in-out"
            onClick={toggleMobileMenu}
            aria-hidden="true"
          ></div>
          <div
            className={`fixed top-0 h-full w-3/4 max-w-xs sm:max-w-sm bg-white dark:bg-gray-800 shadow-xl z-[60] transform transition-transform duration-300 ease-in-out md:hidden
                        rtl:right-0 ltr:left-0 
                        ${
                          isMobileMenuOpen
                            ? "translate-x-0"
                            : "rtl:translate-x-full ltr:-translate-x-full"
                        }`}
          >
            <div className="p-4 flex flex-col h-full">
              <div className="flex justify-between items-center mb-4 pb-2 border-b dark:border-gray-700 flex-shrink-0">
                <h2 className="text-xl font-semibold dark:text-white">
                  الفئات
                </h2>
                <button
                  onClick={toggleMobileMenu}
                  className="p-1 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
                  aria-label="إغلاق القائمة"
                >
                  <i className="pi pi-times text-xl"></i>
                </button>
              </div>
              <div className="flex-grow overflow-y-auto">
                <CategoriesList onCategoryClick={toggleMobileMenu} />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
