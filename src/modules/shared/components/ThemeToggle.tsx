import { Button } from "primereact/button";
import { useTheme } from "../hooks/ThemeContext";

export const ThemeToggle = () => {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <Button
      icon={darkMode ? "pi pi-moon" : "pi pi-sun"}
      onClick={toggleTheme}
      className={`!p-3 !rounded-lg !shadow-sm ${
        darkMode
          ? "!bg-gray-700 hover:!bg-gray-600 !text-orange-400"
          : "!bg-gray-100 hover:!bg-gray-200 !text-gray-800"
      }`}
      pt={{
        icon: { className: "text-xl" },
      }}
      aria-label="Toggle Theme"
    />
  );
};
