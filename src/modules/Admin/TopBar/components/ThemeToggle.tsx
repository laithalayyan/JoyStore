// components/ThemeToggle.tsx

import { useTheme } from "../../../shared/hooks/ThemeContext";

export const ThemeToggle = () => {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
      aria-label="Toggle theme"
    >
      <i className={`pi ${darkMode === true ? "pi-sun" : "pi-moon"} text-lg`} />
    </button>
  );
};
