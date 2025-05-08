// components/SidebarItem.tsx
import { NavLink } from "react-router-dom";

interface SidebarItemProps {
  to: string;
  label: string;
  icon: string;
}

export const SidebarItem = ({ to, label, icon }: SidebarItemProps) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center px-4 py-3 text-l font-semibold rounded-lg transition-colors ${
          isActive
            ? "bg-gray-100 text-gray-900 dark:bg-orange-600 dark:text-white"
            : "text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-orange-900 dark:hover:opacity-65"
        }`
      }
    >
      <i className={`pi ${icon} mr-3 `} />
      {label}
    </NavLink>
  );
};
