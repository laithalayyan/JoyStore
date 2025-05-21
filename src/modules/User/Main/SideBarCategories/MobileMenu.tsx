import React from "react";
import { CategoriesList } from "./CategoriesList";

interface MobileMenuProps {
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  isMobileMenuOpen,
  toggleMobileMenu,
}) => {
  return (
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
            <h2 className="text-xl font-semibold dark:text-white">الفئات</h2>
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
  );
};

export default MobileMenu;
