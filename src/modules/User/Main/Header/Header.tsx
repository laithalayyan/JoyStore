import React, { useState } from "react";
import { ActionIcons } from "./Components/ActionIcons";
import { Logo } from "./Components/Logo";
import { SearchBar } from "./Components/SearchBar";
import { SocialIcons } from "./Components/SocialIcons";
import { Button } from "primereact/button";

interface HeaderProps {
  onMobileMenuToggle: () => void;
  isMobileMenuOpen?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onMobileMenuToggle,
  isMobileMenuOpen,
}) => {
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const toggleMobileSearch = () => {
    setIsMobileSearchOpen(!isMobileSearchOpen);
    if (!isMobileSearchOpen && isMobileMenuOpen) {
      onMobileMenuToggle();
    }
  };
  return (
    <header className="bg-white dark:bg-gray-800 shadow-md top-0 z-50 relative">
      <div className="px-1 sm:px-2 md:px-2 lg:container lg:mx-auto lg:px-4">
        <div className="flex items-center justify-between h-20 md:h-24">
          <div className="flex items-center">
            <div className="md:hidden ml-2">
              <button
                onClick={onMobileMenuToggle}
                className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                aria-expanded={!isMobileMenuOpen}
                aria-label="Toggle navigation menu"
              >
                <i
                  className={`pi ${
                    isMobileMenuOpen ? "pi-times" : "pi-bars"
                  } text-2xl`}
                ></i>
                <span className="sr-only">
                  {isMobileMenuOpen ? "Close menu" : "Open menu"}
                </span>
              </button>
            </div>
            <div className="mr-2 md:mr-0">
              <Logo src="/logo.png" alt="JoyStore Logo" />
            </div>
          </div>

          <div className="flex items-center flex-1 min-w-0 mx-2 lg:flex-none lg:ml-4">
            <div className="flex md:hidden items-center w-full">
              <div className="flex-shrink-0 ml-1 rtl:mr-1 rtl:ml-0">
                <Button
                  icon="pi pi-search"
                  className="p-button-rounded p-button-text p-button-plain text-gray-600 dark:text-gray-300 hover:text-orange-500"
                  onClick={toggleMobileSearch}
                  aria-label="Open search bar"
                />
              </div>
              <div className="flex-1 min-w-0">
                <ActionIcons />
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-4 rtl:space-x-reverse ">
              <div className="flex-grow max-w-lg">
                <SearchBar />
              </div>
              <div className="flex-shrink-0">
                <ActionIcons />
              </div>
            </div>
          </div>

          <div className="hidden md:flex items-center">
            <SocialIcons />
          </div>
        </div>
      </div>
      <div className="h-1 bg-orange-500"></div>
      {isMobileSearchOpen && (
        <div className="absolute top-full left-0 right-0 z-40 md:hidden bg-white dark:bg-gray-700 shadow-lg p-3 border-t border-gray-200 dark:border-gray-600">
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <SearchBar shouldFocus={true} className="flex-grow" />
            <Button
              icon="pi pi-times"
              className="p-button-rounded p-button-text p-button-plain text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 flex-shrink-0"
              onClick={toggleMobileSearch}
              aria-label="Close search bar"
            />
          </div>
        </div>
      )}
    </header>
  );
};
