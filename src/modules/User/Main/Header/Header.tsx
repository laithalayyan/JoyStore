// src/modules/User/Main/components/Header.tsx
import React from "react";
import { useAuth } from "../../../shared/hooks/AuthContext";
import { ActionIcons } from "./Components/ActionIcons";
import { Logo } from "./Components/Logo";
import { SearchBar } from "./Components/SearchBar";
import { SocialIcons } from "./Components/SocialIcons";

export const Header: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { user } = useAuth(); // Get user for potential welcome message or conditional UI

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50">
      <div className="container mx-auto sm:px-2 ">
        <div className="flex items-center justify-between h-20 md:h-24">
          {/* Left Section: Social Icons (Desktop) / Mobile Menu Button */}
          <div className="flex items-center">
            <div className="flex">
              <SocialIcons />
            </div>
          </div>

          {/* Middle Section: Action Icons & Search Bar */}
          {/* This section will grow and center its content */}
          <div className="flex items-center flex-grow justify-center px-4">
            <div className="flex items-center space-x-4 md:space-x-6">
              {" "}
              {/* Container for action icons and search bar */}
              <ActionIcons />
              <SearchBar />
            </div>
          </div>

          {/* Right Section: Logo */}

          <div className="flex items-center">
            <Logo src="/logo.png" alt="JoyStore Logo" />{" "}
            {/* Use your actual logo path */}
          </div>
          <div className="md:hidden mr-2">
            {" "}
            {/* Mobile Menu Button - Placeholder */}
            <button className="text0 p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-orange-500">
              <i className="pi pi-bars text-2xl"></i>
              <span className="sr-only">Open menu</span>
            </button>
          </div>
        </div>
      </div>
      {/* Orange line below the header */}
      <div className="h-1 bg-orange-500"></div>
    </header>
  );
};
