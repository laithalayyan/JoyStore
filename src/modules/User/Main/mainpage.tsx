import React, { useState, useEffect } from "react";
import { Header } from "./Header/Header";
import { CategoriesList } from "./SideBarCategories/CategoriesList";
import { dummyCategoriesWithProducts } from "../../../api/user/productData";
import { CategorySection } from "./MainPage/CategorySection/CategorySection";
import WelcomeBanner from "./MainPage/WelcomeBanner/WelcomeBanner";
import MobileMenu from "./SideBarCategories/MobileMenu";

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
            <WelcomeBanner />

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
        <MobileMenu
          isMobileMenuOpen={true}
          toggleMobileMenu={toggleMobileMenu}
        />
      )}
    </div>
  );
};
