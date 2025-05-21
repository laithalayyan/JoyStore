// components/ThemeToggle.tsx

import { useTheme } from "../hooks/ThemeContext";

export const ThemeToggle = () => {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 text-gray-500 dark:text-orange-400 hover:text-orange-600 dark:hover:text-orange-300"
      aria-label="Toggle theme"
    >
      <i className={`pi ${darkMode === true ? "pi-sun" : "pi-moon"} text-lg`} />
    </button>
  );
};
